<?php

namespace AuthForm;

use AuthForm\Controller;
use AuthForm\DbStorage\User;
use AuthForm\Middleware\BodyParser;
use AuthForm\Middleware\ExceptionsHandler;
use AuthForm\Middleware\JwtAuthentication;
use AuthForm\Service\Authentication;
use DI\Container;
use DI\ContainerBuilder;
use Firebase\JWT\JWT;
use function DI\create;
use function DI\get;
use FastRoute\RouteCollector;
use function FastRoute\simpleDispatcher;
use Middlewares\FastRoute;
use Middlewares\RequestHandler;
use Narrowspark\HttpEmitter\SapiEmitter;
use Relay\Relay;
use Zend\Diactoros\Response;
use Zend\Diactoros\ServerRequestFactory;
use Doctrine\DBAL;

class Application
{

    /**
     * @var \FastRoute\Dispatcher
     */
    private $routes;

    /**
     * @var Container
     */
    private $container;

    public function __construct(\stdClass $settings)
    {
        $this->setupContainer(self::configureDependencies($settings));
        $this->setupRoutes();
    }

    public function run(): void
    {
        $requestHandler = new Relay([
            new ExceptionsHandler,
            new BodyParser,
            new JwtAuthentication($this->container->get('authentication')),
            new FastRoute($this->routes),
            new RequestHandler($this->container),
        ]);
        $response = $requestHandler->handle(ServerRequestFactory::fromGlobals());
        $emitter = new SapiEmitter();
        $emitter->emit($response);
    }

    private function setupContainer(array $dependencies): void
    {
        $containerBuilder = new ContainerBuilder();
        $containerBuilder->useAutowiring(false);
        $containerBuilder->useAnnotations(false);
        $containerBuilder->addDefinitions($dependencies);

        $this->container = $containerBuilder->build();
    }

    private function setupRoutes(): void
    {
        $this->routes = simpleDispatcher(static function (RouteCollector $router) {
            $router->addRoute('OPTIONS', '/{all}[/{all2}]', static function () {
                echo 'Ok';
            });
            $router->get('/[{route:login|entrance|registration}]', [Controller\Pages::class, 'home']);
            $router->addGroup('/api', static function (RouteCollector $router) {
                $router->post('/check-email', [Controller\Auth::class, 'checkEmail']);
                $router->post('/register', [Controller\Auth::class, 'registration']);
                $router->post('/login', [Controller\Auth::class, 'login']);
                $router->get('/me', [Controller\User::class, 'fromToken']);
            });
        });
    }

    private static function configureDependencies($settings): array
    {
        return [
            Controller\Pages::class => create(Controller\Pages::class)
                ->constructor(get('Response')),
            Controller\Auth::class => create(Controller\Auth::class)
                ->constructor(
                    get('Response'),
                    get('db'),
                    get('userStorage'),
                    get('authentication'),
                    $settings->uploadDir
                ),
            Controller\User::class => create(Controller\User::class)
                ->constructor(get('Response'), get('db')),
            'Response' => static function() {
                return new Response();
            },
            'db' => DBAL\DriverManager::getConnection(['url' => $settings->db]),
            'userStorage' => create(User::class)->constructor(get('db')),
            'authentication' => new Authentication(new JWT, $settings->jwt)
        ];
    }
}

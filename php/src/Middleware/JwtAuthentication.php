<?php


namespace AuthForm\Middleware;


use AuthForm\Service\Authentication;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class JwtAuthentication implements MiddlewareInterface
{
    /**
     * @var Authentication
     */
    private $authentication;

    public function __construct(Authentication $authentication)
    {
        $this->authentication = $authentication;
    }

    /**
     * @param ServerRequestInterface $request
     * @param RequestHandlerInterface $handler
     * @return ResponseInterface
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $token = $request->getHeader('x-auth-token');
        if ($token = $token[0] ?? null) {
            try {
                $user = $this->authentication->authByToken($token);
                $request = $request->withAttribute('user', $user);
            } catch (\Exception $exception) { /* do nothing */ }
        }
        return $handler->handle($request);
    }
}

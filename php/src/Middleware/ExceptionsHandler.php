<?php


namespace AuthForm\Middleware;


use AuthForm\Exception\BadRequest;
use AuthForm\Exception\Forbidden;
use AuthForm\Exception\NotFound;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response;

class ExceptionsHandler implements MiddlewareInterface
{
    /**
     * @param ServerRequestInterface $request
     * @param RequestHandlerInterface $handler
     * @return ResponseInterface
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        try {
            return $handler->handle($request);
        } catch (BadRequest $exception) {
            return $this->errorResponse(400, $exception->getMessage());
        } catch (NotFound $exception) {
            return $this->errorResponse(404, $exception->getMessage());
        } catch (Forbidden $exception) {
            return $this->errorResponse(403, $exception->getMessage());
        } catch (\Exception $exception) {
            return $this->errorResponse(500, $exception->getMessage());
        }
    }

    /**
     * @param int $code
     * @param string $message
     * @return ResponseInterface
     */
    private function errorResponse(int $code, string $message): ResponseInterface
    {
        $response = new Response();
        $response->getBody()->write(json_encode($message));
        return $response
            ->withStatus($code)
            ->withHeader('Content-Type', 'application/json');
    }
}

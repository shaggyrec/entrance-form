<?php

namespace AuthForm\Controller;

use Psr\Http\Message\ResponseInterface;
use Zend\Diactoros\ServerRequest;

class Pages
{
    /**
     * @var ResponseInterface
     */
    private $response;

    public function __construct(ResponseInterface $response)
    {
        $this->response = $response;
    }

    /**
     * @return ResponseInterface
     */
    public function home(): ResponseInterface
    {
        $response = $this->response->withHeader('Content-Type', 'text/html');
        $response->getBody()->write(file_get_contents(__DIR__ . '/../../templates/index.html'));
        return $response;
    }
}

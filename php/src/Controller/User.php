<?php


namespace AuthForm\Controller;


use AuthForm\Exception\Forbidden;
use Doctrine\DBAL\Connection;
use Psr\Http\Message\ResponseInterface;
use Zend\Diactoros\ServerRequest;
use AuthForm\DataTypes;

class User
{
    /**
     * @var ResponseInterface
     */
    private $response;
    /**
     * @var Connection
     */
    private $db;

    public function __construct(ResponseInterface $response, Connection $db)
    {
        $this->response = $response;
        $this->db = $db;
    }

    /**
     * @param ServerRequest $request
     * @return ResponseInterface
     * @throws Forbidden
     * @throws \AuthForm\Exception\NotFound
     */
    public function fromToken(ServerRequest $request): ResponseInterface
    {
        if ($userFromToken = $request->getAttribute('user')) {
            $user = DataTypes\User::byEmail(DataTypes\asObject($userFromToken)->email, $this->db);
            $this->response->getBody()->write(json_encode($user));
            return $this->response;
        }
        throw new Forbidden('Access denied');
    }
}

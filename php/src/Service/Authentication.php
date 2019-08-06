<?php

namespace AuthForm\Service;

use AuthForm\DataTypes\User;
use Firebase\JWT\JWT;
use function AuthForm\DataTypes\asObject;
use function AuthForm\DataTypes\omitNullValues;

class Authentication
{

    /**
     * @var JWT
     */
    private $jwt;
    /**
     * @var string
     */
    private $secret;

    public function __construct(JWT $jwt, string $secret)
    {
        $this->jwt = $jwt;
        $this->secret = $secret;
    }

    /**
     * @param User $user
     * @return string
     */
    public function authenticate(User $user): string
    {
        $userData = asObject($user);
        return $this->jwt::encode(
            omitNullValues([
                'email' => $userData->email,
                'name' =>  $userData->name,
                'lastname' =>  $userData->lastname,
                'phone' =>  $userData->phone,
                'image' =>  $userData->image ?? null
            ]),
            $this->secret
        );
    }

    /**
     * @param string $token
     * @return User
     */
    public function authByToken(string $token): User
    {
        $userRow = $this->jwt::decode($token, $this->secret, ['HS256']);
        return new User([
            'email' => $userRow->email,
            'name' =>  $userRow->name,
            'lastname' =>  $userRow->lastname,
            'phone' =>  $userRow->phone,
            'image' =>  $userRow->image ?? null
        ]);
    }
}

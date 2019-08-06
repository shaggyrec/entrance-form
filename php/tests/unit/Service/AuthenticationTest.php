<?php

use AuthForm\DataTypes\User;
use AuthForm\Service\Authentication;
use \Firebase\JWT\JWT;
use AuthForm\DataTypes;

class AuthenticationTest extends \PHPUnit\Framework\TestCase
{
    private const SECRET = 'dasdasdas';

    public function testAuthenticateUser(): void
    {
        $this->assertSame(
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImlAc2hhZ2cucnUiLCJuYW1lIjoiUGFzaG9rIiwibGFzdG5hbWUiOiJJdmFub3YiLCJwaG9uZSI6Ijc5OTUxOTk5MTk1In0.2dq-HkqWWlvBPQ3CZ-q-7UjugwEDakxsgx5kdIjT278',
            (new Authentication(new JWT(), self::SECRET))->authenticate(new User([
                'email' => 'i@shagg.ru',
                'name' => 'Pashok',
                'lastname' => 'Ivanov',
                'phone' => '79951999195',
            ]))
        );
    }

    public function testAuthByToken(): void
    {
        $user = (new Authentication(new JWT(), self::SECRET))
            ->authByToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImlAc2hhZ2cucnUiLCJuYW1lIjoiUGFzaG9rIiwibGFzdG5hbWUiOiJJdmFub3YiLCJwaG9uZSI6Ijc5OTUxOTk5MTk1In0.2dq-HkqWWlvBPQ3CZ-q-7UjugwEDakxsgx5kdIjT278');
        $this->assertSame('i@shagg.ru', DataTypes\asObject($user)->email);
    }
}

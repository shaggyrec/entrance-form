<?php


namespace AuthForm\Tests\Unit\Controllers;


use AuthForm\Controller\User;
use AuthForm\DataTypes;
use AuthForm\Exception\Forbidden;
use AuthForm\Tests\FixtureTestCase;
use PHPUnit\Framework\TestCase;
use Zend\Diactoros\Response;
use Zend\Diactoros\ServerRequest;

class UserTest extends FixtureTestCase
{
    public function testGetUserInfo(): void
    {
        $request = new ServerRequest();
        $request = $request->withAttribute('user', new DataTypes\User([
            'email' => 'i@shagg.ru',
            'name' => 'Pashok',
            'lastname' => 'Ivanov',
            'phone' => '79951999195',
        ]));

        $this->assertSame(
            200,
            (new User(new Response(), self::$dbConnection))->fromToken($request)->getStatusCode()
        );
    }

    public function testThrows403WhenUserNotProvided(): void
    {
        $this->expectException(Forbidden::class);
        (new User(new Response(), self::$dbConnection))->fromToken(new ServerRequest());
    }
}

<?php

namespace AuthForm\Tests\Unit\Controllers;

use AuthForm\Controller\Auth;
use AuthForm\DbStorage\User;
use AuthForm\Exception\BadRequest;
use AuthForm\Exception\NotFound;
use AuthForm\Service\Authentication;
use AuthForm\Tests\FixtureTestCase;
use Firebase\JWT\JWT;
use Zend\Diactoros\Response;
use Zend\Diactoros\ServerRequest;
use Zend\Diactoros\UploadedFile;

class AuthTest extends FixtureTestCase
{
    public function testCheckEmailReturns200WhenItIsExists(): void
    {
        $request = (new ServerRequest())->withParsedBody(['email' => 'i@shagg.ru']);
        $this->assertSame(
            200,
            self::auth()->checkEmail($request)->getStatusCode()
        );
    }

    public function testCheckEmailTrowsBadExceptionWhenEmailIsInvalid(): void
    {
        $this->expectException(BadRequest::class);
        $request = (new ServerRequest())->withParsedBody(['email' => 'no-valid-email']);
        self::auth()->checkEmail($request);
    }

    public function testThrows404WhenEmailNotRegistered(): void
    {
        $this->expectException(NotFound::class);
        $request = (new ServerRequest())->withParsedBody(['email' => 'not@registered.email']);
        self::auth()->checkEmail($request);
    }

    public function testCanRegister(): void
    {
        $request = (new ServerRequest())
            ->withParsedBody([
                'email' => 'not@registered.email',
                'password' => 'pass',
                'name' => 'Pashok',
                'lastname' => 'Ivanov',
                'phone' => '79951999195',
            ]);
        $response = self::auth()->registration($request);
        $this->assertSame(
            200,
            $response->getStatusCode()
        );
    }

    public function testThrows400WhenRequiredFieldIsMissed(): void
    {
        $this->expectException(BadRequest::class);
        $request = (new ServerRequest())
            ->withParsedBody(['email' => 'not@registered.email', 'password' => 'pass']);
        self::auth()->registration($request);
    }

    public function testTrows404WhenEmailNotFound(): void
    {
        $this->expectException(NotFound::class);
        $request = (new ServerRequest())
            ->withParsedBody(['email' => 'not@registered.email', 'password' => 'pass']);
        self::auth()->login($request);
    }

    public function testThrows400WhenInvalidPassword(): void
    {
        $this->expectException(BadRequest::class);
        $request = (new ServerRequest())
            ->withParsedBody(['email' => 'i@shagg.ru', 'password' => 'bad-password']);
        self::auth()->login($request);
    }

    public function testCanLogin(): void
    {
        $request = (new ServerRequest())
            ->withParsedBody(['email' => 'i@shagg.ru', 'password' => 'pass']);
        $this->assertSame(
            200,
            self::auth()->login($request)->getStatusCode()
        );
    }

    public function testCanUploadFileWithRegistration(): void
    {
        $request = (new ServerRequest())
            ->withParsedBody([
                'email' => 'not@registered.email',
                'password' => 'pass',
                'name' => 'Pashok',
                'lastname' => 'Ivanov',
                'phone' => '79951999195',
                'image' => 'data:image/png;base64,AAAFBfj42Pj4'
            ]);
        self::auth()->registration($request);

        $newFileName = md5('not@registered.email') . '.png';

        $this->assertSame(
            $newFileName,
            self::$dbConnection->fetchColumn(
                'SELECT image FROM user WHERE email = ?', ['not@registered.email']
            )
        );

        $this->assertFileExists(self::uploadPath() . "/$newFileName");

        @unlink(self::uploadPath() . "/$newFileName");
    }

    private static function auth(): Auth
    {
        return new Auth(
            new Response(),
            self::$dbConnection,
            new User(self::$dbConnection),
            new Authentication(new JWT(), 'secret'),
            self::uploadPath()
        );
    }

    private static function uploadPath(): string
    {
        return __DIR__ . '/../../../public/img';
    }
}

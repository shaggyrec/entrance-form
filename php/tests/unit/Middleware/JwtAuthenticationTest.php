<?php


use AuthForm\Middleware\JwtAuthentication;
use AuthForm\Service\Authentication;
use Firebase\JWT\JWT;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\ServerRequest;
use Mockery as m;

class JwtAuthenticationTest extends \PHPUnit\Framework\TestCase
{
    public function testProvidesUserWhenTokenIsValid(): void
    {
        $request = new ServerRequest();
        $request = $request->withHeader('X-AUTH-TOKEN', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImlAc2hhZ2cucnUiLCJuYW1lIjoiUGFzaG9rIiwibGFzdG5hbWUiOiJJdmFub3YiLCJwaG9uZSI6Ijc5OTUxOTk5MTk1In0.2dq-HkqWWlvBPQ3CZ-q-7UjugwEDakxsgx5kdIjT278');
        $handler = m::mock(RequestHandlerInterface::class);
        $handler->shouldReceive('handle')
            ->withArgs(function (ServerRequest $request) {
                $this->assertInstanceOf(
                    \AuthForm\DataTypes\User::class,
                    $request->getAttribute('user')
                );
                return true;
            })
            ->once();
        (new JwtAuthentication(new Authentication(new JWT, 'dasdasdas')))->process($request, $handler);
    }

    public function testDontProvideWhenTokenIsAbsent(): void
    {
        $request = new ServerRequest();
        $handler = m::mock(RequestHandlerInterface::class);

        $handler->shouldReceive('handle')
            ->withArgs(function (ServerRequest $request) {
                $this->assertNull($request->getAttribute('user'));
                return true;
            })
            ->once();

        (new JwtAuthentication(new Authentication(new JWT, 'dasdasdas')))->process($request, $handler);
    }

    public function testDontProvideWhenTokenIsInvalid(): void
    {
        $request = new ServerRequest();
        $handler = m::mock(RequestHandlerInterface::class);
        $request = $request->withHeader('X-AUTH-TOKEN', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImlAc2hhZ2cucnUiLCJuYW1lIjoiUGFzaG9rIiwibGFzdG5hbWUiOiJJdmFub3YiLCJwaG9uZSI6Ijc5OTUxOTk5MTk1In0.2dq-HkqWWlvBPQ3CZ-q-7UjugwEDakxsgx5kdIjT2dadas78');
        $handler->shouldReceive('handle')
            ->withArgs(function (ServerRequest $request) {
                $this->assertNull($request->getAttribute('user'));
                return true;
            })
            ->once();

        (new JwtAuthentication(new Authentication(new JWT, 'dasdasdas')))->process($request, $handler);
    }
}

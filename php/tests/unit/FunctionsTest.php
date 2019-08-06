<?php


use AuthForm\Exception\BadRequest;
use function AuthForm\assertEmailIsValid;

class FunctionsTest extends \PHPUnit\Framework\TestCase
{
    public function testAssertEmailIsValidThrowsBabRequestWhenEmailIsInvalid(): void
    {
        $this->expectException(BadRequest::class);
        assertEmailIsValid('invalid-email');
    }
    public function testAssertEmailIsValidDoNothingWhenEmailIsValid(): void
    {
        assertEmailIsValid('valid@email.com');
    }
}

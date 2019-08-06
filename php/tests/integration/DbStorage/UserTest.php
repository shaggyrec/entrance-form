<?php

namespace AuthForm\Tests\Integration\DbStorage;

use AuthForm\DbStorage\User;
use AuthForm\Tests\FixtureTestCase;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

class UserTest extends FixtureTestCase
{
    public function testCreatesUser(): void
    {
        (new User(self::$dbConnection))->insert([
            'email' => 'new@user.com',
            'name' => 'Pashok',
            'lastname' => 'Ivanov',
            'phone' => '79951999195',
            'password' => 'pwd'
        ]);

        $this->assertSame(
            'Pashok',
            self::$dbConnection->fetchColumn(
                'SELECT name FROM user WHERE email = ?', ['new@user.com']
            )
        );
    }

    public function testEmailMustBeUnique(): void
    {
        $this->expectException(UniqueConstraintViolationException::class);
        (new User(self::$dbConnection))->insert([
            'email' => 'i@shagg.ru',
            'name' => 'Pashok',
            'lastname' => 'Ivanov',
            'phone' => '79951999195',
            'password' => 'pwd'
        ]);
    }
}

<?php

namespace AuthForm\Tests\DataTypes;

use AuthForm\DataTypes\User;
use Doctrine\DBAL\Connection;
use PHPUnit\Framework\TestCase;
use Mockery as m;

class UserTest extends TestCase
{
    private const serializedUser = <<<JSON
{
    "email": "i@shagg.ru",
    "name": "Alexander",
    "lastname": "Shogenov",
    "phone": "79951999195",
    "image": "\/path\/to\/image.jpg"
}
JSON;

    public function testSerializeUserFromDbRow(): void
    {
        $this->assertSame(
            self::serializedUser,
            json_encode(self::user(self::dbRow()), JSON_PRETTY_PRINT)
        );
    }

    public function testGetUserById(): void
    {
        $db = m::mock(Connection::class);
        $db->shouldReceive('fetchAssoc')
           ->with(m::any(), ['i@shagg.ru'])
           ->andReturn(self::dbRow());

        $this->assertSame(
            self::serializedUser,
            json_encode(User::byEmail('i@shagg.ru', $db), JSON_PRETTY_PRINT)
        );
    }

    private static function user(array $dbRow): User
    {
        return new User($dbRow);
    }

    private static function dbRow(): array
    {
        return [
            'email' => 'i@shagg.ru',
            'name' => 'Alexander',
            'lastname' => 'Shogenov',
            'phone' => '79951999195',
            'image' => '/path/to/image.jpg'
        ];

    }}

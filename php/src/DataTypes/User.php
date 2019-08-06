<?php

namespace AuthForm\DataTypes;

use AuthForm\Exception\NotFound;
use Doctrine\DBAL\Connection;

class User implements \JsonSerializable
{
    private const DB_NAME = 'user';
    private const DB_FIELDS = ['email', 'name', 'lastname', 'phone', 'image', 'password'];

    public static function byEmail(string $email, Connection $dbConnection): self
    {
        $row = $dbConnection->fetchAssoc(
            'SELECT ' . implode(', ', self::DB_FIELDS) . ' FROM ' . self::DB_NAME . ' WHERE email = ?',
            [$email]
        );

        if ($row === false) {
            throw new NotFound(sprintf('User with email "%s" not found', $email));
        }

        return new self($row);
    }

    /**
     * @var array
     */
    private $dbRow;

    public function __construct(array $dbRow)
    {
        $this->dbRow = $dbRow;
    }

    /**
     * @return string
     */
    public function passwordHash(): string
    {
        return $this->dbRow['password'];
    }

    /**
     * @return array
     */
    public function jsonSerialize(): array
    {
        return omitNullValues([
            'email' => $this->dbRow['email'],
            'name' => $this->dbRow['name'],
            'lastname' => $this->dbRow['lastname'],
            'phone' => $this->dbRow['phone'],
            'image' => $this->dbRow['image'] ?? null,
        ]);
    }
}

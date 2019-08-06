<?php


namespace AuthForm\DbStorage;

use Doctrine\DBAL\Connection;


class User
{
    public const REQUIRED_FIELDS_FOR_NEW_USER = ['email', 'name', 'lastname', 'phone', 'password'];
    private const DB_NAME = 'user';
    private const DB_FIELDS = ['email', 'name', 'lastname', 'phone', 'password', 'image'];
    /**
     * @var Connection
     */
    private $dbConnection;

    public function __construct(Connection $dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }

    /**
     * @param array $userData
     * @throws \Doctrine\DBAL\DBALException
     */
    public function insert(array $userData): void
    {
        $this->dbConnection->insert(
            self::DB_NAME,
            array_combine(
                self::DB_FIELDS,
                array_map(static function ($field) use ($userData) {
                    return $userData[$field] ?? null;
                }, self::DB_FIELDS)
            )
        );
    }
}

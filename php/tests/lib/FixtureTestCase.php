<?php
namespace AuthForm\Tests;

use Doctrine\DBAL;

class FixtureTestCase extends \PHPUnit\Framework\TestCase
{
    /** @var DBAL\Connection */
    public static $dbConnection;

    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();
        self::$dbConnection = self::dbConnectionSingleton();
    }


    public function setUp(): void
    {
        parent::setUp();
        self::$dbConnection->beginTransaction();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        self::$dbConnection->rollBack();
    }


    private static function dbConnectionSingleton(): DBAL\Connection
    {
        static $connection;

        if (!isset($connection)) {
            exec(__DIR__ . '/../../../db/fixture.sh -q');

            $connection = DBAL\DriverManager::getConnection([
                'url' =>  json_decode(file_get_contents(__DIR__ . '/../../settings.json'))->{'db-test'},
            ]);
        }

        return $connection;

    }
}

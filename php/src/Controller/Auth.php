<?php


namespace AuthForm\Controller;

use AuthForm\DbStorage\User;
use AuthForm\Exception\BadRequest;
use AuthForm\Exception\NotFound;
use AuthForm\Service\Authentication;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Psr\Http\Message\ResponseInterface;
use Zend\Diactoros\ServerRequest;
use Zend\Diactoros\UploadedFile;
use function AuthForm\assertEmailIsValid;
use AuthForm\DataTypes;
use function AuthForm\Fs\saveBase64AsImgFile;

class Auth
{
    /** @var ResponseInterface */
    private $response;
    /**
     * @var Connection
     */
    private $dbConnection;
    /**
     * @var User
     */
    private $user;
    /**
     * @var Authentication
     */
    private $authentication;
    /**
     * @var string
     */
    private $uploadPath;

    public function __construct(ResponseInterface $response, Connection $dbConnection, User $user,
                                Authentication $authentication, string $uploadPath)
    {
        $this->response = $response;
        $this->dbConnection = $dbConnection;
        $this->user = $user;
        $this->authentication = $authentication;
        $this->uploadPath = $uploadPath;
    }

    /**
     * @param ServerRequest $request
     * @return ResponseInterface
     * @throws BadRequest
     * @throws NotFound
     * @throws \Doctrine\DBAL\DBALException
     */
    public function checkEmail(ServerRequest $request): ResponseInterface
    {
        $email = $request->getParsedBody()['email'] ?? null;
        assertEmailIsValid($email);
        if (!$this->dbConnection->fetchColumn('SELECT 1 FROM user WHERE email = ?', [$email])) {
            throw new NotFound('Email is not registered');
        }

        $this->response->getBody()->write('Ok');
        return $this->response;
    }

    /**
     * @param ServerRequest $request
     * @return ResponseInterface
     * @throws BadRequest
     * @throws \Doctrine\DBAL\DBALException
     */
    public function registration(ServerRequest $request): ResponseInterface
    {
        $userData = $request->getParsedBody();
        self::assertRequiredFieldsAreFilled($userData, User::REQUIRED_FIELDS_FOR_NEW_USER);
        assertEmailIsValid($userData['email']);

        $userData['password'] = password_hash($userData['password'], PASSWORD_DEFAULT);
        
        /** @var UploadedFile|null $uploadedImage */
        if (isset($userData['image'])) {
            [$uploadPath, $fileName, $extension] = saveBase64AsImgFile($userData['image'], md5($userData['email']), $this->uploadPath);
            $userData['image'] = "$fileName.$extension";
        }
        try {
            $this->user->insert($userData);
            $this->response->getBody()->write($this->authentication->authenticate(new DataTypes\User($userData)));
            return $this->response;
        } catch (UniqueConstraintViolationException $exception) {
            throw new BadRequest($exception->getMessage());
        }
    }

    /**
     * @param ServerRequest $request
     * @return ResponseInterface
     * @throws BadRequest
     * @throws NotFound
     */
    public function login(ServerRequest $request): ResponseInterface
    {
        $loginData = $request->getParsedBody();
        self::assertRequiredFieldsAreFilled($loginData, ['email', 'password']);
        assertEmailIsValid($loginData['email']);

        $user = DataTypes\User::byEmail($loginData['email'], $this->dbConnection);

        if (!password_verify($loginData['password'], $user->passwordHash())) {
            throw new BadRequest('Invalid password');
        }

        $this->response->getBody()->write($this->authentication->authenticate($user));
        return $this->response;
    }

    /**
     * @param array $fields
     * @param array $requiredFields
     */
    private static function assertRequiredFieldsAreFilled(array $fields, array $requiredFields): void
    {
        array_map(
            static function ($fieldName) use ($fields) {
                if (!isset($fields[$fieldName]) || $fields[$fieldName] === '') {
                    throw new BadRequest("Field $fieldName is required");
                }
            },
            $requiredFields
        );
    }
}

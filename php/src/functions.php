<?php
namespace AuthForm;

use AuthForm\Exception\BadRequest;

/**
 * @param string $email
 * @return void
 * @throws BadRequest
 */
function assertEmailIsValid(?string $email): void
{
    if (!preg_match('/[^@\s]+@[^@\s]+\.[^@\s]+/', $email)) {
        throw new BadRequest('Email is invalid');
    }
}

namespace AuthForm\DataTypes;
{
    /**
     * @param $array
     * @return array
     */
    function omitNullValues($array): array
    {
        return array_filter($array, static function ($val) {
            return $val !== null;
        });
    }

    /**
     * @param $dataType
     * @return mixed
     */
    function asObject($dataType)
    {
        return json_decode(json_encode($dataType), false);
    }
}

namespace AuthForm\Fs;
{
    /**
     * @param string $base64String
     * @param string $newFileName
     * @param string $uploadPath
     * @return array [$uploadPath, $filename, $extension]
     * @throws \AuthForm\Exception\BadRequest
     */
    function saveBase64AsImgFile(string $base64String, string $newFileName, string $uploadPath): array
    {
        if (preg_match('/^data:image\/(\w+);base64,/', $base64String, $extension)) {
            $encodedImg = substr($base64String, strpos($base64String, ',') + 1);
            $extension = strtolower($extension[1]);

            if (!in_array($extension, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
                throw new \AuthForm\Exception\BadRequest('Invalid image type');
            }

            $img = base64_decode($encodedImg);

            if ($img === false) {
                throw new \AuthForm\Exception\BadRequest('Base64_decode failed');
            }
            file_put_contents("$uploadPath/$newFileName.$extension", $img);
            return [$uploadPath, $newFileName, $extension];
        } else {
            throw new \AuthForm\Exception\BadRequest('Did not match data URI with image data');
        }
    }
}



<?php
require __DIR__ . '/../vendor/autoload.php';

$settings = json_decode(file_get_contents(__DIR__ . '/../settings.json'));
$settings->uploadDir = __DIR__ . '/img';
(new AuthForm\Application($settings))->run();

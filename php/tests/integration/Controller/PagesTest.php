<?php

namespace AuthForm\Tests\Unit\Controllers;

use AuthForm\Controller\Pages;
use Zend\Diactoros\Response;
use PHPUnit\Framework\TestCase;

class PagesTest extends TestCase
{
    public function testReturnsMainPage(): void
    {
        $this->assertStringContainsString(
            '<body>', (new Pages(new Response()))->home()->getBody()
        );
    }
}

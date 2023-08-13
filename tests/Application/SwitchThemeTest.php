<?php

namespace App\Tests\Application;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\BrowserKit\Cookie;

class SwitchThemeTest extends WebTestCase
{
    public function testDefaultTheme(): void
    {
        $client = static::createClient();
        $client->request('GET', '/en');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('html.dark');
    }

    public function testLightThemeSelected(): void
    {
        $client = static::createClient();
        $client -> getCookieJar() -> set(new Cookie("theme", "light"));
        $client->request('GET', '/en');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorNotExists('html.dark');
    }

    public function testDarkThemeSelected(): void
    {
        $client = static::createClient();
        $client -> getCookieJar() -> set(new Cookie("theme", "dark"));
        $client->request('GET', '/en');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorExists('html.dark');
    }
}

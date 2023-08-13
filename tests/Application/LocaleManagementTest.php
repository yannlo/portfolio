<?php

namespace App\Tests\Application;

use Symfony\Component\BrowserKit\Cookie;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class LocaleManagementTest extends WebTestCase
{
    public function testSelectDefaultLocaleWithNavigatorLocale(): void
    {

        $client = static::createClient();

        $client->request('GET', '/', server: [
            "HTTP_ACCEPT_LANGUAGE" => "fr,en"
        ]);

        $this->assertResponseStatusCodeSame(302);
        $this->assertResponseRedirects("/fr");
    }

    public function testSelectDefaultLocaleWithoutNavigatorLocale(): void
    {
        $client = static::createClient();

        $client->request('GET', '/', server:[
            "HTTP_ACCEPT_LANGUAGE" => ""
        ]);

        $this->assertResponseStatusCodeSame(302);
        $this->assertResponseRedirects("/en");
    }

    public function testSelectDefaultLocaleWithIncompatibleNavigatorLocale(): void
    {
        $client = static::createClient();
        $client->request('GET', '/', server:[
            "HTTP_ACCEPT_LANGUAGE" => "es,ch"
        ]);

        $this->assertResponseStatusCodeSame(302);
        $this->assertResponseRedirects("/en");
    }

    public function testSelectPageLocaleLikeDefaultlocale(): void
    {
        $client = static::createClient();
        $client->request('GET', '/fr/mon-profil');

        $this->assertResponseIsSuccessful();
        $this->assertBrowserCookieValueSame("currentLocale", 'fr');
    }

    public function testLocaleIsGood(): void
    {

        $client = static::createClient();
        $client -> getCookieJar() -> set(new Cookie("currentLocale", "en"));
        $client->request('GET', '/en/my-profile');

        $this->assertResponseIsSuccessful();
        $this->assertBrowserCookieValueSame("currentLocale", 'en');
    }

    public function testLocaleIsBad(): void
    {

        $client = static::createClient();
        $client -> getCookieJar() -> set(new Cookie("currentLocale", "fr"));
        $client->request('GET', '/en/my-profile');

        $this->assertResponseRedirects("/fr/mon-profil");
    }
}

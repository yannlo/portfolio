<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class HandleCurrentLocale
{
    private Request $request;
    public function __construct(
        private UrlGeneratorInterface $router,
        RequestStack $requestStack,
        private string $domain
    ) {
        $this -> request = $requestStack ->getCurrentRequest();
    }
    public function __invoke(): Response
    {
        $session = $this -> request->getSession();
        $currentRouteName = $this -> request->attributes->get("_route");
        $currentRouteParams = $this -> request->attributes->get("_route_params");
        $currentLocale = $this -> request->cookies -> get('currentLocale');
        $response = new Response();

        if ($session -> get("previousRouteName") == $currentRouteName) {
            $response->headers->setCookie(
                Cookie::create('currentLocale')
                    ->withValue($this -> request->getLocale())
                    ->withExpires(new \DateTime("+28Days"))
                    ->withHttpOnly()
                    ->withDomain($this -> domain)
                    ->withSecure(true)
            );
        } elseif (!is_null($currentLocale) && $this -> request->getLocale() !== $currentLocale) {
            $currentRouteParams["_locale"] = $currentLocale;
            $response = new RedirectResponse($this->router->generate($currentRouteName, $currentRouteParams));
        }
        $session->set("previousRouteName", $currentRouteName);

        return $response;
    }
}

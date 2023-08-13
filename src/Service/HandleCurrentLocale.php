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
        private string $localeCookieName
    ) {
        $this -> request = $requestStack ->getCurrentRequest();
    }
    public function __invoke(): Response
    {
        $currentRouteName = $this -> request->attributes->get("_route");
        $currentRouteParams = $this -> request->attributes->get("_route_params");
        $currentLocale = $this -> request->cookies -> get($this -> localeCookieName);
        $response = new Response();

        if (is_null($currentLocale)) {
            $response->headers->setCookie(
                Cookie::create($this -> localeCookieName)
                    ->withValue($this -> request->getLocale())
                    ->withExpires(new \DateTime("+28Days"))
                    -> withHttpOnly(false)
                    // ->withDomain($this -> domain)
                    ->withSameSite("strict")
                    ->withSecure(true)
            );
        } elseif (!is_null($currentLocale) && $this -> request->getLocale() !== $currentLocale) {
            $currentRouteParams["_locale"] = $currentLocale;
            $response = new RedirectResponse($this->router->generate($currentRouteName, $currentRouteParams));
        }

        return $response;
    }
}

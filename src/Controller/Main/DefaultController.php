<?php

namespace App\Controller\Main;

use App\Service\HandleCurrentLocale;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DefaultController extends AbstractController
{
    #[Route(
        '/{_locale}',
        name: 'app_index',
        methods:["GET"],
        requirements:[
            '_locale' => "%app.main.supported_locales%"
        ]
    )]
    public function index(
        HandleCurrentLocale $handleCurrentLocale
    ): Response
    {
        $response = $handleCurrentLocale();
        
        return $this->render('main/default/index.html.twig', [], $response);
    }

    #[Route(
        [
            "en" => "/{_locale}/my-profile",
            "fr" => "/{_locale}/mon-profil",
        ],
        name: "app_about",
        methods:["GET"],
        requirements:[
            '_locale' => '%app.main.supported_locales%'
        ],
    )]
    public function about(
        HandleCurrentLocale $handleCurrentLocale
    ): Response
    {
        $response = $handleCurrentLocale();

        return $this -> render("main/default/about.html.twig", response: $response);
    }


    #[Route(
        path:"/",
        name: "app_index_redirect",
        methods:["GET"]
    )]
    public function redirectToIndex(Request $request): Response
    {
        $supportedLocales= explode("|",$this->getParameter('app.main.supported_locales'));
        foreach ($request -> getLanguages() as  $locale) {
            if(in_array($locale, $supportedLocales)){
                return  $this -> redirectToRoute("app_index",[
                    "_locale" => $locale
                ]);
            }
        }
        return  $this -> redirectToRoute("app_index",[
            "_locale" => "en"
        ]);

    }
}

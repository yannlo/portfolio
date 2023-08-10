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
    ): Response {
        $response = $handleCurrentLocale();
        if($response -> getStatusCode() == 302){
            return $response;
        }

        $projects =[];

        return $this->render('main/default/index.html.twig', [
            "projects" => $projects
        ], $response);
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
    ): Response {
        $response = $handleCurrentLocale();
        if($response -> getStatusCode() == 302){
            return $response;
        }
        
        return $this -> render("main/default/about.html.twig", response: $response);
    }


    #[Route(
        path:"/",
        name: "app_index_redirect",
        methods:["GET"]
    )]
    public function redirectToIndex(Request $request): Response
    {
        $currentLocale = $request->cookies -> get(
            $this->getParameter('app.main.locale_cookie_name')
        );
        
        if (!is_null($currentLocale)) {
            return  $this -> redirectToRoute("app_index", [
                "_locale" => $currentLocale
            ]);
        }

        $supportedLocales = explode("|", $this->getParameter('app.main.supported_locales'));
        foreach ($request -> getLanguages() as $locale) {
            if (in_array($locale, $supportedLocales)) {
                return  $this -> redirectToRoute("app_index", [
                    "_locale" => $locale
                ]);
            }
        }
        return  $this -> redirectToRoute("app_index", [
            "_locale" => $request->getDefaultLocale()
        ]);
    }


    public function skills(int $max = 3, string $groupName): Response
    {


        // get the recent articles somehow (e.g. making a database query)
        
        $max + 2;


        if($groupName == "dev"){
            $list = [
                [
                    'name' => "Symfony",
                    "level" => 11,
                    'uri' =>"/resources/images/skills/symfony.png"
                ],
                [
                    'name' => "React JS",
                    "level" => 9,
                    'uri' =>"/resources/images/skills/react-js.png"
                ],
                [
                    'name' => "SASS",
                    "level" => 10,
                    'uri' =>"/resources/images/skills/sass.png"
                ],
            ];
        }

        if($groupName == "design"){
            $list = [
                [
                    'name' => "User experience",
                    "level" => 10,
                ],
                [
                    'name' => "Prototypes",
                    "level" => 10,
                ],
                [
                    'name' => "Figma",
                    "level" => 9,
                    'uri' =>"/resources/images/skills/figma.png"
                ],
            ];
        }

        return $this->render('main/default/_skills.html.twig', [
            'list' => $list
        ]);
    }
}

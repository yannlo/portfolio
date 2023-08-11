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
        HandleCurrentLocale $handleCurrentLocale,
        string $_locale
    ): Response {
        $response = $handleCurrentLocale();
        if($response -> getStatusCode() == 302){
            return $response;
        }

        $projects =[
            [
                'id' => 1,
                'title' => "YannLo",
                'slug' => "yannlo",
                'type' => "website",
                'logo'=> "/resources/images/projects/yannlo.png",
            ]
        ];

        if($_locale == "fr"){
            $projects[0]['description'] = "Mon portfolio présentant mes compétences actuelles, ainsi mes derniers projets et designs réalisés.";
        } else {
            $projects[0]['description'] = "My portfolio showing my current skills, as well as my latest projects and designs.";
        }

        $devSkills = [
            [
                'name' => "Symfony",
                "level" => 10,
                'uri' =>"/resources/images/skills/symfony.png"
            ],
            [
                'name' => "React JS",
                "level" => 7,
                'uri' =>"/resources/images/skills/react-js.png"
            ],
            [
                'name' => "Tailwind CSS",
                "level" => 9,
                'uri' =>"/resources/images/skills/tailwind-css.png"
            ],
        ];

        $designSkills = [
            [
                'name' => "Figma",
                "level" => 9,
                'uri' =>"/resources/images/skills/figma.png"
            ],
            [
                'name' => "Prototypes",
                "level" => 10,
            ],
            [
                'name' => "User experience",
                "level" => 7,
            ],
        ];

        return $this->render('main/default/index.html.twig', [
            "projects" => $projects,
            "dev_skills" => $devSkills,
            "design_skills" => $designSkills
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

        $devSkills = [
            "back" => [
                [
                    'name' => "Symfony",
                    "level" => 10,
                    'uri' =>"/resources/images/skills/symfony.png"
                ],
                [
                    'name' => "Laravel",
                    "level" => 7,
                    'uri' =>"/resources/images/skills/laravel.png"
                ],
                [
                    'name' => "Adonis",
                    "level" => 7,
                    'uri' =>"/resources/images/skills/adonis.png"
                ],
                [
                    'name' => "PHP",
                    "level" => 11,
                    'uri' =>"/resources/images/skills/php.png"
                ],
                [
                    'name' => "Node Js",
                    "level" => 7,
                    'uri' =>"/resources/images/skills/node-js.png"
                ],
            ],
            "front" => [
                [
                    'name' => "React JS",
                    "level" => 9,
                    'uri' =>"/resources/images/skills/react-js.png"
                ],
                [
                    'name' => "Tailwind CSS",
                    "level" => 10,
                    'uri' =>"/resources/images/skills/tailwind-css.png"
                ],
                [
                    'name' => "Javascript",
                    "level" => 10,
                    'uri' =>"/resources/images/skills/javascript.png"
                ],
                [
                    'name' => "SASS",
                    "level" => 9,
                    'uri' =>"/resources/images/skills/sass.png"
                ],
            ],
            "management" => [
                [
                    'name' => "Scrum",
                    "level" => 9,
                ],
            ]
        ];

        $designSkills = [
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
        
        return $this -> render("main/default/about.html.twig",[
            "dev_skills" => $devSkills,
            "design_skills" => $designSkills,
        ], response: $response);
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

}

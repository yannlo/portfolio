<?php

namespace App\Controller\Main;

use App\Service\HandleCurrentLocale;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route(
    [
        "en" => "/{_locale}/my-projects",
        "fr" => "/{_locale}/mes-projets",
    ],
    name: 'app_project_',
    methods: ["GET"],
    requirements: [
        '_locale' => '%app.main.supported_locales%'
    ]
)]
class ProjectController extends AbstractController
{
    #[Route(name: 'list')]
    public function list(
        HandleCurrentLocale $handleCurrentLocale,
        string $_locale
    ): Response {
        $response = $handleCurrentLocale();
        if ($response->getStatusCode() == 302) {
            return $response;
        }

        $projects = [
            [
                'id' => 1,
                'title' => "YannLo",
                'slug' => "yannlo",
                'type' => "website",
                'logo' => "/resources/images/projects/yannlo.png",
            ]
        ];

        if ($_locale == "fr") {
            $projects[0]['description'] = "Mon portfolio présente mes compétences actuelles, ainsi mes derniers projets et designs réalisés.";
        } else {
            $projects[0]['description'] = "My portfolio shows my current skills, as well as my latest projects and designs.";
        }

        return $this->render('main/project/list.html.twig', [
            "projects" => $projects
        ], response: $response);
    }

    #[Route(
        '/{!slug}-{!id}',
        name: 'show',
        requirements: [
            "slug" => "[a-z\-]+",
            "id" => "\d+"
        ]
    )]
    public function show(
        string $slug,
        int $id,
        HandleCurrentLocale $handleCurrentLocale
    ): Response {
        $response = $handleCurrentLocale();
        if ($response->getStatusCode() == 302) {
            return $response;
        }

        
        if($id !== 1){
            throw $this->createNotFoundException();
        }

        if($slug !== 'yannlo'){
            return $this->redirectToRoute('app_project_show', [
                "slug" => "yannlo", 
                "id" => 1
            ]);
        }

        return $this->render('main/project/show.html.twig', [
            "slug" => $slug
        ], response: $response);
    }


    public function recents(int $max = 6): Response
    {
        $list = [];

        // get the recent articles somehow (e.g. making a database query)
        for ($i = 1; $i <= $max; $i++) {
            $list[] = [
                'id' => 1,
                'title' => "yannlo",
                'slug' => "yannlo",
                'logo' => "/resources/images/projects/yannlo.png"
            ];
        }

        return $this->render('main/project/_recents.html.twig', [
            'list' => $list
        ]);
    }
}

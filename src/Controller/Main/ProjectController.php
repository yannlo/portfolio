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
    methods:["GET"],
    requirements:[
        '_locale' => '%app.main.supported_locales%'
    ]
)]
class ProjectController extends AbstractController
{
    #[Route(name: 'list')]
    public function list(
        HandleCurrentLocale $handleCurrentLocale
    ): Response {
        $response = $handleCurrentLocale();
        if($response -> getStatusCode() == 302){
            return $response;
        }
        
        return $this->render('main/project/list.html.twig', response: $response);
    }

    #[Route(
        '/{!slug}-{!id}',
        name: 'show',
        requirements:[
            "slug" => "[a-z\-]+",
            "id" => "\d+"
        ]
    )]
    public function show(
        string $slug,
        HandleCurrentLocale $handleCurrentLocale
    ): Response {
        $response = $handleCurrentLocale();
        if($response -> getStatusCode() == 302){
            return $response;
        }
        
        return $this->render('main/project/show.html.twig', [
            "slug" => $slug
        ], response: $response);
    }


    public function recents(int $max = 6): Response
    {
        $list = [];

        // get the recent articles somehow (e.g. making a database query)
        for ($i=1; $i <= $max; $i++) { 
            $list[] = [
                'id' => 1,
                'title' => "yannlo",
                'slug' => "yannlo",
                'logo'=> "/resources/images/projects/yannlo.png"
            ]; 
        }

        return $this->render('main/project/_recents.html.twig', [
            'list' => $list
        ]);
    }
}

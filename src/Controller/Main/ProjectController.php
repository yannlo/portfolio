<?php

namespace App\Controller\Main;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route([
        "en" => "/my-projects",
        "fr" => "/mes-projets",
    ],
    name: 'app_project_',
    methods:["GET"]
)]
class ProjectController extends AbstractController
{
    #[Route(name: 'list')]
    public function list(): Response
    {
        return $this->render('project/list.html.twig');
    }

    #[Route('/{!slug}-{!id}',
        name: 'show',
        requirements:[
            "slug" => "[a-z\-]+",
            "id" => "\d+"
        ]
    )]
    public function show(string $slug): Response
    {
        return $this->render('project/show.html.twig',[
            "slug" => $slug
        ]);
    }
}

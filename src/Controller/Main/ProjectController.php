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
        return $this->render('main/project/show.html.twig', [
            "slug" => $slug
        ], response: $response);
    }
}

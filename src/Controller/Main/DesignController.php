<?php

namespace App\Controller\Main;

use App\Service\HandleCurrentLocale;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route(
    [
        "en" => "/{_locale}/my-designs",
        "fr" => "/{_locale}/mes-designs",
    ],
    name:"app_design_",
    methods:["GET"],
    requirements:[
        '_locale' => '%app.main.supported_locales%'
    ]
)]
class DesignController extends AbstractController
{
    #[Route(name: 'list')]
    public function list(
        HandleCurrentLocale $handleCurrentLocale
    ): Response {
        $response = $handleCurrentLocale();
        if($response -> getStatusCode() == 302){
            return $response;
        }

        return $this->render('main/design/list.html.twig', response: $response);
    }

    #[Route(
        '/{!slug}-{!id}',
        name: 'show',
        requirements:[
            "slug" => "[a-z\-]+",
            "id" => "\d+",
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
        
        return $this->render('main/design/show.html.twig', [
            "slug" => $slug
        ], response: $response);
    }
}

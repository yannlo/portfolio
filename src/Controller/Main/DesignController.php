<?php

namespace App\Controller\Main;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route([
        "en" => "/my-designs",
        "fr" => "/mes-designs",
    ],
    name:"app_design_",
    methods:["GET"]
)]
class DesignController extends AbstractController
{
    #[Route(name: 'list')]
    public function list(): Response
    {
        return $this->render('design/list.html.twig');
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
        return $this->render('design/show.html.twig',[
            "slug" => $slug
        ]);
    }
}

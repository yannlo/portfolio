<?php

namespace App\Controller\Main;

use App\Service\HandleCurrentLocale;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ContactController extends AbstractController
{
    #[Route(
        [
            "en" => "/{_locale}/contact-me",
            "fr" => "/{_locale}/contactez-moi",
        ],
        name: 'app_contact',
        methods:["GET"],
        requirements:[
            '_locale' => '%app.main.supported_locales%'
        ]
    )]
    public function index(
        HandleCurrentLocale $handleCurrentLocale
    ): Response {
        $response = $handleCurrentLocale();
        if($response -> getStatusCode() == 302){
            return $response;
        }

        return $this->render('main/contact/index.html.twig', response: $response);
    }

    #[Route('/contact', name: 'app_contact_process', methods:["POST"])]
    public function process(): Response
    {
        return $this -> redirectToRoute("app_contact");
    }
}

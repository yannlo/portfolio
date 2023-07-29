<?php

namespace App\Controller\Main;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContactController extends AbstractController
{
    #[Route([
            "en" => "/contact-me",
            "fr" => "/contactez-moi",
        ],
        name: 'app_contact',
        methods:["GET"]
    )]
    public function index(): Response
    {
        return $this->render('contact/index.html.twig');
    }

    #[Route('/contact', name: 'app_contact_process', methods:["POST"])]
    public function process(): Response
    {
        return $this -> redirectToRoute("app_contact");
    }
    
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/contact')]
class ContactController extends AbstractController
{
    #[Route(name: 'app_contact', methods:["GET"])]
    public function index(): Response
    {
        return $this->render('contact/index.html.twig');
    }

    #[Route(name: 'app_contact_process', methods:["POST"])]
    public function process(): Response
    {
        return $this -> redirectToRoute("app_contact");
    }
    
}

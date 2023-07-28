<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
        #[Route('/', name: 'app_index', methods:["GET"])]
    public function index(): Response
    {
        return $this->render('default/index.html.twig');
    }

    #[Route('/a-propos', name: "app_about", methods:["GET"])]
    public function about(): Response
    {
        return $this -> render("default/about.html.twig");
    }
}

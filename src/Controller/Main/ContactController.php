<?php

namespace App\Controller\Main;

use App\Entity\Message;
use App\Form\Main\MessageFormType;
use App\Service\HandleCurrentLocale;
use Symfony\Component\HttpFoundation\Request;
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
        methods: ["GET", "POST"],
        requirements: [
            '_locale' => '%app.main.supported_locales%'
        ]
    )]
    public function index(
        HandleCurrentLocale $handleCurrentLocale,
        Request $request
    ): Response {
        $response = $handleCurrentLocale();
        if ($response->getStatusCode() == 302) {
            return $response;
        }

        $message = new Message();

        $form = $this->createForm(MessageFormType::class, $message, [
            'action' => $this->generateUrl('app_contact'),
            'method' => 'POST',
        ]);

        $form->handleRequest($request);
        if ($request -> isMethod("POST") && $form->isSubmitted() && $form->isValid()) {
            $message = $form->getData();


            $this->addFlash(
                'message_sending',
                "confirm.send"
            );

            return $this->redirectToRoute('app_contact');
        }

        return $this->render('main/contact/index.html.twig',[
            "form" => $form
        ], response: $response);
    }
}

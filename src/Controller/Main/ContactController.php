<?php

namespace App\Controller\Main;

use App\Entity\Message;
use Symfony\Component\Mime\Email;
use App\Form\Main\MessageFormType;
use Symfony\Component\Mime\Address;
use App\Service\HandleCurrentLocale;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Translation\TranslatableMessage;
use Symfony\Contracts\Translation\TranslatorInterface;
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
        Request $request,
        MailerInterface $mailer,
        TranslatorInterface $translator
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
        if ($request->isMethod("POST") && $form->isSubmitted() && $form->isValid()) {
            $message = $form->getData();

            $this->generateMessageMail($message, $mailer);
            $this->generateConfirmMail($message, $mailer, $translator);
            $this->generateNotifMail($message, $mailer);

            $this->addFlash(
                'message_sending',
                "confirm.send"
            );
            return $this->redirectToRoute('app_contact');
        }

        return $this->render('main/contact/index.html.twig', [
            "form" => $form
        ], response: $response);
    }

    private function generateMessageMail(
        Message $message,
        MailerInterface $mailer
    ) {
        $email = (new Email())
            ->from(
                new Address(
                    $message->getEmail(),
                    $message->getName()
                )
            )
            ->to($this->getParameter("app.address.contact"))
            ->subject($message->getSubject())
            ->text($message->getContent());

        $mailer->send($email);
    }

    private function generateConfirmMail(
        Message $message,
        MailerInterface $mailer,
        TranslatorInterface $translator
    ) {
        $bot = $this->getParameter("app.address.bot");
        $email = (new TemplatedEmail())
            ->from(
                new Address(
                    $bot["email"],
                    $bot["name"]
                )
            )
            ->to(
                new Address(
                    $message->getEmail(),
                    $message->getName()
                )
            )
            ->subject($translator->trans("confirm.subject", domain: "contact"))
            ->htmlTemplate("main/contact/emails/confirm.html.twig");

        $mailer->send($email);
    }

    private function generateNotifMail(
        Message $message,
        MailerInterface $mailer
    ) {
        $bot = $this->getParameter("app.address.bot");
        $email = (new TemplatedEmail())
            ->from(
                new Address(
                    $bot["email"],
                    "Mr Bot"
                )
            )
            ->to($this->getParameter("app.address.admin"))
            ->subject("[Portfolio]Nouveau de message de: " . $message->getName())
            ->htmlTemplate("main/contact/emails/notif.html.twig")
            ->context([
                "name" => $message->getName(),
                "subject" => $message->getSubject(),
            ]);

        $mailer->send($email);
    }
}

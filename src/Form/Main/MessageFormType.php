<?php

namespace App\Form\Main;

use App\Entity\Message;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Translation\TranslatableMessage;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class MessageFormType extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                "required" => true,
                "attr" => [
                    "class" => "bg-gray-light dark:bg-gray-dark focus-visible:ring focus:outline-none focus:ring ring-red dark:ring-yellow p-2 rounded"
                ],
                "label" => new TranslatableMessage("form.name", domain: "contact"),
                "label_attr" => [
                    "class" => "inline-block w-full font-medium text-xl"
                ]
            ])
            ->add('email', EmailType::class, [
                "required" => true,
                "attr" => [
                    "class" => "bg-gray-light dark:bg-gray-dark focus-visible:ring focus:outline-none focus:ring ring-red dark:ring-yellow p-2 rounded"
                ],
                "label" => new TranslatableMessage("form.email", domain: "contact"),
                "label_attr" => [
                    "class" => "inline-block w-full font-medium text-xl"
                ]
            ])
            ->add('subject', TextType::class, [
                "required" => true,
                "attr" => [
                    "class" => "bg-gray-light dark:bg-gray-dark focus-visible:ring focus:outline-none focus:ring ring-red dark:ring-yellow p-2 rounded"
                ],
                "label" => new TranslatableMessage("form.subject", domain: "contact"),
                "label_attr" => [
                    "class" => "inline-block w-full font-medium text-xl"
                ]
            ])
            ->add('content', TextareaType::class, [
                "required" => true,
                "attr" => [
                    "class" => "bg-gray-light dark:bg-gray-dark focus-visible:ring focus:outline-none focus:ring ring-red dark:ring-yellow p-2 rounded min-h-[150px]"
                ],
                "label" => new TranslatableMessage("form.message", domain: "contact"),
                "label_attr" => [
                    "class" => "inline-block w-full font-medium text-xl"
                ]
            ])
            ->add('send', SubmitType::class, [
                "attr" => [
                    "class" => "btn btn--primary"
                ],
                "label" => new TranslatableMessage("form.submit", domain: "contact")
            ]);
    }
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Message::class,
        ]);
    }
}

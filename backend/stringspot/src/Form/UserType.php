<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Regex;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, [])
            ->add('roles', ChoiceType::class, [
                "choices" => [
                    "Administrator" => "ROLE_ADMIN",
                    "User" => "ROLE_USER",
                ],
                "multiple" => true,
                "expanded" => false,
                "label" => "Privileges",
            ])
            ->add('first_name', TextType::class, [
                "attr" => [
                    "placeholder" => "James",
                ],
            ])
            ->add('last_name', TextType::class, [
                "attr" => [
                    "placeholder" => "Bond",
                ],
            ]);
        // j'utilise la custom_option pour faire un affichage conditionnel sur le mot de passe
        if ($options["custom_options"] !== "edit") {
            $builder
                ->add('password', RepeatedType::class, [
                    "type" => PasswordType::class,
                    "constraints" => new Regex([
                        'pattern' => "/^[0-9]{4}$/",
                        'message' => 'Le mot de passe doit avoir exactement 4 chiffres.'
                    ]),
                    "first_options" => ["label" => "Rentrez un mot de passe", "help" => "Le mot de passe doit avoir exactement 4 chiffres"],
                    "second_options" => ["label" => "Confirmez le mot de passe"],
                    "invalid_message" => "Les champs doivent être identiques",
                ]);
        };
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            "custom_options" => "default",
        ]);
    }
}

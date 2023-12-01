<?php

namespace App\Form;

use App\Entity\Center;
use App\Entity\Court;
use App\Repository\CenterRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CourtType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('number', NumberType::class)
            ->add('type', ChoiceType::class, [
                'choices' => [
                    'Tennis' => 'tennis',
                    'Badminton' => 'badminton',
                    'Padel' => 'padel'
                ],
                'expanded' => false,
                'multiple' => false
            ])
            ->add('center', EntityType::class, [
                'class' => Center::class,
                'choice_label' => 'name',
                'query_builder' => function (CenterRepository $cr) {
                    return $cr->createQueryBuilder('c')
                        ->orderBy('c.name', 'ASC');
                },
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Court::class,
        ]);
    }
}

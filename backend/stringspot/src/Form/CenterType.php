<?php

namespace App\Form;

use App\Entity\Center;
use App\Entity\Zone;
use App\Repository\ZoneRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CenterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class)
            ->add('address', TextType::class)
            ->add('number_courts', NumberType::class)
            ->add('zone', EntityType::class, [
                'class' => Zone::class,
                'choice_label' => 'post_code',
                'query_builder' => function (ZoneRepository $zr) {
                    return $zr->createQueryBuilder('z')
                        ->orderBy('z.post_code', 'ASC');
                },
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Center::class,
        ]);
    }
}

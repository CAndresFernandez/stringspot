<?php

namespace App\Form;

use App\Entity\Country;
use App\Entity\Zone;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ZoneType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('country', EntityType::class, [
            'class' => Country::class,
            'choice_label' => 'name',
            'query_builder' => function (EntityRepository $cr) {
                return $cr->createQueryBuilder('c')
                    ->orderBy('c.name', 'ASC');
            }
        ])
            ->add('post_code', TextType::class)
            ->add('post_code', TextType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Zone::class,
        ]);
    }
}

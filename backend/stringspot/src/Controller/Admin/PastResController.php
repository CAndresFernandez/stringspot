<?php

namespace App\Controller\Admin;

use App\Entity\PastRes;
use App\Repository\PastResRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/pastRes')]
class PastResController extends AbstractController
{
    #[Route('/{id}', name: 'app_admin_pastRes_show', methods: ['GET'])]
    public function show(PastRes $pastRes): Response
    {
        $user = $pastRes->getUser();
        return $this->render('pastRes/show.html.twig', [
            'pastRes' => $pastRes,
            'user' => $user
        ]);
    }
}

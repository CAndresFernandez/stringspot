<?php

namespace App\Controller\Admin;

use App\Repository\CategoryRepository;
use App\Repository\OrderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\Discovery;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin')]
class MainController extends AbstractController
{
    #[Route('/')]
    public function home() {
        return $this->render("main/home.html.twig");
    }
}

<?php

namespace App\Controller\Admin;

use App\Entity\Center;
use App\Form\CenterType;
use App\Repository\CenterRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/center')]
class CenterController extends AbstractController
{
    #[Route('/', name: 'app_admin_center_list', methods: ['GET'])]
    public function list(CenterRepository $centerRepository): Response
    {
        return $this->render('admin/center/list.html.twig', [
            'centers' => $centerRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_admin_center_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $center = new Center();
        $form = $this->createForm(CenterType::class, $center);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($center);
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_center_list', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin/center/new.html.twig', [
            'center' => $center,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_center_show', methods: ['GET'])]
    public function show(Center $center): Response
    {
        return $this->render('admin/center/show.html.twig', [
            'center' => $center,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_admin_center_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Center $center, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(CenterType::class, $center);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_center_list', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin/center/edit.html.twig', [
            'center' => $center,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_center_delete', methods: ['POST'])]
    public function delete(Request $request, Center $center, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$center->getId(), $request->request->get('_token'))) {
            $entityManager->remove($center);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_admin_center_list', [], Response::HTTP_SEE_OTHER);
    }
}

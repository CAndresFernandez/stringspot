<?php

namespace App\Controller\Admin;

use App\Entity\Court;
use App\Form\CourtType;
use App\Repository\CourtRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/court')]
class CourtController extends AbstractController
{
    #[Route('/', name: 'app_admin_court_index', methods: ['GET'])]
    public function index(CourtRepository $courtRepository): Response
    {
        return $this->render('admin/court/index.html.twig', [
            'courts' => $courtRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_admin_court_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $court = new Court();
        $form = $this->createForm(CourtType::class, $court);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($court);
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_court_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin/court/new.html.twig', [
            'court' => $court,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_court_show', methods: ['GET'])]
    public function show(Court $court): Response
    {
        return $this->render('admin/court/show.html.twig', [
            'court' => $court,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_admin_court_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Court $court, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(CourtType::class, $court);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_court_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('admin/court/edit.html.twig', [
            'court' => $court,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_court_delete', methods: ['POST'])]
    public function delete(Request $request, Court $court, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$court->getId(), $request->request->get('_token'))) {
            $entityManager->remove($court);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_admin_court_index', [], Response::HTTP_SEE_OTHER);
    }
}

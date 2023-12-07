<?php

namespace App\Controller\Admin;

use App\Entity\Country;
use App\Form\CountryType;
use App\Repository\CountryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/country')]
class CountryController extends AbstractController
{
    #[Route('/', name: 'app_admin_country_list', methods: ['GET'])]
    public function list(CountryRepository $countryRepository): Response
    {
        return $this->render('country/list.html.twig', [
            'countries' => $countryRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_admin_country_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $country = new Country();
        $form = $this->createForm(CountryType::class, $country);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($country);
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_country_list', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('country/new.html.twig', [
            'country' => $country,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_country_show', methods: ['GET'])]
    public function show(Country $country): Response
    {
        $zones = $country->getZones();
        $allZonesCourtCounts = [];
        foreach ($zones as $zone) {
            $centers = $zone->getCenters();
            $allCentersCourtCount = [];
            foreach ($centers as $center) {
                $centerNumberCourts = $center->getNumberCourts();
                $allCentersCourtCount[] = $centerNumberCourts;
            }
            $zoneNumberCourts = array_sum($allCentersCourtCount);
            $allZonesCourtCounts[$zone->getPostCode()] = $zoneNumberCourts;
        }

        return $this->render('country/show.html.twig', [
            'country' => $country,
            'zones' => $zones,
            'allZonesCourtCounts' => $allZonesCourtCounts
        ]);
    }

    #[Route('/{id}/edit', name: 'app_admin_country_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Country $country, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(CountryType::class, $country);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_admin_country_list', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('country/edit.html.twig', [
            'country' => $country,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_country_delete', methods: ['POST'])]
    public function delete(Request $request, Country $country, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$country->getId(), $request->request->get('_token'))) {
            $entityManager->remove($country);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_admin_country_list', [], Response::HTTP_SEE_OTHER);
    }
}

<?php

namespace App\State;

use ApiPlatform\Doctrine\Orm\State\CollectionProvider;
use ApiPlatform\Doctrine\Orm\State\ItemProvider;
use ApiPlatform\Metadata\CollectionOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Reservation;
use App\Repository\ReservationRepository;
use DateTime;
use DateTimeInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\RequestStack;

class ReservationStateProvider implements ProviderInterface
{
    private $reservationRepository;
    private $requestStack;

    public function __construct(#[Autowire(service: CollectionProvider::class)] private ProviderInterface $collectionProvider, #[Autowire(service: ItemProvider::class)] private ProviderInterface $itemProvider, ReservationRepository $reservationRepository, RequestStack $requestStack)
    {
        $this->reservationRepository = $reservationRepository;
        $this->requestStack = $requestStack;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        if ($operation instanceof CollectionOperationInterface) {
            $request = $this->requestStack->getCurrentRequest();
            $timestamp = (int) $request->query->get('startDate')/1000;
            $startDate = new \DateTime();
            if ($startDate instanceof DateTime) {
                $startDate->setTimestamp($timestamp);
                $centerId = (int)$request->query->get('centerId');
                return $this->reservationRepository->getReservationsByCenter($startDate, $centerId);
            } else {
                dd('Failed to parse the date');
            }
        }

        $reservation = $this->itemProvider->provide($operation, $uriVariables, $context);
        if ($reservation instanceof Reservation) {
            return $reservation;
        }
        return [];
    }
}

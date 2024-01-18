<?php

namespace App\Entity;

use App\Entity\Reservation;
use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\CourtRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\ReservationRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CourtRepository::class)]
#[ApiResource(
    operations: [
        new Get,
        new GetCollection,
    ],
    normalizationContext: ['groups' => ['courts']]
)]
class Court
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['courts', 'centers'])]
    private ?int $id = null;

    #[ORM\Column(length: 64)]
    #[Groups(['courts', 'reservations', 'user:read', 'centers'])]
    private ?string $number = null;

    #[ORM\Column(length: 64)]
    #[Groups(['courts', 'reservations', 'users', 'centers'])]
    private ?string $type = null;

    #[ORM\OneToMany(mappedBy: 'court', targetEntity: Reservation::class)]
    #[Groups(['courts', 'centers'])]
    private Collection $reservations;

    #[ORM\ManyToOne(inversedBy: 'courts')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['courts', 'users'])]
    private ?Center $center = null;


    public function __construct()
    {
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(string $number): static
    {
        $this->number = $number;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setCourt($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation, ReservationRepository $reservationRepository): static
    {
        if ($this->reservations->removeElement($reservation)) {
            $reservationRepository->remove($reservation, true);
        }

        return $this;
    }

    public function getCenter(): ?Center
    {
        return $this->center;
    }

    public function setCenter(?Center $center): static
    {
        $this->center = $center;

        return $this;
    }
}

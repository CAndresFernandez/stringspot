<?php

namespace App\Entity;

use App\Entity\User;
use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\ReservationRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
#[ApiResource(
    operations: [
        new Get,
        new GetCollection,
        new Post,
        new Delete
    ],
    normalizationContext: ['groups' => ['reservations']]
)]
#[ORM\HasLifecycleCallbacks]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['reservations'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['courts', 'reservations', 'users'])]
    private ?\DateTimeImmutable $start_time = null;

    #[ORM\Column]
    #[Groups(['courts', 'reservations', 'users'])]
    private ?\DateTimeImmutable $end_time = null;

    #[ORM\Column(length: 64)]
    #[Groups(['reservations'])]
    private ?string $res_type = null;

    #[ORM\Column]
    #[Groups(['reservations', 'users'])]
    private ?bool $active = null;

    #[ORM\ManyToOne(inversedBy: 'reservations', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['reservations', 'users'])]
    private ?Court $court = null;

    #[ORM\Column]
    #[Groups(['reservations', 'users'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['reservations'])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\OneToOne(inversedBy: 'reservation')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['courts', 'reservations'])]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartTime(): ?\DateTimeImmutable
    {
        return $this->start_time;
    }

    public function setStartTime(\DateTimeImmutable $start_time): static
    {
        $this->start_time = $start_time;

        return $this;
    }

    public function getEndTime(): ?\DateTimeImmutable
    {
        return $this->end_time;
    }

    public function setEndTime(\DateTimeImmutable $end_time): static
    {
        $this->end_time = $end_time;

        return $this;
    }

    public function getResType(): ?string
    {
        return $this->res_type;
    }

    public function setResType(string $res_type): static
    {
        $this->res_type = $res_type;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;

        return $this;
    }

    public function getCourt(): ?Court
    {
        return $this->court;
    }

    public function setCourt(?Court $court): static
    {
        $this->court = $court;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    #[ORM\PrePersist]
    public function setCreatedAt(): static
    {
        $this->createdAt = new \DateTimeImmutable();

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;

        return $this;
    }
}

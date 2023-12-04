<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\PastResRepository;
use ApiPlatform\Metadata\GetCollection;

#[ORM\Entity(repositoryClass: PastResRepository::class)]
#[ApiResource(
    operations: [
        new Get(uriTemplate: '/pastRes/{id}'),
        new GetCollection(uriTemplate: '/pastRes'),
        new Post(uriTemplate: '/pastRes/{id}'),
    ]
)]
#[ORM\HasLifecycleCallbacks]
class PastRes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'pastRes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column(length: 255)]
    private ?string $center = null;

    #[ORM\Column(length: 64)]
    private ?string $court = null;

    #[ORM\Column(length: 64)]
    private ?string $zone = null;

    #[ORM\Column(length: 64)]
    private ?string $country = null;

    #[ORM\Column(length: 64)]
    private ?string $date = null;

    #[ORM\Column(length: 64)]
    private ?string $time = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getCenter(): ?string
    {
        return $this->center;
    }

    public function setCenter(string $center): static
    {
        $this->center = $center;

        return $this;
    }

    public function getCourt(): ?string
    {
        return $this->court;
    }

    public function setCourt(string $court): static
    {
        $this->court = $court;

        return $this;
    }

    public function getZone(): ?string
    {
        return $this->zone;
    }

    public function setZone(string $zone): static
    {
        $this->zone = $zone;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getDate(): ?string
    {
        return $this->date;
    }

    public function setDate(string $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getTime(): ?string
    {
        return $this->time;
    }

    public function setTime(string $time): static
    {
        $this->time = $time;

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
}

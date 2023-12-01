<?php

namespace App\Entity;

use App\Repository\CenterRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CenterRepository::class)]
class Center
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\ManyToOne(inversedBy: 'centers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Zone $zone = null;

    #[ORM\OneToMany(mappedBy: 'center', targetEntity: Court::class, orphanRemoval: true)]
    private Collection $courts;

    #[ORM\Column]
    private ?int $number_courts = null;

    public function __construct()
    {
        $this->courts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getZone(): ?Zone
    {
        return $this->zone;
    }

    public function setZone(?Zone $zone): static
    {
        $this->zone = $zone;

        return $this;
    }

    /**
     * @return Collection<int, Court>
     */
    public function getCourts(): Collection
    {
        return $this->courts;
    }

    public function addCourt(Court $court): static
    {
        if (!$this->courts->contains($court)) {
            $this->courts->add($court);
            $court->setCenter($this);
        }

        return $this;
    }

    public function removeCourt(Court $court): static
    {
        if ($this->courts->removeElement($court)) {
            // set the owning side to null (unless already changed)
            if ($court->getCenter() === $this) {
                $court->setCenter(null);
            }
        }

        return $this;
    }

    public function getNumberCourts(): ?int
    {
        return $this->number_courts;
    }

    public function setNumberCourts(int $number_courts): static
    {
        $this->number_courts = $number_courts;

        return $this;
    }
}

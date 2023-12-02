<?php

namespace App\Entity;

use App\Entity\Center;
use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ZoneRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: ZoneRepository::class)]
#[ApiResource(
    operations: [
        new Get,
        new GetCollection()
    ]
)]
class Zone
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 64)]
    private ?string $post_code = null;

    #[ORM\OneToMany(mappedBy: 'zone', targetEntity: Center::class)]
    private Collection $centers;

    #[ORM\Column(length: 64)]
    private ?string $city = null;

    #[ORM\ManyToOne(inversedBy: 'zones')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Country $country = null;

    public function __construct()
    {
        $this->centers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPostCode(): ?string
    {
        return $this->post_code;
    }

    public function setPostCode(string $post_code): static
    {
        $this->post_code = $post_code;

        return $this;
    }

    /**
     * @return Collection<int, Center>
     */
    public function getCenters(): Collection
    {
        return $this->centers;
    }

    public function addCenter(Center $center): static
    {
        if (!$this->centers->contains($center)) {
            $this->centers->add($center);
            $center->setZone($this);
        }

        return $this;
    }

    public function removeCenter(Center $center): static
    {
        if ($this->centers->removeElement($center)) {
            // set the owning side to null (unless already changed)
            if ($center->getZone() === $this) {
                $center->setZone(null);
            }
        }

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getCountry(): ?Country
    {
        return $this->country;
    }

    public function setCountry(?Country $country): static
    {
        $this->country = $country;

        return $this;
    }
}

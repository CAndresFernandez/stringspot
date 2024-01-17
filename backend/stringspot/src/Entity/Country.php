<?php

namespace App\Entity;

use App\Entity\Zone;
use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CountryRepository;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CountryRepository::class)]
#[ApiResource(
    operations: [
        new Get,
        new GetCollection,
    ],
    normalizationContext: ['groups' => ['countries']]
)]
class Country
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['countries'])]
    private ?int $id = null;

    #[ORM\Column(length: 64)]
    #[Groups(['courts', 'centers', 'countries', 'zones', 'reservations'])]
    private ?string $name = null;

    #[ORM\Column(length: 64)]
    #[Groups(['countries', 'centers'])]
    private ?string $abbr = null;

    #[ORM\Column(length: 64)]
    #[Groups(['countries'])]
    private ?string $continent = null;

    #[ORM\OneToMany(mappedBy: 'country', targetEntity: Zone::class, orphanRemoval: true)]
    #[Groups(['countries'])]
    private Collection $zones;

    public function __construct()
    {
        $this->zones = new ArrayCollection();
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

    public function getAbbr(): ?string
    {
        return $this->abbr;
    }

    public function setAbbr(string $abbr): static
    {
        $this->abbr = $abbr;

        return $this;
    }

    public function getContinent(): ?string
    {
        return $this->continent;
    }

    public function setContinent(string $continent): static
    {
        $this->continent = $continent;

        return $this;
    }

    /**
     * @return Collection<int, Zone>
     */
    public function getZones(): Collection
    {
        return $this->zones;
    }

    public function addZone(Zone $zone): static
    {
        if (!$this->zones->contains($zone)) {
            $this->zones->add($zone);
            $zone->setCountry($this);
        }

        return $this;
    }

    public function removeZone(Zone $zone): static
    {
        if ($this->zones->removeElement($zone)) {
            // set the owning side to null (unless already changed)
            if ($zone->getCountry() === $this) {
                $zone->setCountry(null);
            }
        }

        return $this;
    }
}

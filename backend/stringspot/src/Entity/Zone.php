<?php

namespace App\Entity;

use App\Repository\ZoneRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ZoneRepository::class)]
class Zone
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 64)]
    private ?string $country = null;

    #[ORM\Column(length: 64)]
    private ?string $post_code = null;

    #[ORM\OneToMany(mappedBy: 'zone', targetEntity: Court::class)]
    private Collection $courts;

    public function __construct()
    {
        $this->courts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
            $court->setZone($this);
        }

        return $this;
    }

    public function removeCourt(Court $court): static
    {
        if ($this->courts->removeElement($court)) {
            // set the owning side to null (unless already changed)
            if ($court->getZone() === $this) {
                $court->setZone(null);
            }
        }

        return $this;
    }
}

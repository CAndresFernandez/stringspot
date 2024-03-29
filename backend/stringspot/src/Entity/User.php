<?php

namespace App\Entity;

use App\Entity\Reservation;
use ApiPlatform\Metadata\Get;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Controller\MeController;
use Lexik\Bundle\JWTAuthenticationBundle\Security\User\JWTUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['user:read']],
    operations: [
        new Get,
        new GetCollection(name: 'get_current_user', uriTemplate: '/users/me', paginationEnabled: false, controller: MeController::class),
        new Post,
        new Delete
    ],
    denormalizationContext: ['groups' => ['user:write']]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface, JWTUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['reservations', 'user:read', 'user:write'])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['user:read'])]
    private array $roles = [];

    #[Groups(['user:write'])]
    #[SerializedName('password')]
    private ?string $plainPassword = null;

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 64)]
    #[Groups(['reservations', 'user:read', 'user:write'])]
    private ?string $first_name = null;

    #[ORM\Column(length: 64)]
    #[Groups(['reservations', 'user:read', 'user:write'])]
    private ?string $last_name = null;

    #[ORM\OneToOne(mappedBy: 'user', targetEntity: Reservation::class, cascade: ['persist'])]
    #[Groups(['user:read'])]
    private ?Reservation $reservation = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: PastRes::class, orphanRemoval: true, cascade: ['persist'])]
    #[Groups(['user:read', 'pastRes'])]
    private Collection $pastRes;

    public function __construct()
    {
        $this->pastRes = new ArrayCollection();

    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->first_name;
    }

    public function setFirstName(string $first_name): static
    {
        $this->first_name = $first_name;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->last_name;
    }

    public function setLastName(string $last_name): static
    {
        $this->last_name = $last_name;

        return $this;
    }

    public function getReservation(): ?Reservation
    {
        return $this->reservation;
    }

    public function setReservation(Reservation $reservation): static
    {
        // set the owning side of the relation if necessary
        if ($reservation->getUser() !== $this) {
            $reservation->setUser($this);
        }

        $this->reservation = $reservation;

        return $this;
    }

    /**
     * @return Collection<int, PastRes>
     */
    public function getPastRes(): Collection
    {
        return $this->pastRes;
    }

    public function addPastRes(PastRes $pastRes): static
    {
        if (!$this->pastRes->contains($pastRes)) {
            $this->pastRes->add($pastRes);
            $pastRes->setUser($this);
        }

        return $this;
    }

    public function removePastRes(PastRes $pastRes): static
    {
        if ($this->pastRes->removeElement($pastRes)) {
            // set the owning side to null (unless already changed)
            if ($pastRes->getUser() === $this) {
                $pastRes->setUser(null);
            }
        }

        return $this;
    }

    public static function createFromPayload($id, array $payload)
    {
        return (new User())->setId($id);
    }


    public function setPlainPassword(string $plainPassword): User
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }
}

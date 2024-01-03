<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\SerializerInterface;

class MeController extends AbstractController
{
    public function __construct(private Security $security)
    {

    }

    public function __invoke(SerializerInterface $serializer)
    {
        $user = $this->security->getUser();
        if (!$user instanceof UserInterface) {
           return $this->json(404, Response::HTTP_NOT_FOUND);
        }

        return $user;
    }
    // #[Route('users/me', name: 'get_current_user', methods: ["GET"])]
    // public function getCurrentUser(): JsonResponse
    // {
    //     /** @var User $user */
    //     $user = $this->getUser();

    //     if (!$user instanceof UserInterface) {
    //         return $this->json(404, Response::HTTP_NOT_FOUND);
    //     } else {
    //         $id = $user->getId();
    //         $first_name = $user->getFirstName();
    //         $last_name = $user->getLastName();
    //     }


    //     return $this->json([
    //         'username' => $user->getUserIdentifier(),
    //         'id' => $id,
    //         'first_name' => $first_name,
    //         'last_name' => $last_name
    //     ]);
    // }
}

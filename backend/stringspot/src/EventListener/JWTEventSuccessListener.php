<?php
namespace App\EventListener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTEventSuccessListener
{
    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();

        /** @var User $user */
        $user = $event->getUser();
        $id = $user->getId();
        $first_name = $user->getFirstName();
        $last_name = $user->getLastName();
        $role = $user->getRoles();

        if (!$user instanceof UserInterface) {
            return;
        }

        $data['data'] = array(
            'id' => $id,
            'name' => $first_name . ' ' . $last_name,
            'role' => $role,
        );

        // Set the custom data in the response payload
        $event->setData($data);
    }
}

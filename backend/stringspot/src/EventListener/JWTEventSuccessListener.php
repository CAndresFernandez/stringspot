<?php
namespace App\EventListener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\Cookie as HttpFoundationCookie;
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

       if (!$user instanceof UserInterface) {
           return;
       }

       $data['data'] = array(
           'id' => $id,
           'first_name' => $first_name,
           'last_name' => $last_name
       );

        // Set the custom data in the response payload
        $event->setData($data);

        // set the access token in an http-only cookie
        $response = $event->getResponse();
        $response->headers->setCookie(
            new HttpFoundationCookie('JWT_TOKEN', $data['token'], strtotime('now + 1 month'), '/', null, false, true, false, 'None'
        ));
    }
}

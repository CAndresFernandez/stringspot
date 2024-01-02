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

        // Set the custom data in the response payload
        $event->setData($data);

        // set the access token in an http-only cookie
        $response = $event->getResponse();
        $response->headers->setCookie(
            new HttpFoundationCookie('JWT_TOKEN', $data['token'], strtotime('now + 1 month'), '/', null, false, true, false, 'None'
        ));
    }
}

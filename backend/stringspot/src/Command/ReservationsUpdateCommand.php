<?php

namespace App\Command;

use App\Entity\PastRes;
use App\Repository\PastResRepository;
use App\Repository\ReservationRepository;
use DateTimeZone;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Scheduler\Scheduler;

#[AsCommand(
    name: 'app:reservations-update',
    description: 'Replace all past Reservation objects with PastRes object and change Court $reserved status.',
)]
class ReservationsUpdateCommand extends Command
{
    private $reservationRepository;
    private $em;

    public function __construct(ReservationRepository $reservationRepository, EntityManagerInterface $em)
    {
        $this->reservationRepository = $reservationRepository;
        $this->em = $em;
        parent::__construct();
    }

    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $io->info("Processing...");

        $currentDateTime = new \DateTime('now', new DateTimeZone('Europe/Paris'));
        $reservations = $this->reservationRepository->findAll();

        foreach ($reservations as $reservation) {
            $user = $reservation->getUser();
            $date = $reservation->getStartTime()->format('Y-d-m');
            $time = $reservation->getStartTime()->format('H:i');
            $court = $reservation->getCourt();
            $center = $court->getCenter();
            $zone = $center->getZone();
            $country = $zone->getCountry();
            $endTime = $reservation->getEndTime();

            if ($endTime < $currentDateTime) {
                $pastRes = new PastRes();
                $pastRes->setUser($user);
                $pastRes->setDate($date);
                $pastRes->setTime($time);
                $pastRes->setCenter($center->getName());
                $pastRes->setCourt($court->getNumber());
                $pastRes->setZone($zone->getPostCode());
                $pastRes->setCountry($country->getName());
                $this->reservationRepository->remove($reservation, true);
                $this->em->persist($pastRes);
                $this->em->persist($user);
            }
        }
        $this->em->flush();

        $io->success('All past reservations have been updated.');

        return Command::SUCCESS;
    }
}

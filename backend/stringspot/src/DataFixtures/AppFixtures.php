<?php


namespace App\DataFixtures;

use App\Entity\Center;
use App\Entity\Court;
use App\Entity\Reservation;
use App\Entity\user;
use App\Entity\Zone;
use DateInterval;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $passwordHasher;
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
         $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // create an instance of Faker
        $faker = Factory::create();
        $courtProvider = new CourtProvider();

        // ! USER
        // ADMIN
        $admin = new User();
        $admin->setEmail($faker->email());
        $admin->setFirstname($faker->firstname());
        $admin->setLastname($faker->lastname());
        $admin->setRoles(["ROLE_ADMIN"]);
        $admin->setPassword($this->passwordHasher->hashPassword($admin, "0000"));
        $manager->persist($admin);

        // USER (stringspot member)
        $userList = [];
        for ($u = 0; $u <= 299; $u++) {
            $user = new User();
            $user->setFirstname($faker->firstname());
            $user->setLastname($faker->lastname());
            $user->setEmail($faker->email());
            $user->setPassword($this->passwordHasher->hashPassword($user, "9999"));
            $user->setRoles(["ROLE_USER"]);
            $userList[] = $user;
            $manager->persist($user);
        };

        // ! ZONE
        $zoneList = [];

        for ($z = 1; $z <= 9; $z++) {
            $zone = new Zone();
            $zone->setCountry("France");
            $zone->setPostCode("7500" . $z);
            $zoneList[] = $zone;
        }
        for ($z=10; $z <= 20; $z++) {
            $zone = new Zone();
            $zone->setCountry("France");
            $zone->setPostCode("750" . $z);
            $zoneList[] = $zone;
        }

        foreach($zoneList as $zone) {
            $manager->persist($zone);
        }

        // ! CENTER
        $allCourts = $courtProvider->tennisCourts();
        $centerList = [];
        foreach ($allCourts as $postCode => $centersByZone) {
            foreach($zoneList as $zone) {
                if($zone->getPostCode() === strval($postCode)) {
                $zoneToSet = $zone;
                foreach($centersByZone as $centerName => $centerAddress) {
                        $center = new Center();
                        $center->setName($centerName);
                        $center->setAddress($centerAddress);
                        $center->setNumberCourts($faker->numberBetween(1,12));
                        $center->setZone($zoneToSet);
                        $centerList[] = $center;
                        $manager->persist($center);
                    }
                }
            }
        }

        // ! COURT
        $courtList = [];
        foreach ($centerList as $center) {
            $toCreate = $center->getNumberCourts();
            for ($c = 1; $c <= $toCreate; $c++) {
                $court = new Court();
                $court->setNumber($c);
                $court->setType("tennis");
                $court->setCenter($center);
                $courtList[] = $court;
                $manager->persist($court);
            }
        }

        // ! RESERVATION
        $reservationList = [];

        for ($r = 1; $r <= 100; $r++) {
            $startTime = $faker->dateTimeBetween('now', '+1 week', 'Europe/Paris');
            $endTime = (clone $startTime)->add(new DateInterval('PT59M'));
            $reservation = new Reservation();
            $reservation->setStartTime(DateTimeImmutable::createFromMutable($startTime));
            $reservation->setEndTime(DateTimeImmutable::createFromMutable($endTime));
            $reservation->setResType("user");
            $reservation->setActive(true);
            $reservation->setUser($userList[$r]);
            $reservation->setCourt($courtList[mt_rand(0, count($courtList) - 1)]);
            $reservationList[] = $reservation;
            $manager->persist($reservation);
        }
        $manager->flush();
    }
}
?>

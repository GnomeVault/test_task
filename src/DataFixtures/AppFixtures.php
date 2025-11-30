<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $root = new User();
        $root->setLogin('root');
        $root->setPhone('+380501234567');
        $root->setRoles(['ROLE_ROOT']);
        $root->setPassword($this->passwordHasher->hashPassword($root, 'root'));
        $manager->persist($root);

        $user = new User();
        $user->setLogin('user');
        $user->setPhone('+380501234568');
        $user->setRoles(['ROLE_USER']);
        $user->setPassword($this->passwordHasher->hashPassword($user, 'user'));
        $manager->persist($user);

        $manager->flush();
    }
}

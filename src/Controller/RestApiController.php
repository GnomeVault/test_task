<?php
namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RestApiController extends AbstractController
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAll(Request $request): Response
    {
        $users = $this->userRepository->findAllUsers();

        $data = array_map(function($user) {
            return [
                'id'    => $user->getId(),
                'login' => $user->getLogin(),
                'phone' => $user->getPhone(),
                'pass'  => $user->getPassword(),
            ];
        }, $users);

        return $this->json($data);
    }

    public function get(Request $request, ?int $id): Response
    {
        $userData = $this->userRepository->findOneById($id);

        $user = $this->getUser();
        if (!$this->isGranted('ROLE_ROOT') && $user->getId() != $userData->getId()) {
            return $this->json([
                'error' => 'Access denied'
            ]);
        }

        return $this->json([
            'id'    => $userData->getId(),
            'login' => $userData->getLogin(),
            'phone' => $userData->getPhone(),
            'pass'  => $userData->getPassword(),
        ]);
    }

    public function post(Request $request, ValidatorInterface $validator, UserPasswordHasherInterface $passwordHasher): Response
    {
        $data = json_decode($request->getContent(), true);

        $login    = $data['login']??null;
        $phone    = $data['phone']??null;
        $password = $data['password']??null;

        $user = new User();
        $user->setLogin($login);
        $user->setPhone($phone);
        $user->setPassword($passwordHasher->hashPassword($user, $password));

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $respErrors = [];
            foreach ($errors as $error) {
                $respErrors[] = $error->getPropertyPath() . ': ' . $error->getMessage();
            }
            return $this->json($respErrors);
        }

        $this->userRepository->add($user, true);

        return $this->json([
            'id'       =>  $user->getId(),
            'login'    =>  $user->getLogin(),
            'phone'    =>  $user->getPhone(),
            'password' =>  $user->getPassword()
        ]);
    }

    public function put(Request $request, ValidatorInterface $validator): Response
    {
        $data = json_decode($request->getContent(), true);

        $id       = $data['id']??null;
        $login    = $data['login']??null;
        $phone    = $data['phone']??null;
        $password = $data['password']??null;

        if (!$id) {
            return $this->json([
                'error' => 'User not found'
            ]);
        }

        $user = $this->getUser();
        if (!$this->isGranted('ROLE_ROOT') && $user->getId() != $id) {
            return $this->json([
                'error' => 'You do not have editing rights'
            ]);
        }

        $user = $this->userRepository->findOneById($id);
        $user->setLogin($login);
        $user->setPhone($phone);
        $user->setPassword($password);

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $respErrors = [];
            foreach ($errors as $error) {
                $respErrors[] = $error->getPropertyPath() . ': ' . $error->getMessage();
            }
            return $this->json($respErrors);
        }

        $this->userRepository->add($user, true);

        return $this->json([
            'id' =>  $user->getId()
        ]);
    }

    public function delete(int $id): Response
    {
        $user = $this->userRepository->findOneById($id);
        $this->userRepository->remove($user, true);

         return new Response(null, 204);
    }
}
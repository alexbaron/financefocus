<?php

namespace App\Controller;

use App\Entity\BudgetItem;
use App\Repository\BudgetItemRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api')]
class BudgetItemController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ValidatorInterface $validator
    ) {}

    #[Route('', name: 'api_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json(['message' => 'Hello World']);
    }

    #[Route('/budget-items', name: 'budget_items_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        $repository = $this->entityManager->getRepository(BudgetItem::class);
        $items = $repository->findBy(['user' => $user], ['date' => 'DESC']);

        $data = array_map(function (BudgetItem $item) {
            return [
                'id' => $item->getId(),
                'type' => $item->getType(),
                'description' => $item->getDescription(),
                'amountEur' => $item->getAmountEur(),
                'amountCad' => $item->getAmountCad(),
                'category' => $item->getCategory(),
                'date' => $item->getDate()->format('Y-m-d'),
                'createdAt' => $item->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }, $items);

        return $this->json($data);
    }

    #[Route('/budget-items/{id}', name: 'budget_items_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        $repository = $this->entityManager->getRepository(BudgetItem::class);
        $budgetItem = $repository->findOneBy(['id' => $id, 'user' => $user]);

        if (!$budgetItem) {
            return $this->json(['error' => 'Budget item not found'], 404);
        }

        $this->entityManager->remove($budgetItem);
        $this->entityManager->flush();

        return $this->json(['message' => 'Budget item deleted successfully'], 200);
    }

    #[Route('/exchange-rate/latest', name: 'exchange_rate_latest', methods: ['GET'])]
    public function getLatestExchangeRate(): JsonResponse
    {
        $repository = $this->entityManager->getRepository(\App\Entity\ExchangeRate::class);
        $rate = $repository->findLatestRate('EUR', 'CAD');

        if (!$rate) {
            return $this->json(['error' => 'No exchange rate found'], 404);
        }

        return $this->json([
            'fromCurrency' => $rate->getFromCurrency(),
            'toCurrency' => $rate->getToCurrency(),
            'rate' => $rate->getRate(),
            'effectiveDate' => $rate->getEffectiveDate()->format('Y-m-d'),
        ]);
    }
}

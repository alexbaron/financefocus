<?php

namespace App\Controller;

use App\Repository\ParameterRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/parameters')]
class ParameterController extends AbstractController
{
    public function __construct(
        private ParameterRepository $parameterRepository
    ) {}

    #[Route('', name: 'parameters_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $types = $this->parameterRepository->findAllTypes();
        $result = [];

        foreach ($types as $type) {
            $parameters = $this->parameterRepository->findByType($type);
            $result[$type] = array_map(function ($param) {
                return [
                    'id' => $param->getId(),
                    'mnemo' => $param->getMnemo(),
                    'value' => $param->getValue(),
                    'order' => $param->getOrder(),
                ];
            }, $parameters);
        }

        return $this->json($result);
    }

    #[Route('/{type}', name: 'parameters_by_type', methods: ['GET'])]
    public function byType(string $type): JsonResponse
    {
        $parameters = $this->parameterRepository->findByType($type);

        if (empty($parameters)) {
            return $this->json(['error' => 'No parameters found for this type'], 404);
        }

        $result = array_map(function ($param) {
            return [
                'id' => $param->getId(),
                'mnemo' => $param->getMnemo(),
                'value' => $param->getValue(),
                'order' => $param->getOrder(),
            ];
        }, $parameters);

        return $this->json($result);
    }

    #[Route('/expense-categories', name: 'parameters_expense_categories', methods: ['GET'])]
    public function expenseCategories(): JsonResponse
    {
        return $this->byType('EXPENSE_CATEGORY');
    }

    #[Route('/income-categories', name: 'parameters_income_categories', methods: ['GET'])]
    public function incomeCategories(): JsonResponse
    {
        return $this->byType('INCOME_CATEGORY');
    }
}

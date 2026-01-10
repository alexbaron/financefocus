<?php

namespace App\Repository;

use App\Entity\Parameter;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ParameterRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Parameter::class);
    }

    /**
     * Find all parameters by type, ordered by order field
     */
    public function findByType(string $type): array
    {
        return $this->createQueryBuilder('p')
            ->where('p.type = :type')
            ->setParameter('type', $type)
            ->orderBy('p.order', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Find a parameter by type and mnemo
     */
    public function findByTypeAndMnemo(string $type, string $mnemo): ?Parameter
    {
        return $this->createQueryBuilder('p')
            ->where('p.type = :type')
            ->andWhere('p.mnemo = :mnemo')
            ->setParameter('type', $type)
            ->setParameter('mnemo', $mnemo)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * Get all distinct types
     */
    public function findAllTypes(): array
    {
        $result = $this->createQueryBuilder('p')
            ->select('DISTINCT p.type')
            ->orderBy('p.type', 'ASC')
            ->getQuery()
            ->getResult();

        return array_column($result, 'type');
    }
}

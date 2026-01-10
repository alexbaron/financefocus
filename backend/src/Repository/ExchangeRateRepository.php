<?php

namespace App\Repository;

use App\Entity\ExchangeRate;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ExchangeRateRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExchangeRate::class);
    }

    public function findLatestRate(string $fromCurrency, string $toCurrency): ?ExchangeRate
    {
        return $this->createQueryBuilder('e')
            ->where('e.fromCurrency = :from')
            ->andWhere('e.toCurrency = :to')
            ->setParameter('from', $fromCurrency)
            ->setParameter('to', $toCurrency)
            ->orderBy('e.effectiveDate', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findByDate(string $fromCurrency, string $toCurrency, \DateTimeInterface $date): ?ExchangeRate
    {
        return $this->createQueryBuilder('e')
            ->where('e.fromCurrency = :from')
            ->andWhere('e.toCurrency = :to')
            ->andWhere('e.effectiveDate = :date')
            ->setParameter('from', $fromCurrency)
            ->setParameter('to', $toCurrency)
            ->setParameter('date', $date)
            ->getQuery()
            ->getOneOrNullResult();
    }
}

<?php

namespace App\Entity;

use App\Repository\ExchangeRateRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExchangeRateRepository::class)]
#[ORM\Table(name: 'exchange_rates')]
class ExchangeRate
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 3)]
    private string $fromCurrency;

    #[ORM\Column(type: 'string', length: 3)]
    private string $toCurrency;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 6)]
    private float $rate;

    #[ORM\Column(type: 'date')]
    private \DateTimeInterface $effectiveDate;

    #[ORM\Column(type: 'datetime')]
    private \DateTimeInterface $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFromCurrency(): string
    {
        return $this->fromCurrency;
    }

    public function setFromCurrency(string $fromCurrency): self
    {
        $this->fromCurrency = $fromCurrency;
        return $this;
    }

    public function getToCurrency(): string
    {
        return $this->toCurrency;
    }

    public function setToCurrency(string $toCurrency): self
    {
        $this->toCurrency = $toCurrency;
        return $this;
    }

    public function getRate(): float
    {
        return $this->rate;
    }

    public function setRate(float $rate): self
    {
        $this->rate = $rate;
        return $this;
    }

    public function getEffectiveDate(): \DateTimeInterface
    {
        return $this->effectiveDate;
    }

    public function setEffectiveDate(\DateTimeInterface $effectiveDate): self
    {
        $this->effectiveDate = $effectiveDate;
        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }
}

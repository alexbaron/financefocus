<?php

namespace App\Entity;

use App\Repository\ParameterRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ParameterRepository::class)]
#[ORM\Table(name: 'parameters')]
#[ORM\UniqueConstraint(name: 'UNIQ_parameters_type_mnemo', columns: ['type', 'mnemo'])]
class Parameter
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 50)]
    private string $mnemo;

    #[ORM\Column(type: 'string', length: 255)]
    private string $value;

    #[ORM\Column(name: 'order_position', type: 'integer')]
    private int $order;

    #[ORM\Column(type: 'string', length: 150)]
    private string $type;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMnemo(): string
    {
        return $this->mnemo;
    }

    public function setMnemo(string $mnemo): self
    {
        $this->mnemo = $mnemo;
        return $this;
    }

    public function getValue(): string
    {
        return $this->value;
    }

    public function setValue(string $value): self
    {
        $this->value = $value;
        return $this;
    }

    public function getOrder(): int
    {
        return $this->order;
    }

    public function setOrder(int $order): self
    {
        $this->order = $order;
        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;
        return $this;
    }
}

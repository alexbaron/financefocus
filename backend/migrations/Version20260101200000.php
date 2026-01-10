<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260101200000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create exchange_rates table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE exchange_rates (
            id SERIAL PRIMARY KEY,
            from_currency VARCHAR(3) NOT NULL,
            to_currency VARCHAR(3) NOT NULL,
            rate NUMERIC(10, 6) NOT NULL,
            effective_date DATE NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )');
        
        $this->addSql('CREATE INDEX IDX_exchange_rates_currencies ON exchange_rates (from_currency, to_currency)');
        $this->addSql('CREATE INDEX IDX_exchange_rates_date ON exchange_rates (effective_date)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_exchange_rates_currencies_date ON exchange_rates (from_currency, to_currency, effective_date)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE exchange_rates');
    }
}

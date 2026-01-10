<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260102001500 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create parameters table for expense and income categories';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE parameters (
            id SERIAL PRIMARY KEY,
            mnemo VARCHAR(50) NOT NULL,
            value VARCHAR(255) NOT NULL,
            order_position INTEGER NOT NULL,
            type VARCHAR(150) NOT NULL
        )');
        
        $this->addSql('CREATE UNIQUE INDEX UNIQ_parameters_type_mnemo ON parameters (type, mnemo)');
        $this->addSql('CREATE INDEX IDX_parameters_type ON parameters (type)');

        // Insert expense categories
        $expenseCategories = [
            ['ALIMENTATION', 'Alimentation', 1],
            ['TRANSPORT', 'Transport', 2],
            ['LOGEMENT', 'Logement', 3],
            ['LOISIRS', 'Loisirs', 4],
            ['SANTE', 'Santé', 5],
            ['VETEMENTS', 'Vêtements', 6],
            ['EDUCATION', 'Éducation', 7],
            ['SERVICES', 'Services', 8],
            ['ASSURANCES', 'Assurances', 9],
            ['EPARGNE', 'Épargne', 10],
            ['IMPOTS', 'Impôts et taxes', 11],
            ['AUTRES', 'Autres', 99],
        ];

        foreach ($expenseCategories as $index => $category) {
            $this->addSql(
                "INSERT INTO parameters (mnemo, value, order_position, type) VALUES (?, ?, ?, 'EXPENSE_CATEGORY')",
                [$category[0], $category[1], $category[2]]
            );
        }

        // Insert income categories
        $incomeCategories = [
            ['SALAIRE', 'Salaire', 1],
            ['PRIME', 'Prime', 2],
            ['FREELANCE', 'Freelance / Indépendant', 3],
            ['INVESTISSEMENT', 'Investissements', 4],
            ['LOCATION', 'Revenus locatifs', 5],
            ['PENSION', 'Pension / Retraite', 6],
            ['ALLOCATION', 'Allocations', 7],
            ['AUTRES', 'Autres revenus', 99],
        ];

        foreach ($incomeCategories as $index => $category) {
            $this->addSql(
                "INSERT INTO parameters (mnemo, value, order_position, type) VALUES (?, ?, ?, 'INCOME_CATEGORY')",
                [$category[0], $category[1], $category[2]]
            );
        }

        // Insert budget item types
        $budgetTypes = [
            ['INCOME', 'Revenu', 1],
            ['EXPENSE', 'Dépense', 2],
            ['SAVINGS', 'Épargne', 3],
            ['CAPITAL', 'Capital', 4],
        ];

        foreach ($budgetTypes as $index => $type) {
            $this->addSql(
                "INSERT INTO parameters (mnemo, value, order_position, type) VALUES (?, ?, ?, 'BUDGET_TYPE')",
                [$type[0], $type[1], $type[2]]
            );
        }
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE parameters');
    }
}

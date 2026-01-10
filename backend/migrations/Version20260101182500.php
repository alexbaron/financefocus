<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260101182500 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add user_id column to budget_items table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE budget_items ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE budget_items ADD CONSTRAINT FK_budget_items_user FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_budget_items_user ON budget_items (user_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE budget_items DROP CONSTRAINT FK_budget_items_user');
        $this->addSql('DROP INDEX IDX_budget_items_user');
        $this->addSql('ALTER TABLE budget_items DROP user_id');
    }
}

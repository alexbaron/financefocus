<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:show-stats',
    description: 'Show statistics about budget items and exchange rates',
)]
class ShowStatsCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $conn = $this->entityManager->getConnection();

        $io->title('FinanceFocus - Database Statistics');

        // Budget items by type
        $io->section('Budget Items by Type');
        $result = $conn->executeQuery(
            'SELECT type, COUNT(*) as count FROM budget_items GROUP BY type ORDER BY count DESC'
        )->fetchAllAssociative();
        
        $rows = [];
        foreach ($result as $row) {
            $rows[] = [$row['type'], $row['count']];
        }
        $io->table(['Type', 'Count'], $rows);

        // Budget items by year
        $io->section('Budget Items by Year');
        $result = $conn->executeQuery("
            SELECT 
                EXTRACT(YEAR FROM date)::integer as year,
                COUNT(*) as transactions,
                ROUND(SUM(amount_eur)::numeric, 2) as total_eur,
                ROUND(SUM(amount_cad)::numeric, 2) as total_cad
            FROM budget_items 
            GROUP BY EXTRACT(YEAR FROM date)
            ORDER BY year
        ")->fetchAllAssociative();
        
        $rows = [];
        foreach ($result as $row) {
            $rows[] = [
                $row['year'],
                $row['transactions'],
                number_format($row['total_eur'], 2) . ' EUR',
                number_format($row['total_cad'], 2) . ' CAD'
            ];
        }
        $io->table(['Year', 'Transactions', 'Total EUR', 'Total CAD'], $rows);

        // Exchange rates summary
        $io->section('Exchange Rates Summary');
        $result = $conn->executeQuery("
            SELECT 
                COUNT(*) as total_rates,
                TO_CHAR(MIN(effective_date), 'YYYY-MM-DD') as first_date,
                TO_CHAR(MAX(effective_date), 'YYYY-MM-DD') as last_date,
                ROUND(MIN(rate)::numeric, 4) as min_rate,
                ROUND(MAX(rate)::numeric, 4) as max_rate,
                ROUND(AVG(rate)::numeric, 4) as avg_rate
            FROM exchange_rates
        ")->fetchAssociative();
        
        $io->table(
            ['Metric', 'Value'],
            [
                ['Total Rates', $result['total_rates']],
                ['Date Range', $result['first_date'] . ' to ' . $result['last_date']],
                ['Min Rate', $result['min_rate']],
                ['Max Rate', $result['max_rate']],
                ['Avg Rate', $result['avg_rate']],
            ]
        );

        // Recent transactions
        $io->section('Recent Transactions (Last 10)');
        $result = $conn->executeQuery("
            SELECT 
                TO_CHAR(date, 'YYYY-MM-DD') as date,
                type,
                COALESCE(category, '-') as category,
                description,
                amount_eur,
                amount_cad
            FROM budget_items 
            ORDER BY date DESC 
            LIMIT 10
        ")->fetchAllAssociative();
        
        $rows = [];
        foreach ($result as $row) {
            $rows[] = [
                $row['date'],
                $row['type'],
                $row['category'],
                substr($row['description'], 0, 25),
                number_format($row['amount_eur'], 2),
                number_format($row['amount_cad'], 2),
            ];
        }
        $io->table(['Date', 'Type', 'Category', 'Description', 'EUR', 'CAD'], $rows);

        $io->success('Statistics displayed successfully!');

        return Command::SUCCESS;
    }
}

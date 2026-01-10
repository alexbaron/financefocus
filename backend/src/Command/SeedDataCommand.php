<?php

namespace App\Command;

use App\Entity\BudgetItem;
use App\Entity\ExchangeRate;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:seed-data',
    description: 'Seed database with test data for budget items and exchange rates',
)]
class SeedDataCommand extends Command
{
    private const EXPENSE_CATEGORIES = [
        'Alimentation',
        'Transport',
        'Logement',
        'Loisirs',
        'Santé',
        'Vêtements',
        'Éducation',
        'Services',
    ];

    private const INCOME_DESCRIPTIONS = [
        'Salaire mensuel',
        'Prime',
        'Freelance',
        'Investissements',
        'Revenus locatifs',
    ];

    private const EXPENSE_DESCRIPTIONS = [
        'Courses supermarché',
        'Restaurant',
        'Carburant',
        'Transport en commun',
        'Loyer',
        'Électricité',
        'Internet',
        'Assurance',
        'Cinéma',
        'Sport',
        'Pharmacie',
        'Vêtements',
        'Formation',
        'Abonnement',
    ];

    public function __construct(
        private EntityManagerInterface $entityManager
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('user-email', 'u', InputOption::VALUE_REQUIRED, 'User email to assign budget items to')
            ->addOption('year', 'y', InputOption::VALUE_OPTIONAL, 'Year for data generation', date('Y'))
            ->addOption('clear', null, InputOption::VALUE_NONE, 'Clear existing data before seeding');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $userEmail = $input->getOption('user-email');
        $year = (int) $input->getOption('year');
        $clear = $input->getOption('clear');

        if (!$userEmail) {
            $io->error('Please provide a user email with --user-email option');
            return Command::FAILURE;
        }

        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['email' => $userEmail]);

        if (!$user) {
            $io->error(sprintf('User with email "%s" not found', $userEmail));
            return Command::FAILURE;
        }

        if ($clear) {
            $io->warning('Clearing existing data...');
            $this->clearExistingData($user, $year);
        }

        $io->title(sprintf('Seeding data for year %d', $year));

        // Generate exchange rates for the year
        $io->section('Generating exchange rates...');
        $ratesCount = $this->generateExchangeRates($year);
        $io->success(sprintf('Generated %d exchange rates', $ratesCount));

        // Generate budget items
        $io->section('Generating budget items...');
        $itemsCount = $this->generateBudgetItems($user, $year, $io);
        $io->success(sprintf('Generated %d budget items', $itemsCount));

        $this->entityManager->flush();

        $io->success('All data seeded successfully!');

        return Command::SUCCESS;
    }

    private function clearExistingData(User $user, int $year): void
    {
        $startDate = new \DateTime("$year-01-01");
        $endDate = new \DateTime("$year-12-31");

        // Clear budget items
        $qb = $this->entityManager->createQueryBuilder();
        $qb->delete(BudgetItem::class, 'b')
            ->where('b.user = :user')
            ->andWhere('b.date BETWEEN :start AND :end')
            ->setParameter('user', $user)
            ->setParameter('start', $startDate)
            ->setParameter('end', $endDate)
            ->getQuery()
            ->execute();

        // Clear exchange rates
        $qb = $this->entityManager->createQueryBuilder();
        $qb->delete(ExchangeRate::class, 'e')
            ->where('e.effectiveDate BETWEEN :start AND :end')
            ->setParameter('start', $startDate)
            ->setParameter('end', $endDate)
            ->getQuery()
            ->execute();
    }

    private function generateExchangeRates(int $year): int
    {
        $count = 0;
        $baseRate = 1.45; // Base EUR to CAD rate

        // Generate daily rates with some variation
        for ($month = 1; $month <= 12; $month++) {
            $daysInMonth = (int) (new \DateTime("$year-$month-01"))->format('t');
            
            for ($day = 1; $day <= $daysInMonth; $day++) {
                $date = new \DateTime(sprintf('%d-%02d-%02d', $year, $month, $day));
                
                // Add seasonal variation and random fluctuation
                $seasonalVariation = sin(($month / 12) * 2 * M_PI) * 0.05;
                $randomFluctuation = (rand(-100, 100) / 10000); // -0.01 to +0.01
                $rate = $baseRate + $seasonalVariation + $randomFluctuation;

                $exchangeRate = new ExchangeRate();
                $exchangeRate->setFromCurrency('EUR');
                $exchangeRate->setToCurrency('CAD');
                $exchangeRate->setRate(round($rate, 6));
                $exchangeRate->setEffectiveDate($date);

                $this->entityManager->persist($exchangeRate);
                $count++;

                // Flush every 50 records to avoid memory issues
                if ($count % 50 === 0) {
                    $this->entityManager->flush();
                }
            }
        }

        return $count;
    }

    private function generateBudgetItems(User $user, int $year, SymfonyStyle $io): int
    {
        $count = 0;
        $progressBar = $io->createProgressBar(12); // 12 months

        for ($month = 1; $month <= 12; $month++) {
            // Generate monthly income (2-3 times per month)
            $incomeCount = rand(2, 3);
            for ($i = 0; $i < $incomeCount; $i++) {
                $day = rand(1, 28);
                $date = new \DateTime(sprintf('%d-%02d-%02d', $year, $month, $day));
                
                $amountEur = rand(2000, 5000);
                $rate = $this->getExchangeRateForDate($date);
                $amountCad = round($amountEur * $rate, 2);

                $budgetItem = new BudgetItem();
                $budgetItem->setUser($user);
                $budgetItem->setType('income');
                $budgetItem->setDescription(self::INCOME_DESCRIPTIONS[array_rand(self::INCOME_DESCRIPTIONS)]);
                $budgetItem->setAmountEur($amountEur);
                $budgetItem->setAmountCad($amountCad);
                $budgetItem->setDate($date);

                $this->entityManager->persist($budgetItem);
                $count++;
            }

            // Generate monthly expenses (15-25 per month)
            $expenseCount = rand(15, 25);
            for ($i = 0; $i < $expenseCount; $i++) {
                $day = rand(1, 28);
                $date = new \DateTime(sprintf('%d-%02d-%02d', $year, $month, $day));
                
                $amountEur = rand(20, 500);
                $rate = $this->getExchangeRateForDate($date);
                $amountCad = round($amountEur * $rate, 2);

                $budgetItem = new BudgetItem();
                $budgetItem->setUser($user);
                $budgetItem->setType('expense');
                $budgetItem->setCategory(self::EXPENSE_CATEGORIES[array_rand(self::EXPENSE_CATEGORIES)]);
                $budgetItem->setDescription(self::EXPENSE_DESCRIPTIONS[array_rand(self::EXPENSE_DESCRIPTIONS)]);
                $budgetItem->setAmountEur($amountEur);
                $budgetItem->setAmountCad($amountCad);
                $budgetItem->setDate($date);

                $this->entityManager->persist($budgetItem);
                $count++;
            }

            // Generate savings (1-2 times per month)
            $savingsCount = rand(1, 2);
            for ($i = 0; $i < $savingsCount; $i++) {
                $day = rand(1, 28);
                $date = new \DateTime(sprintf('%d-%02d-%02d', $year, $month, $day));
                
                $amountEur = rand(200, 800);
                $rate = $this->getExchangeRateForDate($date);
                $amountCad = round($amountEur * $rate, 2);

                $budgetItem = new BudgetItem();
                $budgetItem->setUser($user);
                $budgetItem->setType('savings');
                $budgetItem->setDescription('Épargne mensuelle');
                $budgetItem->setAmountEur($amountEur);
                $budgetItem->setAmountCad($amountCad);
                $budgetItem->setDate($date);

                $this->entityManager->persist($budgetItem);
                $count++;
            }

            // Generate capital (occasionally, 2-3 times per year)
            if (rand(1, 4) === 1) {
                $day = rand(1, 28);
                $date = new \DateTime(sprintf('%d-%02d-%02d', $year, $month, $day));
                
                $amountEur = rand(1000, 5000);
                $rate = $this->getExchangeRateForDate($date);
                $amountCad = round($amountEur * $rate, 2);

                $budgetItem = new BudgetItem();
                $budgetItem->setUser($user);
                $budgetItem->setType('capital');
                $budgetItem->setDescription('Apport en capital');
                $budgetItem->setAmountEur($amountEur);
                $budgetItem->setAmountCad($amountCad);
                $budgetItem->setDate($date);

                $this->entityManager->persist($budgetItem);
                $count++;
            }

            // Flush after each month
            $this->entityManager->flush();
            $progressBar->advance();
        }

        $progressBar->finish();
        $io->newLine(2);

        return $count;
    }

    private function getExchangeRateForDate(\DateTimeInterface $date): float
    {
        $repository = $this->entityManager->getRepository(ExchangeRate::class);
        $rate = $repository->findByDate('EUR', 'CAD', $date);

        if ($rate) {
            return $rate->getRate();
        }

        // Fallback to base rate if not found
        return 1.45;
    }
}

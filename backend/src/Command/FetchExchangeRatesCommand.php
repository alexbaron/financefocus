<?php

namespace App\Command;

use App\Entity\ExchangeRate;
use App\Repository\ExchangeRateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsCommand(
    name: 'app:fetch-exchange-rates',
    description: 'Fetch exchange rates from Canadian Border Services Agency API',
)]
class FetchExchangeRatesCommand extends Command
{
    private const API_URL = 'https://bcd-api-dca-ipa.cbsa-asfc.cloud-nuage.canada.ca/exchange-rate-lambda/exchange-rates';

    public function __construct(
        private HttpClientInterface $httpClient,
        private EntityManagerInterface $entityManager,
        private ExchangeRateRepository $exchangeRateRepository
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $today = new \DateTime();
        $dateStr = $today->format('Y-m-d');

        $io->info(sprintf('Fetching exchange rates for %s...', $dateStr));

        try {
            $response = $this->httpClient->request('GET', self::API_URL, [
                'query' => [
                    'startDate' => $dateStr,
                    'endDate' => $dateStr,
                    'limit' => 200,
                ],
            ]);

            $data = $response->toArray();

            if (!isset($data['ForeignExchangeRates']) || empty($data['ForeignExchangeRates'])) {
                $io->warning('No exchange rates found in API response');
                return Command::FAILURE;
            }

            $eurRate = null;
            foreach ($data['ForeignExchangeRates'] as $rateData) {
                if ($rateData['FromCurrency']['Value'] === 'EUR' && 
                    $rateData['ToCurrency']['Value'] === 'CAD') {
                    $eurRate = $rateData;
                    break;
                }
            }

            if (!$eurRate) {
                $io->warning('EUR to CAD rate not found in API response');
                return Command::FAILURE;
            }

            // Check if rate already exists for today
            $existingRate = $this->exchangeRateRepository->findByDate(
                'EUR',
                'CAD',
                $today
            );

            if ($existingRate) {
                $io->info('Exchange rate already exists for today, updating...');
                $existingRate->setRate((float) $eurRate['Rate']);
                $exchangeRateEntity = $existingRate;
            } else {
                $exchangeRateEntity = new ExchangeRate();
                $exchangeRateEntity->setFromCurrency('EUR');
                $exchangeRateEntity->setToCurrency('CAD');
                $exchangeRateEntity->setRate((float) $eurRate['Rate']);
                $exchangeRateEntity->setEffectiveDate($today);
                $this->entityManager->persist($exchangeRateEntity);
            }

            $this->entityManager->flush();

            $io->success(sprintf(
                'Exchange rate saved: 1 EUR = %.6f CAD (Effective: %s)',
                $exchangeRateEntity->getRate(),
                $exchangeRateEntity->getEffectiveDate()->format('Y-m-d')
            ));

            return Command::SUCCESS;
        } catch (\Exception $e) {
            $io->error('Failed to fetch exchange rates: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}

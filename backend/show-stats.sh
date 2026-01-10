#!/bin/bash
# Display statistics about seeded data

echo "==================================="
echo "FinanceFocus - Data Statistics"
echo "==================================="
echo ""

echo "📊 Budget Items by Type:"
docker exec financefocus-backend php bin/console dbal:run-sql "
SELECT type, COUNT(*) as count 
FROM budget_items 
GROUP BY type 
ORDER BY count DESC
"

echo ""
echo "💰 Budget Items by Year:"
docker exec financefocus-backend php bin/console dbal:run-sql "
SELECT 
    TO_CHAR(date, 'YYYY') as year,
    COUNT(*) as transactions,
    ROUND(SUM(amount_eur)::numeric, 2) as total_eur,
    ROUND(SUM(amount_cad)::numeric, 2) as total_cad
FROM budget_items 
GROUP BY TO_CHAR(date, 'YYYY')
ORDER BY year
"

echo ""
echo "📈 Exchange Rates Summary:"
docker exec financefocus-backend php bin/console dbal:run-sql "
SELECT 
    COUNT(*) as total_rates,
    TO_CHAR(MIN(effective_date), 'YYYY-MM-DD') as first_date,
    TO_CHAR(MAX(effective_date), 'YYYY-MM-DD') as last_date,
    ROUND(MIN(rate)::numeric, 4) as min_rate,
    ROUND(MAX(rate)::numeric, 4) as max_rate,
    ROUND(AVG(rate)::numeric, 4) as avg_rate
FROM exchange_rates
"

echo ""
echo "📅 Recent Transactions (Last 5):"
docker exec financefocus-backend php bin/console dbal:run-sql "
SELECT 
    TO_CHAR(date, 'YYYY-MM-DD') as date,
    type,
    description,
    amount_eur,
    amount_cad
FROM budget_items 
ORDER BY date DESC 
LIMIT 5
"

echo ""
echo "==================================="

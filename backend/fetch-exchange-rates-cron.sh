#!/bin/bash
# Cron job to fetch exchange rates daily
# Add to crontab: 0 8 * * * /path/to/fetch-exchange-rates-cron.sh

cd /app
php bin/console app:fetch-exchange-rates >> /var/log/exchange-rates.log 2>&1

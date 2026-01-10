# Configuration du Cron Job pour les Taux de Change

## Description
Une tâche automatisée récupère quotidiennement les taux de change EUR/CAD depuis l'API de l'Agence des services frontaliers du Canada (ASFC).

## Taux de change récupéré
- **De:** EUR (Euro)
- **Vers:** CAD (Dollar Canadien)
- **Source:** https://bcd-api-dca-ipa.cbsa-asfc.cloud-nuage.canada.ca/exchange-rate-lambda/exchange-rates

## Commande manuelle
Pour exécuter la commande manuellement :

```bash
# Dans le container Docker
docker exec financefocus-backend php bin/console app:fetch-exchange-rates

# Localement
php bin/console app:fetch-exchange-rates
```

## Configuration du Cron Job

### Option 1: Crontab Linux/Docker

Ajoutez cette ligne à votre crontab pour exécuter la tâche tous les jours à 8h00 :

```bash
# Ouvrir le crontab
crontab -e

# Ajouter cette ligne
0 8 * * * docker exec financefocus-backend php /app/bin/console app:fetch-exchange-rates >> /var/log/exchange-rates.log 2>&1
```

### Option 2: Docker Compose avec cron

Ajoutez un service cron dans `docker-compose.yml` :

```yaml
services:
  backend-cron:
    image: financefocus-backend
    container_name: financefocus-backend-cron
    volumes:
      - ./backend:/app
    command: >
      sh -c "echo '0 8 * * * php /app/bin/console app:fetch-exchange-rates >> /var/log/exchange-rates.log 2>&1' | crontab - && crond -f"
    depends_on:
      - postgres
      - backend
```

### Option 3: Symfony Scheduler (déjà configuré)

Le fichier `config/packages/scheduler.yaml` est déjà configuré. Pour l'utiliser :

```bash
# Lancer le worker Symfony Scheduler
docker exec financefocus-backend php bin/console messenger:consume scheduler_default -vv
```

### Option 4: Script Shell

Utilisez le script `fetch-exchange-rates-cron.sh` :

```bash
# Rendre le script exécutable
chmod +x backend/fetch-exchange-rates-cron.sh

# Ajouter au crontab
0 8 * * * /path/to/backend/fetch-exchange-rates-cron.sh
```

## Vérification

### Vérifier les logs
```bash
# Logs du cron (si configuré avec redirection)
tail -f /var/log/exchange-rates.log

# Logs Symfony
docker exec financefocus-backend tail -f var/log/dev.log
```

### Vérifier la base de données
```bash
docker exec financefocus-backend php bin/console dbal:run-sql "SELECT * FROM exchange_rates ORDER BY effective_date DESC LIMIT 5"
```

### Tester l'API
```bash
curl -X GET http://localhost:8080/api/exchange-rate/latest \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Fréquence recommandée
- **Production:** Une fois par jour à 8h00 (après la mise à jour des taux par l'ASFC)
- **Développement:** Manuellement selon les besoins

## Gestion des erreurs
La commande retourne :
- **SUCCESS (0):** Taux récupéré et sauvegardé avec succès
- **FAILURE (1):** Erreur (API indisponible, pas de données, etc.)

Les erreurs sont loguées dans les logs Symfony et peuvent être surveillées via un système de monitoring.

## Frontend
Le taux de change est affiché automatiquement sur la page principale via le composant `ExchangeRateDisplay`.

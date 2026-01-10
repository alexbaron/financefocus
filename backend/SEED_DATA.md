# Commande de Génération de Données de Test

## Description
Cette commande génère des données de test pour l'application FinanceFocus, incluant :
- **Taux de change EUR/CAD** quotidiens pour une année complète
- **Revenus** mensuels (2-3 par mois)
- **Dépenses** mensuelles (15-25 par mois) avec catégories
- **Épargnes** mensuelles (1-2 par mois)
- **Capitaux** occasionnels (2-3 fois par an)

## Utilisation

### Syntaxe de base
```bash
docker exec financefocus-backend php bin/console app:seed-data --user-email=<email> [--year=<année>] [--clear]
```

### Options
- `--user-email` (requis) : Email de l'utilisateur auquel attribuer les transactions
- `--year` (optionnel) : Année pour laquelle générer les données (défaut : année courante)
- `--clear` (optionnel) : Supprimer les données existantes avant de générer

## Exemples

### Générer des données pour l'année courante
```bash
docker exec financefocus-backend php bin/console app:seed-data --user-email=user@example.com
```

### Générer des données pour 2025
```bash
docker exec financefocus-backend php bin/console app:seed-data --user-email=user@example.com --year=2025
```

### Générer des données en supprimant d'abord les anciennes
```bash
docker exec financefocus-backend php bin/console app:seed-data --user-email=user@example.com --year=2025 --clear
```

### Générer plusieurs années de données
```bash
# Année 2024
docker exec financefocus-backend php bin/console app:seed-data --user-email=user@example.com --year=2024 --clear

# Année 2025
docker exec financefocus-backend php bin/console app:seed-data --user-email=user@example.com --year=2025 --clear

# Année 2026
docker exec financefocus-backend php bin/console app:seed-data --user-email=user@example.com --year=2026 --clear
```

## Données Générées

### Taux de Change
- **Fréquence :** Quotidienne (365-366 jours par an)
- **Devise :** EUR → CAD
- **Taux de base :** ~1.45 CAD pour 1 EUR
- **Variation :** 
  - Variation saisonnière (±5%)
  - Fluctuation aléatoire journalière (±0.01)

### Revenus (Income)
- **Fréquence :** 2-3 fois par mois
- **Montant :** 2000-5000 EUR
- **Types :** 
  - Salaire mensuel
  - Prime
  - Freelance
  - Investissements
  - Revenus locatifs

### Dépenses (Expense)
- **Fréquence :** 15-25 fois par mois
- **Montant :** 20-500 EUR
- **Catégories :**
  - Alimentation
  - Transport
  - Logement
  - Loisirs
  - Santé
  - Vêtements
  - Éducation
  - Services

### Épargne (Savings)
- **Fréquence :** 1-2 fois par mois
- **Montant :** 200-800 EUR
- **Description :** Épargne mensuelle

### Capital
- **Fréquence :** 2-3 fois par an (aléatoire)
- **Montant :** 1000-5000 EUR
- **Description :** Apport en capital

## Conversion EUR/CAD
Toutes les transactions incluent automatiquement la conversion en CAD basée sur le taux de change du jour de la transaction.

## Vérification des Données

### Compter les transactions par type
```bash
docker exec financefocus-backend php bin/console dbal:run-sql "SELECT COUNT(*) as count, type FROM budget_items GROUP BY type"
```

### Voir les dernières transactions
```bash
docker exec financefocus-backend php bin/console dbal:run-sql "SELECT type, description, amount_eur, amount_cad, date FROM budget_items ORDER BY date DESC LIMIT 10"
```

### Vérifier les taux de change
```bash
docker exec financefocus-backend php bin/console dbal:run-sql "SELECT COUNT(*) as total, MIN(effective_date) as first, MAX(effective_date) as last FROM exchange_rates"
```

### Voir les taux récents
```bash
docker exec financefocus-backend php bin/console dbal:run-sql "SELECT rate, effective_date FROM exchange_rates ORDER BY effective_date DESC LIMIT 10"
```

## Notes
- Les données sont générées de manière aléatoire mais réaliste
- Les montants en CAD sont calculés automatiquement en utilisant le taux de change du jour
- L'option `--clear` ne supprime que les données de l'année spécifiée
- La commande peut prendre 30-60 secondes pour générer une année complète de données

## Statistiques Typiques

Pour une année complète :
- ~365-366 taux de change
- ~30-36 revenus
- ~240 dépenses
- ~18-24 épargnes
- ~2-3 apports en capital

**Total : environ 290-320 transactions par an**

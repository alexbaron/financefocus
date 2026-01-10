# FinanceFocus - Application de Gestion Financière

Application complète de gestion financière avec Next.js (frontend) et Symfony (backend).

## 🎨 Design System

Ce projet utilise **Metronic v9.4.0** - Un template React professionnel avec plus de 50 composants UI.

### Installation Rapide de Metronic

```bash
# Installation automatique (recommandé)
./install-metronic.sh

# Ou suivre le guide manuel
# Voir METRONIC_QUICKSTART.md pour un guide en 5 minutes
# Voir METRONIC_INTEGRATION.md pour la documentation complète
```

**Composants disponibles** : Buttons, Cards, Tables, Forms, Charts, Modals, Alerts, Badges, et bien plus !

## Architecture

- **Frontend**: Next.js 15 (port 3000)
- **Backend**: Symfony 7 REST API (port 8080)
- **Serveur Web**: Nginx
- **Base de données**: PostgreSQL 16

## Prérequis

- Docker
- Docker Compose
- Make (optionnel, pour faciliter les commandes)
- OpenSSL (pour générer les certificats SSL)

## Démarrage rapide

### 1. Créer un projet Symfony dans le dossier backend

```bash
# Si Symfony n'est pas encore installé dans backend/
docker run --rm -v $(pwd)/backend:/app composer create-project symfony/skeleton:"7.0.*" .
docker run --rm -v $(pwd)/backend:/app composer require api
```

### 2. Démarrer l'infrastructure

```bash
# Avec Make
make setup

# Ou manuellement
docker-compose build
docker-compose up -d
```

### 3. Accéder aux applications

- Frontend: http://localhost:3000
- Backend API (HTTP): http://localhost:8080/api
- Backend API (HTTPS): https://localhost:8443/api
- PostgreSQL: localhost:5432

**Note HTTPS**: Les certificats SSL sont auto-signés. Votre navigateur affichera un avertissement de sécurité. Cliquez sur "Avancé" puis "Continuer vers localhost".

## Commandes utiles

### Avec Make

```bash
make help              # Afficher l'aide
make build             # Construire les images
make up                # Démarrer les services
make down              # Arrêter les services
make restart           # Redémarrer les services
make logs              # Voir tous les logs
make logs-frontend     # Logs du frontend
make logs-backend      # Logs du backend
make clean             # Nettoyer tout
make shell-backend     # Shell dans le container backend
make shell-frontend    # Shell dans le container frontend
make shell-db          # Shell PostgreSQL
```

### Sans Make

```bash
# Démarrer
docker-compose up -d

# Arrêter
docker-compose down

# Logs
docker-compose logs -f

# Shell backend
docker-compose exec backend sh

# Shell frontend
docker-compose exec frontend sh

# Commandes Symfony
docker-compose exec backend php bin/console list
docker-compose exec backend php bin/console make:entity
docker-compose exec backend php bin/console doctrine:migrations:migrate
```

## Configuration

### Backend (Symfony)

Modifier les variables d'environnement dans `docker-compose.yml` :
- `DATABASE_URL`
- `APP_ENV`
- `APP_SECRET`

### Frontend (Next.js)

Créer un fichier `frontend/.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Développement

### Backend

```bash
# Créer une entité
docker-compose exec backend php bin/console make:entity

# Créer une migration
docker-compose exec backend php bin/console make:migration

# Exécuter les migrations
docker-compose exec backend php bin/console doctrine:migrations:migrate

# Créer un contrôleur API
docker-compose exec backend php bin/console make:controller --api
```

### Frontend

```bash
# Installer un package
docker-compose exec frontend npm install <package>

# Lancer les tests
docker-compose exec frontend npm test
```

## Production

Pour déployer en production, utilisez le stage de production dans le Dockerfile du frontend :

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Erreur de connexion à la base de données

Vérifier que PostgreSQL est démarré :
```bash
docker-compose ps postgres
docker-compose logs postgres
```

### Frontend ne se connecte pas au backend

Vérifier la configuration CORS dans Symfony et l'URL de l'API dans `.env.local`

### Permissions denied

```bash
docker-compose exec backend chown -R www-data:www-data /var/www/symfony/var
```

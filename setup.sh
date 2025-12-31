#!/bin/bash

echo "🚀 Initialisation de l'infrastructure FinanceFocus..."

# Vérifier que Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker Desktop."
    exit 1
fi

# Vérifier que Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé."
    exit 1
fi

echo "✅ Docker et Docker Compose sont installés"

# Créer le projet Symfony si backend est vide
if [ ! -f "backend/composer.json" ]; then
    echo "📦 Installation de Symfony dans le dossier backend..."
    docker run --rm -v "$(pwd)/backend:/app" composer create-project symfony/skeleton:"7.0.*" tmp
    docker run --rm -v "$(pwd)/backend:/app" sh -c "mv tmp/* tmp/.* . 2>/dev/null; rmdir tmp"

    echo "📦 Installation des dépendances Symfony pour API REST..."
    docker run --rm -v "$(pwd)/backend:/app" composer require api
    docker run --rm -v "$(pwd)/backend:/app" composer require orm
    docker run --rm -v "$(pwd)/backend:/app" composer require nelmio/cors-bundle
    docker run --rm -v "$(pwd)/backend:/app" composer require symfony/maker-bundle --dev
fi

            echo "🏗️  Construction des images Docker..."
            docker-compose build

echo "🚀 Démarrage des services..."
docker-compose up -d

echo "⏳ Attente du démarrage de PostgreSQL..."
sleep 10

# Créer la base de données
echo "🗄️  Configuration de la base de données..."
docker-compose exec -T backend php bin/console doctrine:database:create --if-not-exists || true
docker-compose exec -T backend php bin/console doctrine:migrations:migrate --no-interaction || true

echo ""
echo "✅ Installation terminée !"
echo ""
echo "📍 Accès aux applications :"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080/api"
echo ""
echo "🔧 Commandes utiles :"
echo "   make logs              # Voir les logs"
echo "   make shell-backend     # Shell backend"
echo "   make shell-frontend    # Shell frontend"
echo "   make down              # Arrêter les services"
echo ""

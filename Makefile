.PHONY: help build up down restart logs clean install-backend install-frontend ssl-cert

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

ssl-cert: ## Generate SSL certificates for HTTPS
	./generate-ssl-cert.sh

build: ## Build all Docker images
	docker-compose build

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

restart: ## Restart all services
	docker-compose restart

logs: ## Show logs for all services
	docker-compose logs -f

logs-frontend: ## Show frontend logs
	docker-compose logs -f frontend

logs-backend: ## Show backend logs
	docker-compose logs -f backend nginx

logs-db: ## Show database logs
	docker-compose logs -f postgres

clean: ## Stop and remove all containers, networks, and volumes
	docker-compose down -v
	rm -rf backend/var/cache backend/var/log frontend/.next

install-backend: ## Install Symfony backend
	docker-compose exec backend composer install
	docker-compose exec backend php bin/console doctrine:database:create --if-not-exists
	docker-compose exec backend php bin/console doctrine:migrations:migrate --no-interaction

install-frontend: ## Install frontend dependencies
	docker-compose exec frontend npm install

shell-backend: ## Access backend container shell
	docker-compose exec backend sh

shell-frontend: ## Access frontend container shell
	docker-compose exec frontend sh

shell-db: ## Access PostgreSQL shell
	docker-compose exec postgres psql -U symfony -d financefocus

setup: build up install-backend install-frontend ## Complete setup (build, start, install dependencies)

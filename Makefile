include .env

TAG ?= $(shell git rev-parse --abbrev-ref HEAD)
COMPOSE := docker-compose --env-file .env -f build/$(NODE_ENV)/docker-compose.yml

build:
	docker build -f build/$(NODE_ENV)/Dockerfile -t agungsptr/node-clean:$(TAG) .

compose:
	@echo "Generating DB config..."
	@node db/dbConfigGenerator.js $(NODE_ENV)
	@echo "DB config generated"
	@echo "Starting services..."
	@$(COMPOSE) down -v  || true
	@$(COMPOSE) up -d --force-recreate

infra:
	@echo "Generating DB config..."
	@node db/dbConfigGenerator.js $(NODE_ENV)
	@echo "DB config generated"
	@echo "Starting DB service..."
	@$(COMPOSE) down -v  || true
	@$(COMPOSE) up -d --force-recreate db

seed:
	@echo "Seeding database..."
	@NODE_ENV=test node ./db/seeds/index.js
	@echo "Seed done."

.PHONY: all build test

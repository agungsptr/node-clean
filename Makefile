TAG ?= $(shell git rev-parse --abbrev-ref HEAD)

include .env

build:
	docker build -f build/release/Dockerfile -t agungsptr/node-clean:$(TAG) .

compose:
	@echo "Starting services..."
	@node db/dbConfigGenerator.js release
	@docker-compose --env-file .env -f build/release/docker-compose.yml down -v  || true
	@docker-compose --env-file .env -f build/release/docker-compose.yml up -d --force-recreate

build_dev:
	docker build -f build/dev/Dockerfile -t agungsptr/node-clean:$(TAG) .

compose_dev:
	@echo "Starting services..."
	@node db/dbConfigGenerator.js dev
	@docker-compose --env-file .env -f build/dev/docker-compose.yml down -v  || true
	@docker-compose --env-file .env -f build/dev/docker-compose.yml up -d --force-recreate

.PHONY: all build test

##
# Lint section
###
.PHONY: lint ## Run lint
lint:
	@npm run lint

.PHONY: format ## Run format code
format:
	@npm run format

###
# Tests section
###
.PHONY: test ## Run tests
test:
	@npm run test

.PHONY: test-coverage ## Run tests with coverage
test-coverage:
	@npm run test:cov

###
# Run section
###
.PHONY: run ## Run server with default settings
run:
	@npm run start

.PHONY: run-dev ## Run server with development settings
run-dev:
	@npm run start:dev


###
# Docker section
###
.PHONY: db-up ## up service db
db-up:
	@docker compose up -d postgres

.PHONY: app-up ## up all services
app-up:
	@docker compose run --service-ports app

.PHONY: dk-down ## down all services
dk-down:
	@docker compose down --remove-orphans -v
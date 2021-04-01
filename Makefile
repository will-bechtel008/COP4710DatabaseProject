build-dev:
	cd frontend && $(MAKE) build-dev
	cd backend && $(MAKE) build-dev

run-dev:
	cd frontend && $(MAKE) run-dev
	cd backend && $(MAKE) run-dev
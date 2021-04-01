build-dev:
	cd frontend_fortuna_v2 && $(MAKE) build-dev
	cd backend_fortuna_v2 && $(MAKE) build

run-dev:
	cd frontend && $(MAKE) run-dev
	cd backend &&$(MAKE) run-dev
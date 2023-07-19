build:
	cd contracts;sozo build

test:
	cd contracts; sozo test

prep_web:
	cd web; cp .env.example .env

redeploy:
	@cd contracts; \
	WORLD_ADDR=$$(tail -n1 ../last_deployed_world); \
	sozo migrate --world $$WORLD_ADDR;


deploy:
	@cd contracts; \
	SOZO_OUT="$$(sozo migrate)"; echo "$$SOZO_OUT"; \
	WORLD_ADDR="$$(echo "$$SOZO_OUT" | grep "Successfully migrated World at address" | rev | cut -d " " -f 1 | rev)"; \
	[ -n "$$WORLD_ADDR" ] && \
		echo "$$WORLD_ADDR" > ../last_deployed_world && \
		echo "$$SOZO_OUT" > ../deployed.log; \
	WORLD_ADDR=$$(tail -n1 ../last_deployed_world);

# Broken, but needs to be there to grant players write access
grant_write:
	@cd contracts; \
	sozo auth writer Game commit; \
	sozo auth writer Game reveal; \
	sozo auth writer Game commit;


# Usage: make ecs_exe s=Spawn
ecs_exe:
	@WORLD_ADDR=$$(tail -n1 ./last_deployed_world); \
	cd contracts; echo "sozo execute $(s) --world $$WORLD_ADDR -c $(c)"; \
	sozo execute $(s) --world $$WORLD_ADDR



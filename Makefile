
dev:
	@pnpm run dev

db:
	@supabase db reset && supabase gen types typescript --local > src/lib/database.types.ts

deploy-db:
	@supabase db reset && supabase gen types typescript --local --schema public > ./src/core/supabase/supabase.types.ts && supabase db reset --linked --yes


dev:
	@pnpm run dev

db:
	@supabase db reset && supabase gen types typescript --local > src/lib/database.types.ts

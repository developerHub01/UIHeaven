supabase start
supabase stop --project-id  <SUBSTITUTE_SUPABASE_PROJECT_ID>

# 1. Initialize Supabase CLI in your project
pnpm dlx supabase init

# 2. Start local Supabase instance
pnpm dlx supabase start

# 3. Apply SQL migrations (after placing them in supabase/migrations/)
pnpm dlx supabase db push

# 4. Pull live DB schema into Prisma
pnpm dlx prisma db pull

# 5. Generate type-safe Prisma client
pnpm prisma generate

# 6. Start Next.js dev server
pnpm dev

# 7. Hard reset local DB (drops all data, reapplies migrations, resyncs Prisma)
pnpm dlx supabase db reset && pnpm dlx prisma db pull && pnpm prisma generate

# 8. Capture Supabase Studio UI changes into version-controlled migrations
pnpm dlx supabase db diff -f ui_capture_$(date +%Y%m%d_%H%M%S)

# 9. Deploy migrations to Supabase Cloud (run once to link, then push)
pnpm dlx supabase link --project-ref YOUR_PROJECT_REF
pnpm dlx supabase db push
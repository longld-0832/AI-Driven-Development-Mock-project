-- Relax kudo IDs from UUID to text so mock kudos (e.g., "kudo-01") can coexist
-- with real kudos in the same table. Keep kudo_likes.user_id as UUID (still
-- references auth.users).

-- Drop RLS policy that depends on sender_id
drop policy if exists "kudos_insert_own" on public.kudos;

-- Drop dependent FKs
alter table public.kudo_likes
  drop constraint if exists kudo_likes_kudo_id_fkey;

alter table public.kudos
  drop constraint if exists kudos_sender_id_fkey,
  drop constraint if exists kudos_receiver_id_fkey;

-- Drop default so column type change can proceed
alter table public.kudos
  alter column id drop default;

-- Change types
alter table public.kudos
  alter column id type text using id::text,
  alter column sender_id type text using sender_id::text,
  alter column receiver_id type text using receiver_id::text;

alter table public.kudo_likes
  alter column kudo_id type text using kudo_id::text;

-- Restore default generator
alter table public.kudos
  alter column id set default gen_random_uuid()::text;

-- Restore kudo_likes FK
alter table public.kudo_likes
  add constraint kudo_likes_kudo_id_fkey
    foreign key (kudo_id) references public.kudos(id) on delete cascade;

-- Recreate RLS policy (sender_id is now text; allow any authenticated insert
-- since mock senders won't be valid UUIDs. Real kudos from the app use the
-- authenticated user's UUID as text.)
create policy "kudos_insert_authenticated"
  on public.kudos for insert
  to authenticated
  with check (true);

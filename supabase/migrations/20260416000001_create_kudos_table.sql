-- Kudos table: stores all kudo submissions from the Write Kudo modal
create table if not exists public.kudos (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  honor_title text not null constraint kudos_honor_title_length check (char_length(honor_title) <= 100),
  content text not null constraint kudos_content_length check (char_length(content) <= 5000),
  hashtags text[] not null default '{}' constraint kudos_hashtags_count check (array_length(hashtags, 1) between 1 and 5),
  images text[] not null default '{}' constraint kudos_images_count check (array_length(images, 1) is null or array_length(images, 1) <= 5),
  is_anonymous boolean not null default false,
  anonymous_name text constraint kudos_anonymous_name_length check (anonymous_name is null or char_length(anonymous_name) <= 50),
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists kudos_sender_id_idx on public.kudos(sender_id);
create index if not exists kudos_receiver_id_idx on public.kudos(receiver_id);
create index if not exists kudos_created_at_idx on public.kudos(created_at desc);

-- RLS: enable row-level security
alter table public.kudos enable row level security;

-- Policy: any authenticated user can read all kudos
create policy "kudos_select_authenticated"
  on public.kudos for select
  to authenticated
  using (true);

-- Policy: authenticated users can insert their own kudos (sender_id must match)
create policy "kudos_insert_own"
  on public.kudos for insert
  to authenticated
  with check (auth.uid() = sender_id);

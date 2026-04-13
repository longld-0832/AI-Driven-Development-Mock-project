-- Hashtags lookup table: predefined tags for kudo categorization
create table if not exists public.hashtags (
  id serial primary key,
  name text not null unique,
  slug text not null unique
);

-- RLS: enable row-level security
alter table public.hashtags enable row level security;

-- Policy: anyone authenticated can read hashtags
create policy "hashtags_select_authenticated"
  on public.hashtags for select
  to authenticated
  using (true);

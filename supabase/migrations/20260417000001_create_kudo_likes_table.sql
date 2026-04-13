-- kudo_likes: tracks which user has liked which kudo (one row per user + kudo)
create table if not exists public.kudo_likes (
  user_id    uuid not null references auth.users(id) on delete cascade,
  kudo_id    uuid not null references public.kudos(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, kudo_id)
);

create index if not exists kudo_likes_kudo_id_idx on public.kudo_likes(kudo_id);
create index if not exists kudo_likes_user_id_idx on public.kudo_likes(user_id);

alter table public.kudo_likes enable row level security;

-- Anyone authenticated can read the likes table (needed for aggregation + likedByMe)
create policy "kudo_likes_select_authenticated"
  on public.kudo_likes for select
  to authenticated
  using (true);

-- Users can insert likes only for themselves
create policy "kudo_likes_insert_own"
  on public.kudo_likes for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can delete likes only for themselves
create policy "kudo_likes_delete_own"
  on public.kudo_likes for delete
  to authenticated
  using (auth.uid() = user_id);

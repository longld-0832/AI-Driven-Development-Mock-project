-- Denormalized like_count column on kudos for O(1) feed reads.
-- Maintained by the sync_kudos_like_count trigger below.
alter table public.kudos
  add column if not exists like_count integer not null default 0;

-- Trigger function: increments/decrements kudos.like_count on changes to kudo_likes.
-- Uses greatest(x - 1, 0) to defensively prevent negative counts on unexpected states.
create or replace function public.sync_kudos_like_count()
returns trigger
language plpgsql
security definer
as $$
begin
  if tg_op = 'INSERT' then
    update public.kudos
      set like_count = like_count + 1
      where id = new.kudo_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.kudos
      set like_count = greatest(like_count - 1, 0)
      where id = old.kudo_id;
    return old;
  end if;
  return null;
end;
$$;

drop trigger if exists kudo_likes_sync_count on public.kudo_likes;

create trigger kudo_likes_sync_count
  after insert or delete on public.kudo_likes
  for each row execute function public.sync_kudos_like_count();

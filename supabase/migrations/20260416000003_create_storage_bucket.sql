-- Storage bucket for kudo image attachments
insert into storage.buckets (id, name, public)
values ('kudo-images', 'kudo-images', true)
on conflict (id) do nothing;

-- Policy: authenticated users can upload images
create policy "kudo_images_insert_authenticated"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'kudo-images');

-- Policy: anyone can read kudo images (public bucket)
create policy "kudo_images_select_public"
  on storage.objects for select
  to public
  using (bucket_id = 'kudo-images');

-- Policy: users can delete their own uploaded images
create policy "kudo_images_delete_own"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'kudo-images'
    and (storage.foldername(name))[1] = 'kudos'
    and (storage.foldername(name))[2] = auth.uid()::text
  );

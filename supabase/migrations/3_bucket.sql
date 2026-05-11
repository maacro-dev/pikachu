insert into storage.buckets (id, name, public)
values ('content-media', 'content-media', true);

create policy "Public read"
  on storage.objects for select
  using (bucket_id = 'content-media');

create policy "Auth upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'content-media');

create policy "Auth delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'content-media');

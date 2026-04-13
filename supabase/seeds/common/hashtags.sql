-- Seed: predefined hashtags for kudo categorization
insert into public.hashtags (name, slug) values
  ('Dedicated', 'dedicated'),
  ('Inspiring', 'inspiring'),
  ('Creative', 'creative'),
  ('Teamwork', 'teamwork'),
  ('Leadership', 'leadership'),
  ('Problem Solver', 'problem-solver'),
  ('Mentorship', 'mentorship'),
  ('Innovation', 'innovation'),
  ('Going Extra Mile', 'going-extra-mile'),
  ('Positive Vibes', 'positive-vibes')
on conflict (slug) do nothing;

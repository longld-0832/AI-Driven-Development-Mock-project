-- Seed mock kudos so that like/unlike interactions persist via kudo_likes.
-- IDs match KUDOS_MOCKS in src/data/kudos-mock.ts so the client-side
-- feed and the server-side DB are in sync.
insert into public.kudos (id, sender_id, receiver_id, honor_title, content, hashtags, images, is_anonymous, like_count, created_at) values
('kudo-01', 'sunner-01', 'sunner-02', 'IDOL GIOI TRE',
  'Cam on Han da chot lai toan bo luong giao dien cho live board trong mot sprint rat cang.',
  ARRAY['#Dedicated', '#Inspiring', '#Teamwork'],
  ARRAY[]::text[], false, 126, '2025-10-30 10:05:00+00'),

('kudo-02', 'sunner-03', 'sunner-04', 'CULTURE BUILDER',
  'Uyen da giup team on-board 3 thanh vien moi rat mem mai va chu dao.',
  ARRAY['#Grateful', '#Care'],
  ARRAY[]::text[], false, 88, '2025-10-28 16:40:00+00'),

('kudo-03', 'sunner-07', 'sunner-05', 'ROOT FURTHER',
  'Kiet da tim ra cach toi uu query va cache de giam thoi gian tai bang xep hang.',
  ARRAY['#ProblemSolver', '#AIReady'],
  ARRAY[]::text[], false, 142, '2025-10-25 08:15:00+00'),

('kudo-04', 'sunner-06', 'sunner-08', 'BRAND MOMENT',
  'Thu da xoay xong campaign timeline trong 24h de team kip cong bo teaser cho SAA 2025.',
  ARRAY['#FastMove', '#OneTeam'],
  ARRAY[]::text[], false, 64, '2025-10-22 13:55:00+00'),

('kudo-05', 'sunner-09', 'sunner-01', 'QUALITY GUARD',
  'Cam on Chau da support rat ky phan test case va accessibility checklist.',
  ARRAY['#Reliable', '#Accessible'],
  ARRAY[]::text[], false, 53, '2025-10-20 11:22:00+00'),

('kudo-06', 'sunner-10', 'sunner-03', 'CROSS-FUNCTION IMPACT',
  'Anh Nam da giup team Operations hieu ro luong dang ky tham du va cach dong bo thong tin.',
  ARRAY['#Clarity', '#Support'],
  ARRAY[]::text[], false, 37, '2025-10-18 09:05:00+00'),

('kudo-07', 'sunner-02', 'sunner-07', 'TEAM SPIRIT',
  'Thinh luon san sang review code gap va huong dan nhung goc can chu y cho team junior.',
  ARRAY['#Mentoring', '#Growth'],
  ARRAY[]::text[], false, 101, '2025-10-15 15:32:00+00'),

('kudo-08', 'sunner-04', 'sunner-10', 'SUNNER CARE',
  'Trang da ho tro khong gian va hau can rat tot cho chuoi workshop noi bo.',
  ARRAY['#Thoughtful', '#Reliable'],
  ARRAY[]::text[], false, 46, '2025-10-12 17:10:00+00')

on conflict (id) do nothing;

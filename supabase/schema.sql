-- paper-explainer 端末間同期用スキーマ（Supabase）。
-- Supabase ダッシュボードの「SQL Editor」に貼り付けて Run する。
--
-- ユーザーごとに1行。data(JSONB) に {notes, status, fav} をまとめて保存する。
-- 行レベルセキュリティ(RLS)で、各ユーザーは自分の行だけ読み書きできる。

create table if not exists public.user_data (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;

-- 自分の行のみ SELECT / INSERT / UPDATE 可能
drop policy if exists "own_row_select" on public.user_data;
create policy "own_row_select" on public.user_data
  for select using (auth.uid() = user_id);

drop policy if exists "own_row_insert" on public.user_data;
create policy "own_row_insert" on public.user_data
  for insert with check (auth.uid() = user_id);

drop policy if exists "own_row_update" on public.user_data;
create policy "own_row_update" on public.user_data
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 他端末の更新をリアルタイム受信するため Realtime に追加
alter publication supabase_realtime add table public.user_data;

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null,
  subscription_tier text not null default 'free',
  subscription_expiry_date timestamptz,
  avatar_url text,
  language text not null default 'en',
  api_key text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  technique_id text not null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, technique_id)
);

create table if not exists public.downloads (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  technique_id text not null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, technique_id)
);

create table if not exists public.ai_conversations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.handle_updated_at();

create trigger set_conversations_updated_at
before update on public.ai_conversations
for each row execute function public.handle_updated_at();

alter table public.profiles enable row level security;
alter table public.bookmarks enable row level security;
alter table public.downloads enable row level security;
alter table public.ai_conversations enable row level security;

create policy "Profiles are viewable by owner" on public.profiles
  for select
  using (auth.uid() = id);

create policy "Profiles are editable by owner" on public.profiles
  for update
  using (auth.uid() = id);

create policy "Insert own profile" on public.profiles
  for insert
  with check (auth.uid() = id);

create policy "Manage own bookmarks" on public.bookmarks
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Manage own downloads" on public.downloads
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Manage own conversations" on public.ai_conversations
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

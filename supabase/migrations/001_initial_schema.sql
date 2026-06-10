-- CareerPilot AI — initial schema
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role text not null default 'job_seeker' check (role in ('job_seeker', 'recruiter', 'admin')),
  title text,
  location text,
  profile_score integer not null default 0 check (profile_score between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Jobs
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text not null,
  type text not null check (type in ('full_time', 'part_time', 'contract', 'remote')),
  salary text,
  description text,
  posted_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- Applications
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  job_id uuid not null references public.jobs (id) on delete cascade,
  status text not null default 'applied' check (
    status in ('saved', 'applied', 'reviewing', 'interviewing', 'offered', 'rejected')
  ),
  match_score integer not null default 0 check (match_score between 0 and 100),
  applied_at timestamptz not null default now(),
  unique (user_id, job_id)
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;

-- Profiles: users read/update own row
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Jobs: public read, recruiters insert own
create policy "Anyone can view jobs"
  on public.jobs for select
  using (true);

create policy "Recruiters can post jobs"
  on public.jobs for insert
  with check (
    auth.uid() = posted_by
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('recruiter', 'admin')
    )
  );

-- Applications: users manage own
create policy "Users can view own applications"
  on public.applications for select
  using (auth.uid() = user_id);

create policy "Users can create own applications"
  on public.applications for insert
  with check (auth.uid() = user_id);

create policy "Users can update own applications"
  on public.applications for update
  using (auth.uid() = user_id);

-- Grants
grant usage on schema public to anon, authenticated;
grant select on public.jobs to anon, authenticated;
grant all on public.profiles to authenticated;
grant all on public.applications to authenticated;
grant insert on public.jobs to authenticated;

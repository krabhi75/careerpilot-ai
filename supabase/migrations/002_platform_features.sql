-- CareerPilot AI — platform features (run after 001)

-- External / aggregated jobs cache
create table if not exists public.external_jobs (
  id text primary key,
  title text not null,
  company text not null,
  location text not null,
  type text not null default 'full_time',
  salary text,
  description text,
  source text not null,
  external_url text,
  skills jsonb default '[]',
  match_score integer default 0,
  posted_at timestamptz default now(),
  fetched_at timestamptz not null default now()
);

-- User resumes
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  file_name text,
  content text not null,
  ats_score integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tracker items (flexible — works with external job ids)
create table if not exists public.tracker_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  job_id text not null,
  job_title text not null,
  company text not null,
  status text not null default 'saved',
  match_score integer default 0,
  notes text,
  tailored_resume text,
  applied_at timestamptz default now(),
  unique (user_id, job_id)
);

-- Interview sessions
create table if not exists public.interview_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete cascade,
  role text not null,
  company text,
  questions jsonb not null default '[]',
  feedback jsonb,
  score integer,
  created_at timestamptz not null default now()
);

-- Notification preferences
create table if not exists public.notification_preferences (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  email_enabled boolean not null default true,
  whatsapp_enabled boolean not null default false,
  email_address text,
  whatsapp_number text,
  alert_types jsonb not null default '["new_job","status_update","match","deadline"]',
  updated_at timestamptz not null default now()
);

-- Salary insights cache
create table if not exists public.salary_insights (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text,
  location text not null default 'India',
  min_salary integer not null,
  max_salary integer not null,
  currency text not null default 'INR',
  source text default 'glassdoor',
  updated_at timestamptz not null default now()
);

alter table public.external_jobs enable row level security;
alter table public.resumes enable row level security;
alter table public.tracker_items enable row level security;
alter table public.interview_sessions enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.salary_insights enable row level security;

create policy "Anyone can read external jobs"
  on public.external_jobs for select using (true);

create policy "Anyone can read salary insights"
  on public.salary_insights for select using (true);

create policy "Users manage own resumes"
  on public.resumes for all using (auth.uid() = user_id);

create policy "Users manage own tracker"
  on public.tracker_items for all using (auth.uid() = user_id);

create policy "Users manage own interviews"
  on public.interview_sessions for all using (auth.uid() = user_id);

create policy "Users manage own notifications"
  on public.notification_preferences for all using (auth.uid() = user_id);

grant select on public.external_jobs to anon, authenticated;
grant select on public.salary_insights to anon, authenticated;
grant all on public.resumes to authenticated;
grant all on public.tracker_items to authenticated;
grant all on public.interview_sessions to authenticated;
grant all on public.notification_preferences to authenticated;

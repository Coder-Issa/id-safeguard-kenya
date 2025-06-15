
-- Create app_role enum for admin/user roles
create type public.app_role as enum ('admin', 'user');

-- Table for user profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null
);

alter table public.profiles enable row level security;

-- RLS: Users can view own profile
create policy "Users can view own profile"
on public.profiles
for select
using (auth.uid() = id);

-- RLS: Users can insert their own profile
create policy "Users can insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);

-- RLS: Users can update their own profile
create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id);

-- Table for user roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- RLS: Users can view own roles
create policy "Users can view own roles"
on public.user_roles
for select
using (auth.uid() = user_id);

-- RLS: Users can insert own roles
create policy "Users can insert own roles"
on public.user_roles
for insert
with check (auth.uid() = user_id);

-- RLS: Users can update own roles
create policy "Users can update own roles"
on public.user_roles
for update
using (auth.uid() = user_id);

-- Function to check role
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

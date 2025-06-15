
-- Create table to store found ID cards, owned by users.
create table public.found_id_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  id_number text not null,
  full_name text not null,
  date_of_birth date,
  place_found text not null,
  additional_info text,
  image_url text, -- for storing uploaded image URLs (if any)
  posted_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table public.found_id_cards enable row level security;

-- Policy: users can view their own posted cards
create policy "User can view own cards"
on public.found_id_cards
for select using (auth.uid() = user_id);

-- Policy: users can insert records for themselves
create policy "User can post own cards"
on public.found_id_cards
for insert with check (auth.uid() = user_id);

-- Policy: users can update or delete their own cards
create policy "User can update or delete their own cards"
on public.found_id_cards
for update using (auth.uid() = user_id);

create policy "User can delete their own cards"
on public.found_id_cards
for delete using (auth.uid() = user_id);


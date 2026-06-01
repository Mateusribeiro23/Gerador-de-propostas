-- Run this in Supabase SQL Editor to create the proposals table

create table if not exists proposals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  user_id uuid references auth.users on delete cascade,
  client_name text not null,
  company_name text,
  contract_duration int default 6,
  installments int,
  total_contract_value numeric,
  original_price numeric,
  monthly_fee numeric,
  ad_budget numeric,
  deliverables jsonb default '[]'::jsonb,
  observations text,
  date text,
  status text default 'draft' check (status in ('draft', 'sent'))
);

-- Enable RLS
alter table proposals enable row level security;

-- Policy: users can only see their own proposals
create policy "Users can manage their own proposals"
  on proposals
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Allow public read for shared links (/p/[id] route)
create policy "Public can view proposals by id"
  on proposals
  for select
  using (true);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger proposals_updated_at
  before update on proposals
  for each row execute function update_updated_at();

-- Run this if the table already exists (adds the installments column)
alter table proposals add column if not exists installments int;

-- ============================================
-- GitHub Pages URL Shortener Database
-- ============================================

create extension if not exists pgcrypto;

-- ============================================
-- Table
-- ============================================

create table if not exists public.short_urls (

    id uuid primary key default gen_random_uuid(),

    short_code varchar(12) not null unique,

    long_url text not null,

    clicks integer not null default 0,

    created_at timestamptz not null default now(),

    expires_at timestamptz

);

create unique index if not exists idx_short_code
on public.short_urls(short_code);

-- ============================================
-- Enable Row Level Security
-- ============================================

alter table public.short_urls
enable row level security;

-- ============================================
-- Policies
-- ============================================

drop policy if exists "Public Read" on public.short_urls;
drop policy if exists "Public Insert" on public.short_urls;
drop policy if exists "Public Update Clicks" on public.short_urls;

create policy "Public Read"

on public.short_urls

for select

to anon

using (true);

create policy "Public Insert"

on public.short_urls

for insert

to anon

with check (true);

create policy "Public Update Clicks"

on public.short_urls

for update

to anon

using (true)

with check (true);

-- ============================================
-- Helpful View
-- ============================================

create or replace view public.short_url_stats as

select

    short_code,

    long_url,

    clicks,

    created_at,

    expires_at

from public.short_urls;

grant select on public.short_url_stats to anon;

-- ============================================
-- Permissions
-- ============================================

grant usage on schema public to anon;

grant select, insert, update
on public.short_urls
to anon;

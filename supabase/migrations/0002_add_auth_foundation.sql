-- 1. Add missing fields to profiles
alter table public.profiles
  add column if not exists avatar_url text,
  add column if not exists last_login_at timestamptz;

-- 2. Secure handle_new_user function
-- Forces all public signups to be 'customer'
-- Grabs avatar_url from OAuth providers if available, else defaults to local placeholder
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id, 
    email, 
    full_name, 
    avatar_url, 
    role, 
    is_active
  )
  values (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(
      new.raw_user_meta_data->>'avatar_url',
      new.raw_user_meta_data->>'picture',
      '/placeholder.svg'
    ),
    'customer',
    true
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

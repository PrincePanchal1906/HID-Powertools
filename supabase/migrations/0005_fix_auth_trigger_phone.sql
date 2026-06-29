-- ========================================================================================
-- Phase 2: Fix Auth Trigger Phone
-- Description: Updates the handle_new_user trigger to correctly extract the phone number 
-- from the user's metadata during signup and save it to the profile.
-- ========================================================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, phone, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'phone',
    'customer'
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

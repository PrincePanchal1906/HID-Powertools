-- Run this in your Supabase Dashboard SQL Editor to fix the infinite recursion!

-- 1. Create the admin check function that securely bypasses RLS
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer set search_path = public;

-- 2. Update Profiles Policies
alter policy "Admins can view all profiles" on public.profiles using (public.is_admin());

-- 3. Update Categories Policies
alter policy "Admins can insert categories" on public.categories with check (public.is_admin());
alter policy "Admins can update categories" on public.categories using (public.is_admin());
alter policy "Admins can delete categories" on public.categories using (public.is_admin());

-- 4. Update Brands Policies
alter policy "Admins can insert brands" on public.brands with check (public.is_admin());
alter policy "Admins can update brands" on public.brands using (public.is_admin());
alter policy "Admins can delete brands" on public.brands using (public.is_admin());

-- 5. Update Products Policies
alter policy "Admins can view all products" on public.products using (public.is_admin());
alter policy "Admins can insert products" on public.products with check (public.is_admin());
alter policy "Admins can update products" on public.products using (public.is_admin());
alter policy "Admins can delete products" on public.products using (public.is_admin());

-- 6. Update Orders Policies
alter policy "Admins can view all orders" on public.orders using (public.is_admin());
alter policy "Admins can update orders" on public.orders using (public.is_admin());

-- 7. Update Order Items Policies
alter policy "Admins can view all order items" on public.order_items using (public.is_admin());

-- Create the admin check function that securely bypasses RLS
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer set search_path = public;

-- Profiles Policies
drop policy if exists "Admins can view all profiles" on public.profiles;
create policy "Admins can view all profiles" on public.profiles for select using (public.is_admin());

-- Categories Policies
drop policy if exists "Admins can insert categories" on public.categories;
drop policy if exists "Admins can update categories" on public.categories;
drop policy if exists "Admins can delete categories" on public.categories;
create policy "Admins can insert categories" on public.categories for insert with check (public.is_admin());
create policy "Admins can update categories" on public.categories for update using (public.is_admin());
create policy "Admins can delete categories" on public.categories for delete using (public.is_admin());

-- Brands Policies
drop policy if exists "Admins can insert brands" on public.brands;
drop policy if exists "Admins can update brands" on public.brands;
drop policy if exists "Admins can delete brands" on public.brands;
create policy "Admins can insert brands" on public.brands for insert with check (public.is_admin());
create policy "Admins can update brands" on public.brands for update using (public.is_admin());
create policy "Admins can delete brands" on public.brands for delete using (public.is_admin());

-- Products Policies
drop policy if exists "Admins can view all products" on public.products;
drop policy if exists "Admins can insert products" on public.products;
drop policy if exists "Admins can update products" on public.products;
drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can view all products" on public.products for select using (public.is_admin());
create policy "Admins can insert products" on public.products for insert with check (public.is_admin());
create policy "Admins can update products" on public.products for update using (public.is_admin());
create policy "Admins can delete products" on public.products for delete using (public.is_admin());

-- Orders Policies
drop policy if exists "Admins can view all orders" on public.orders;
drop policy if exists "Admins can update orders" on public.orders;
create policy "Admins can view all orders" on public.orders for select using (public.is_admin());
create policy "Admins can update orders" on public.orders for update using (public.is_admin());

-- Order Items Policies
drop policy if exists "Admins can view all order items" on public.order_items;
create policy "Admins can view all order items" on public.order_items for select using (public.is_admin());

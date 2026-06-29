-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==========================================
-- 1. PROFILES
-- ==========================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  role text default 'customer'::text check (role in ('customer', 'admin')),
  is_active boolean default true,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ==========================================
-- 2. CATEGORIES
-- ==========================================
create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null
);

-- ==========================================
-- 3. BRANDS
-- ==========================================
create table public.brands (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null
);

-- ==========================================
-- 4. PRODUCTS
-- ==========================================
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references public.categories(id) on delete set null,
  brand_id uuid references public.brands(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  name text not null,
  slug text unique not null,
  price numeric(10,2) not null default 0,
  image_url text,
  is_active boolean default true,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ==========================================
-- 5. ADDRESSES
-- ==========================================
create table public.addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  full_name text not null,
  phone text,
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  state text not null,
  country text not null,
  postal_code text not null,
  is_default boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ==========================================
-- 6. CARTS
-- ==========================================
create table public.carts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now() not null
);

-- ==========================================
-- 7. CART ITEMS
-- ==========================================
create table public.cart_items (
  id uuid primary key default uuid_generate_v4(),
  cart_id uuid references public.carts(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  quantity integer not null default 1,
  created_at timestamptz default now() not null
);

-- ==========================================
-- 8. ORDERS
-- ==========================================
create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  order_number text unique not null,
  subtotal numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  shipping numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  status text not null check (status in ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ==========================================
-- 9. ORDER ITEMS
-- ==========================================
create table public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_price numeric(10,2) not null,
  quantity integer not null,
  total numeric(10,2) not null
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.addresses enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Profiles Policies
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admins can view all profiles" on public.profiles for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Categories Policies
create policy "Categories are publicly viewable" on public.categories for select using (true);
create policy "Admins can insert categories" on public.categories for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update categories" on public.categories for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can delete categories" on public.categories for delete using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Brands Policies
create policy "Brands are publicly viewable" on public.brands for select using (true);
create policy "Admins can insert brands" on public.brands for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update brands" on public.brands for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can delete brands" on public.brands for delete using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Products Policies
create policy "Active products are publicly viewable" on public.products for select using (is_active = true);
create policy "Admins can view all products" on public.products for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can insert products" on public.products for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update products" on public.products for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can delete products" on public.products for delete using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Addresses Policies
create policy "Users can view own addresses" on public.addresses for select using (auth.uid() = user_id);
create policy "Users can insert own addresses" on public.addresses for insert with check (auth.uid() = user_id);
create policy "Users can update own addresses" on public.addresses for update using (auth.uid() = user_id);
create policy "Users can delete own addresses" on public.addresses for delete using (auth.uid() = user_id);

-- Carts Policies
create policy "Users can view own cart" on public.carts for select using (auth.uid() = user_id);
create policy "Users can insert own cart" on public.carts for insert with check (auth.uid() = user_id);
create policy "Users can update own cart" on public.carts for update using (auth.uid() = user_id);
create policy "Users can delete own cart" on public.carts for delete using (auth.uid() = user_id);

-- Cart Items Policies
create policy "Users can view own cart items" on public.cart_items for select using (
  exists (select 1 from public.carts where id = cart_items.cart_id and user_id = auth.uid())
);
create policy "Users can insert own cart items" on public.cart_items for insert with check (
  exists (select 1 from public.carts where id = cart_items.cart_id and user_id = auth.uid())
);
create policy "Users can update own cart items" on public.cart_items for update using (
  exists (select 1 from public.carts where id = cart_items.cart_id and user_id = auth.uid())
);
create policy "Users can delete own cart items" on public.cart_items for delete using (
  exists (select 1 from public.carts where id = cart_items.cart_id and user_id = auth.uid())
);

-- Orders Policies
create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Admins can view all orders" on public.orders for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update orders" on public.orders for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Order Items Policies
create policy "Users can view own order items" on public.order_items for select using (
  exists (select 1 from public.orders where id = order_items.order_id and user_id = auth.uid())
);
create policy "Admins can view all order items" on public.order_items for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ==========================================
-- TRIGGERS & FUNCTIONS
-- ==========================================

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'customer');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update 'updated_at' column automatically
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

create trigger update_products_updated_at
  before update on public.products
  for each row execute procedure public.update_updated_at_column();

create trigger update_addresses_updated_at
  before update on public.addresses
  for each row execute procedure public.update_updated_at_column();

create trigger update_orders_updated_at
  before update on public.orders
  for each row execute procedure public.update_updated_at_column();

-- ==========================================
-- INDEXES
-- ==========================================
create index idx_products_slug on public.products(slug);
create index idx_products_category_id on public.products(category_id);
create index idx_products_brand_id on public.products(brand_id);
create index idx_products_is_active on public.products(is_active);

create index idx_categories_slug on public.categories(slug);
create index idx_brands_slug on public.brands(slug);

create index idx_orders_user_id on public.orders(user_id);
create index idx_cart_items_cart_id on public.cart_items(cart_id);

-- ==========================================
-- STORAGE BUCKETS (Restricted by default)
-- ==========================================
insert into storage.buckets (id, name, public) values 
  ('product-images', 'product-images', false),
  ('category-images', 'category-images', false),
  ('brand-logos', 'brand-logos', false),
  ('avatars', 'avatars', false);

-- ==========================================
-- SEED DATA
-- ==========================================
insert into public.categories (name, slug) values
  ('Power Tools', 'power-tools'),
  ('Hand Tools', 'hand-tools'),
  ('Safety Equipment', 'safety-equipment'),
  ('Industrial Supplies', 'industrial-supplies'),
  ('Cutting Tools', 'cutting-tools'),
  ('Measuring Tools', 'measuring-tools'),
  ('Accessories', 'accessories'),
  ('Spare Parts', 'spare-parts');

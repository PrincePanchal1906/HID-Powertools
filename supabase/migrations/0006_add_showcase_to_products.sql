-- Add homepage showcase fields to products table
ALTER TABLE public.products 
ADD COLUMN show_on_homepage BOOLEAN DEFAULT FALSE,
ADD COLUMN homepage_order INTEGER DEFAULT 0;

-- Create an index to quickly fetch homepage showcase products
CREATE INDEX idx_products_homepage_showcase ON public.products(show_on_homepage) WHERE show_on_homepage = true;

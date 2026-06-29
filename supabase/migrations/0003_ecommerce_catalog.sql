-- ========================================================================================
-- Phase 2: E-Commerce Catalog Foundation
-- Description: Alters existing tables and creates new ones for the extended catalog.
-- Safe Version: Re-runnable without throwing "already exists" or missing column errors.
-- ========================================================================================

-- Create the trigger function for updated_at if it doesn't exist
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 1. Categories (Altering existing table from 0000)
-- ==========================================
ALTER TABLE public.categories 
    ADD COLUMN IF NOT EXISTS meta_title TEXT,
    ADD COLUMN IF NOT EXISTS meta_description TEXT,
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_categories_is_active ON public.categories(is_active) WHERE deleted_at IS NULL;

DROP TRIGGER IF EXISTS set_categories_updated_at ON public.categories;
CREATE TRIGGER set_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- ==========================================
-- 2. Brands (Altering existing table from 0000)
-- ==========================================
ALTER TABLE public.brands 
    ADD COLUMN IF NOT EXISTS meta_title TEXT,
    ADD COLUMN IF NOT EXISTS meta_description TEXT,
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_brands_is_active ON public.brands(is_active) WHERE deleted_at IS NULL;

DROP TRIGGER IF EXISTS set_brands_updated_at ON public.brands;
CREATE TRIGGER set_brands_updated_at
    BEFORE UPDATE ON public.brands
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- ==========================================
-- 3. Products (Altering existing table from 0000)
-- ==========================================
DO $$ 
BEGIN
  CREATE TYPE product_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

ALTER TABLE public.products 
    ADD COLUMN IF NOT EXISTS sku TEXT UNIQUE,
    ADD COLUMN IF NOT EXISTS short_description TEXT,
    ADD COLUMN IF NOT EXISTS full_description TEXT,
    ADD COLUMN IF NOT EXISTS compare_price NUMERIC(10, 2),
    ADD COLUMN IF NOT EXISTS gst_percentage NUMERIC(5, 2) DEFAULT 18.00,
    ADD COLUMN IF NOT EXISTS stock INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS status product_status NOT NULL DEFAULT 'draft',
    ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS is_new_arrival BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS is_bestseller BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS weight NUMERIC(10, 2),
    ADD COLUMN IF NOT EXISTS dimensions JSONB,
    ADD COLUMN IF NOT EXISTS warranty TEXT,
    ADD COLUMN IF NOT EXISTS specifications JSONB,
    ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
    ADD COLUMN IF NOT EXISTS meta_title TEXT,
    ADD COLUMN IF NOT EXISTS meta_description TEXT,
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status) WHERE deleted_at IS NULL;

-- ==========================================
-- 4. Product Images (New Table)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id);

-- ==========================================
-- 5. Product Variants (New Table)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    price NUMERIC(10, 2),
    stock INTEGER NOT NULL DEFAULT 0,
    attributes JSONB,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON public.product_variants(product_id);

DROP TRIGGER IF EXISTS set_product_variants_updated_at ON public.product_variants;
CREATE TRIGGER set_product_variants_updated_at
    BEFORE UPDATE ON public.product_variants
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- ==========================================
-- 6. Product Documents (New Table)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.product_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    document_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_product_documents_product_id ON public.product_documents(product_id);

-- ==========================================
-- Row Level Security (RLS) Updates
-- ==========================================
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_documents ENABLE ROW LEVEL SECURITY;

-- Categories & Brands & Products already had RLS enabled in 0000, we just add/replace the policies
DROP POLICY IF EXISTS "Public can view active categories" ON public.categories;
CREATE POLICY "Public can view active categories" 
    ON public.categories FOR SELECT 
    USING (is_active = true AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Public can view active brands" ON public.brands;
CREATE POLICY "Public can view active brands" 
    ON public.brands FOR SELECT 
    USING (is_active = true AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Public can view published products" ON public.products;
CREATE POLICY "Public can view published products" 
    ON public.products FOR SELECT 
    USING (status = 'published' AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Public can view published product images" ON public.product_images;
CREATE POLICY "Public can view published product images" 
    ON public.product_images FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.products p 
            WHERE p.id = product_id 
            AND p.status = 'published' 
            AND p.deleted_at IS NULL
        )
    );

DROP POLICY IF EXISTS "Public can view published product variants" ON public.product_variants;
CREATE POLICY "Public can view published product variants" 
    ON public.product_variants FOR SELECT 
    USING (
        is_active = true AND
        EXISTS (
            SELECT 1 FROM public.products p 
            WHERE p.id = product_id 
            AND p.status = 'published' 
            AND p.deleted_at IS NULL
        )
    );

DROP POLICY IF EXISTS "Public can view published product documents" ON public.product_documents;
CREATE POLICY "Public can view published product documents" 
    ON public.product_documents FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.products p 
            WHERE p.id = product_id 
            AND p.status = 'published' 
            AND p.deleted_at IS NULL
        )
    );

-- Admins
DROP POLICY IF EXISTS "Admins have full access to product images" ON public.product_images;
CREATE POLICY "Admins have full access to product images" 
    ON public.product_images FOR ALL 
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admins have full access to product variants" ON public.product_variants;
CREATE POLICY "Admins have full access to product variants" 
    ON public.product_variants FOR ALL 
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admins have full access to product documents" ON public.product_documents;
CREATE POLICY "Admins have full access to product documents" 
    ON public.product_documents FOR ALL 
    USING (public.is_admin());

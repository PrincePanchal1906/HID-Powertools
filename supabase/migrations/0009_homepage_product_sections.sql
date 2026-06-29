-- Create a single generic mapping table for all homepage product sections
CREATE TABLE IF NOT EXISTS public.homepage_product_sections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    section_key TEXT NOT NULL, -- e.g. 'hero', 'offers', 'featured'
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure a product only appears once per section
    UNIQUE(section_key, product_id)
);

-- Add index for display order and section lookups
CREATE INDEX IF NOT EXISTS idx_homepage_sections_key ON public.homepage_product_sections(section_key);
CREATE INDEX IF NOT EXISTS idx_homepage_sections_order ON public.homepage_product_sections(section_key, display_order);

-- Add RLS policies
ALTER TABLE public.homepage_product_sections ENABLE ROW LEVEL SECURITY;

-- Everyone can read active items
CREATE POLICY "Public can read homepage sections" ON public.homepage_product_sections
    FOR SELECT USING (true);

-- Only admins can manage
CREATE POLICY "Admins can insert homepage sections" ON public.homepage_product_sections
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can update homepage sections" ON public.homepage_product_sections
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can delete homepage sections" ON public.homepage_product_sections
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Since we are migrating from hero_products to homepage_product_sections, 
-- let's migrate any existing data over.
INSERT INTO public.homepage_product_sections (section_key, product_id, display_order, created_at)
SELECT 'hero', product_id, display_order, created_at FROM public.hero_products
ON CONFLICT DO NOTHING;

-- We can leave hero_products for backup for now, or just leave it alone.

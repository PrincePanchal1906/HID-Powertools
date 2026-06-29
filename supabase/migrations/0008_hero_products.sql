-- Create a dedicated mapping table for Hero products
CREATE TABLE IF NOT EXISTS public.hero_products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure a product only appears once in the Hero
    UNIQUE(product_id)
);

-- Add index for display order and product lookups
CREATE INDEX IF NOT EXISTS idx_hero_products_order ON public.hero_products(display_order);

-- Add RLS policies
ALTER TABLE public.hero_products ENABLE ROW LEVEL SECURITY;

-- Everyone can read active items
CREATE POLICY "Public can read hero products" ON public.hero_products
    FOR SELECT USING (true);

-- Only admins can manage
CREATE POLICY "Admins can insert hero products" ON public.hero_products
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can update hero products" ON public.hero_products
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can delete hero products" ON public.hero_products
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- ========================================================================================
-- Phase 2: Seed Default Brand
-- Description: Inserts the default "HID" brand.
-- ========================================================================================

INSERT INTO public.brands (name, slug, is_active)
VALUES ('HID', 'hid', true)
ON CONFLICT (slug) DO NOTHING;

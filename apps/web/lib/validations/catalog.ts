import { z } from 'zod';

// ==========================================
// Generic / Shared Schemas
// ==========================================
export const slugSchema = z
  .string()
  .min(2, "Slug must be at least 2 characters")
  .max(100, "Slug cannot exceed 100 characters")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens");

// ==========================================
// Category & Brand Schemas
// ==========================================
export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: slugSchema,
  meta_title: z.string().max(60).optional().nullable(),
  meta_description: z.string().max(160).optional().nullable(),
  is_active: z.boolean().default(true),
});

export const brandSchema = categorySchema; // Brands share the same structure

// ==========================================
// Product Schemas
// ==========================================
export const productSchema = z.object({
  name: z.string().min(2, "Name is required").max(150),
  slug: slugSchema,
  sku: z.string().max(50).optional().nullable(),
  category_id: z.string().uuid("Invalid category").optional().nullable(),
  brand_id: z.string().uuid("Invalid brand").optional().nullable(),
  
  short_description: z.string().max(300).optional().nullable(),
  full_description: z.string().optional().nullable(),
  
  price: z.coerce.number().min(0, "Price cannot be negative"),
  compare_price: z.coerce.number().min(0).optional().nullable(),
  gst_percentage: z.coerce.number().min(0).max(100).default(18),
  
  stock: z.coerce.number().int().min(0).default(0),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  
  is_featured: z.boolean().default(false),
  is_new_arrival: z.boolean().default(false),
  is_bestseller: z.boolean().default(false),
  
  show_on_homepage: z.boolean().default(false),
  homepage_order: z.coerce.number().int().default(0),
  
  weight: z.coerce.number().min(0).optional().nullable(),
  dimensions: z.object({
    l: z.coerce.number().min(0),
    w: z.coerce.number().min(0),
    h: z.coerce.number().min(0),
  }).optional().nullable(),
  
  warranty: z.string().max(100).optional().nullable(),
  specifications: z.record(z.string(), z.string()).optional().nullable(),
  
  thumbnail_url: z.string().optional().nullable(),
  
  meta_title: z.string().max(60).optional().nullable(),
  meta_description: z.string().max(160).optional().nullable(),
});

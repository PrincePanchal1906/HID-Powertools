export interface Category {
  id: string;
  name: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type ProductStatus = 'draft' | 'published' | 'archived';

export interface Product {
  id: string;
  category_id: string | null;
  brand_id: string | null;
  
  name: string;
  slug: string;
  sku: string | null;
  
  short_description: string | null;
  full_description: string | null;
  
  price: number;
  compare_price: number | null;
  gst_percentage: number;
  
  stock: number;
  status: ProductStatus;
  
  is_featured: boolean;
  is_new_arrival: boolean;
  is_bestseller: boolean;
  
  show_on_homepage: boolean;
  homepage_order: number;
  
  weight: number | null;
  dimensions: { l: number; w: number; h: number } | null;
  
  warranty: string | null;
  specifications: Record<string, string> | null;
  
  thumbnail_url: string | null;
  
  meta_title: string | null;
  meta_description: string | null;
  
  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  // Relations (joined)
  category?: Category;
  brand?: Brand;
  images?: ProductImage[];
  variants?: ProductVariant[];
  documents?: ProductDocument[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string | null;
  price: number | null;
  stock: number;
  attributes: Record<string, string> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductDocument {
  id: string;
  product_id: string;
  title: string;
  document_type: string;
  file_url: string;
  created_at: string;
}

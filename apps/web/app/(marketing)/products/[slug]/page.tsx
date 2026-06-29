import React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/catalog/getProductBySlug'
import ProductGallery from '@/components/products/ProductGallery'
import ProductInfo from '@/components/products/ProductInfo'
import ProductTabs from '@/components/products/ProductTabs'
import RelatedProducts from '@/components/products/RelatedProducts'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  
  if (!product) {
    return { title: 'Product Not Found' }
  }

  const previousImages = (await parent).openGraph?.images || []
  const imageUrl = product.thumbnail_url || '/images/og-image.png'

  const openGraph: any = {
    title: product.name,
    images: [imageUrl, ...previousImages],
    type: 'website',
  };
  
  if (product.short_description) {
    openGraph.description = product.short_description;
  }

  return {
    title: `${product.meta_title || product.name} — HID PowerTools`,
    description: product.meta_description || product.short_description || `Buy ${product.name} at HID PowerTools.`,
    openGraph,
    alternates: {
      canonical: `/products/${product.slug}`,
    }
  }
}

export default async function ProductDetailsPage({ params }: Props) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Schema.org structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.thumbnail_url ? [product.thumbnail_url] : [],
    description: product.short_description || product.name,
    sku: product.sku || product.id,
    offers: {
      '@type': 'Offer',
      url: `https://hidpowertools.com/products/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            ...(product.category ? [{ label: product.category.name, href: `/products?category=${product.category.slug}` }] : []),
            { label: product.name, href: `/products/${product.slug}` }
          ]} />
        </div>

        {/* Top Section: Gallery (Left) & Info (Right) */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-16 mb-8 lg:mb-16">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 shrink-0">
            <ProductGallery 
              images={(product.images || []).map((img: any) => ({
                id: img.id,
                image_url: img.image_url,
                alt_text: img.alt_text || "",
                display_order: img.display_order
              }))} 
              {...(product.thumbnail_url ? { thumbnailUrl: product.thumbnail_url } : {})}
              productName={product.name}
            />
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Tabs Section */}
        <ProductTabs product={product} />

        {/* Related Products Section */}
        <RelatedProducts 
          {...(product.category?.id ? { categoryId: product.category.id } : {})}
          {...(product.category?.slug ? { categorySlug: product.category.slug } : {})}
          currentProductId={product.id} 
        />

      </div>
    </div>
  )
}

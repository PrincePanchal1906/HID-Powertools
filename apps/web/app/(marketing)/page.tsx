import HeroSection from "@/components/landing/HeroSection";
import CategoriesSlider from "@/components/landing/CategoriesSlider";
import { FeaturedCollections } from "@/components/landing/FeaturedCollections";
import PromotionalBannerMobile from "@/components/landing/PromotionalBannerMobile";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import ValueProp from "@/components/landing/ValueProp";
import { IndustrialExperience } from "@/components/landing/IndustrialExperience";
import Testimonials from "@/components/landing/Testimonials";
import NewsletterMobile from "@/components/landing/NewsletterMobile";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { getCategories } from "@/lib/catalog/getCategories";
import { VisualCMSProvider } from "@/components/admin/visual/VisualCMSProvider";

export default async function HomePage() {
  const supabase = await createClient();

  const [userRes, heroRes, categories] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from('homepage_product_sections')
      .select(`
        product_id,
        display_order,
        products (
          id,
          name,
          slug,
          short_description,
          thumbnail_url,
          price,
          compare_price,
          categories ( name )
        )
      `)
      .eq('section_key', 'hero')
      .order('display_order', { ascending: true }),
    getCategories()
  ]);

  const { data: { user } } = userRes;
  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    isAdmin = profile?.role === 'admin';
  }

  const heroSectionData = heroRes.data;

  const carouselItems = heroSectionData?.map((item: any) => {
    const p = item.products
    return {
      id: p.id,
      slug: p.slug,
      category: p.categories?.name || "FEATURED",
      name: p.name,
      description: p.short_description || "Professional grade solutions engineered for maximum performance.",
      price: p.price || 0,
      compare_price: p.compare_price || null,
      image: p.thumbnail_url || "/images/hero-tool-light.png"
    }
  }) || [];

  return (
    <VisualCMSProvider initialContent={{}}>
      <main className="w-full overflow-x-hidden bg-white pb-20 lg:pb-0">
        
        {/* 1. Hero */}
        <HeroSection initialItems={carouselItems} isAdmin={isAdmin} />

        {/* 2. Choose Your Tool (Categories) */}
        <CategoriesSlider categories={categories} />

        {/* 3. Featured Collections */}
        <FeaturedCollections />

        {/* 4. Promotional Banner (Full Width Offer) */}
        <PromotionalBannerMobile isAdmin={isAdmin} />

        {/* 5. Best Sellers */}
        <FeaturedProducts isAdmin={isAdmin} />

        {/* 6. Why HID (Value Prop) */}
        <ValueProp />

        {/* 7. Industrial Experience (Editorial Brand Section) */}
        <IndustrialExperience />

        {/* 8. Testimonials */}
        <Testimonials />

        {/* 9. Newsletter */}
        <NewsletterMobile />

        {/* 10. Footer */}
        <Footer />
        
      </main>
    </VisualCMSProvider>
  );
}

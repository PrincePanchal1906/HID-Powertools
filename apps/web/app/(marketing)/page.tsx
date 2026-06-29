import HeroSection from "@/components/landing/HeroSection";
import PromotionalBanner from "@/components/landing/PromotionalBanner";
import PromotionalBannerMobile from "@/components/landing/PromotionalBannerMobile";
import TrustBanner from "@/components/landing/TrustBanner";
import CategoriesSlider from "@/components/landing/CategoriesSlider";
import ValueProp from "@/components/landing/ValueProp";
import Testimonials from "@/components/landing/Testimonials";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import RiskReversal from "@/components/landing/RiskReversal";
import NewsletterMobile from "@/components/landing/NewsletterMobile";
import MobileTrustBar from "@/components/landing/MobileTrustBar";
import OffersOfTheWeek from "@/components/landing/OffersOfTheWeek";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { getCategories } from "@/lib/catalog/getCategories";
import { VisualCMSProvider } from "@/components/admin/visual/VisualCMSProvider";

export default async function HomePage() {
  const supabase = await createClient();

  // Run queries in parallel to significantly improve load time
  const [userRes, heroRes, offersRes, categories] = await Promise.all([
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
    supabase
      .from('homepage_product_sections')
      .select(`
        product_id,
        display_order,
        products (
          id,
          name,
          slug,
          thumbnail_url,
          price,
          compare_price,
          categories ( name )
        )
      `)
      .eq('section_key', 'offers')
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

  const offerItems = offersRes.data?.map((item: any) => ({
    ...item.products,
    category: { name: item.products.categories?.name || "FEATURED" }
  })) || [];

  return (
    <VisualCMSProvider initialContent={{}}>
      <main className="w-full overflow-x-hidden bg-[#f4f5f7] dark:bg-black lg:bg-white pb-20 lg:pb-0">
        
        {/* 1. Hero */}
        <HeroSection initialItems={carouselItems} isAdmin={isAdmin} />

        {/* 1.5 Mobile Trust Bar */}
        <MobileTrustBar />

        <div className="hidden lg:block">
          <PromotionalBanner />
          <TrustBanner />
        </div>

        {/* 2. Categories (Mobile & Desktop handles its own view) */}
        <CategoriesSlider categories={categories} />

        {/* 3. Offers Of The Week (Mobile) */}
        <OffersOfTheWeek products={offerItems} />

        {/* 4. Mobile Promo Banners */}
        <div className="block lg:hidden">
          <PromotionalBannerMobile isAdmin={isAdmin} />
        </div>

        {/* 4. Best Sellers (Mobile & Desktop handles its own view) */}
        <FeaturedProducts isAdmin={isAdmin} />

        {/* 5. Why Choose HID (Mobile & Desktop handles its own view) */}
        <ValueProp />

        {/* 6. Testimonials (Mobile & Desktop handles its own view) */}
        <Testimonials />

        {/* 7. Mobile Newsletter */}
        <div className="block lg:hidden">
          <NewsletterMobile />
        </div>

        {/* Desktop Extras */}
        <div className="hidden lg:block">
          <RiskReversal />
        </div>

        {/* 8. Footer */}
        <Footer />
        
      </main>
    </VisualCMSProvider>
  );
}

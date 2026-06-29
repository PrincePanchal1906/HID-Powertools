// @hid/types — single source of truth

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialProofStat {
  value: string;
  label: string;
}

export interface HeroProps {
  headline?: string;
  subheadline?: string;
}

export interface TrustStat {
  value: string;
  label: string;
  icon: string;
}

export interface BrandLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

export interface PainPoint {
  id: number;
  emoji: string;
  problem: string;
  solution: string;
}

export interface ValuePropData {
  badge: string;
  headline: string;
  subheadline: string;
  painPoints: PainPoint[];
  closingStatement: string;
}

export interface FeatureHighlight {
  id: number;
  benefit: string;
  feature: string;
  description: string;
  icon: string;
  stat: string;
  statLabel: string;
  imageUrl: string;
  imageSide: 'left' | 'right';
}

export interface FeatureCard {
  id: number;
  icon: string;
  title: string;
  description: string;
  tag: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  tool: string;
  verified: boolean;
}

export interface CaseStudy {
  id: number;
  title: string;
  metric: string;
  metricLabel: string;
  before: string;
  after: string;
  name: string;
  role: string;
  avatar: string;
}

export interface ReviewPlatform {
  name: string;
  rating: string;
  count: string;
  icon: string;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  id: number;
  name: string;
  tag: string;
  price: number;
  originalPrice: number | null;
  billingNote: string;
  description: string;
  color: 'default' | 'featured';
  features: PricingFeature[];
  cta: string;
  ctaHref: string;
}

export interface FinalCTAData {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  primaryHref: string;
  secondaryHref: string;
  backgroundType: 'red' | 'dark';
}

export interface GuaranteeBadge {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'shipping' | 'warranty' | 'product' | 'payment' | 'support';
}

export interface FAQCategory {
  id: string;
  label: string;
  icon: string;
}

export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
  isBadge?: boolean;
  badgeText?: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
  followers: string;
}

export interface ContactDetail {
  icon: string;
  label: string;
  value: string;
  href: string;
}

export interface PaymentMethod {
  name: string;
  src: string;
  width: number;
  height: number;
}
// ✅ FILE COMPLETE
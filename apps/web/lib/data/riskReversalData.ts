import type { GuaranteeBadge, FAQItem, FAQCategory } from '@hid/types';

export const guaranteeBadges: GuaranteeBadge[] = [
  {
    id: 1,
    icon: 'RotateCcw',
    title: '30-Day Money Back',
    description: 'Not happy for any reason? Return it within 30 days for a full refund. No questions, no hassle.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    id: 2,
    icon: 'Shield',
    title: '2-Year Warranty',
    description: 'Every HID tool is covered against defects and failures for a full 2 years from purchase date.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 3,
    icon: 'Truck',
    title: 'Free Shipping',
    description: 'Free delivery anywhere in India on orders above ₹2,000. Same-day dispatch before 2PM.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    id: 4,
    icon: 'CreditCard',
    title: 'Secure Payments',
    description: 'Pay via UPI, cards, net banking or EMI. 256-bit SSL encryption on every transaction.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    id: 5,
    icon: 'Headphones',
    title: '24/7 Expert Support',
    description: 'Real tool technicians available around the clock. Average response time under 2 minutes.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  {
    id: 6,
    icon: 'PackageCheck',
    title: 'Genuine Products',
    description: 'Every tool is 100% authentic and quality-checked before dispatch. No counterfeits, ever.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
  },
];

export const faqCategories: FAQCategory[] = [
  { id: 'all',      label: 'All Questions', icon: 'LayoutGrid'  },
  { id: 'shipping', label: 'Shipping',       icon: 'Truck'       },
  { id: 'warranty', label: 'Warranty',       icon: 'Shield'      },
  { id: 'product',  label: 'Products',       icon: 'Wrench'      },
  { id: 'payment',  label: 'Payment',        icon: 'CreditCard'  },
  { id: 'support',  label: 'Support',        icon: 'Headphones'  },
];

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'How fast will my order arrive?',
    answer: 'Orders placed before 2PM on business days are dispatched same day from our nearest warehouse. Standard delivery takes 1-3 business days across India. Metro cities like Mumbai, Delhi, Bangalore, Chennai, Hyderabad and Ahmedabad typically receive next-day delivery. You will receive a tracking link via SMS and email immediately after dispatch.',
    category: 'shipping',
  },
  {
    id: 2,
    question: 'What does the 2-year warranty actually cover?',
    answer: 'Our warranty covers all manufacturing defects, motor failures, battery cell degradation below 70% capacity, switch and trigger failures, and housing cracks from normal use. It does not cover physical damage from drops, misuse, or third-party modifications. To claim warranty, simply contact our support team with your order number — we arrange pickup and replacement at no cost to you.',
    category: 'warranty',
  },
  {
    id: 3,
    question: 'Can I return a tool if I change my mind?',
    answer: 'Yes, absolutely. Our 30-day no-questions return policy means you can return any tool in its original condition within 30 days of delivery for a full refund. We arrange free pickup from your location. Refunds are processed within 3-5 business days to your original payment method. No restocking fees, no deductions.',
    category: 'shipping',
  },
  {
    id: 4,
    question: 'Are HID PowerTools compatible with other brand batteries?',
    answer: 'HID tools use our proprietary UltraCell battery platform which is designed exclusively for HID tools to ensure optimal performance and safety. Our platform covers 40+ tools across all categories, so one battery works across your entire HID collection. We do not recommend third-party batteries as they can void warranty and pose safety risks.',
    category: 'product',
  },
  {
    id: 5,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods including UPI (GPay, PhonePe, Paytm), credit and debit cards (Visa, Mastercard, RuPay, Amex), net banking from 50+ banks, EMI on orders above ₹3,000 with zero-cost EMI options via HDFC, ICICI and Bajaj Finserv, and Cash on Delivery for orders below ₹15,000.',
    category: 'payment',
  },
  {
    id: 6,
    question: 'How do I reach customer support?',
    answer: 'Our tool technicians are available 24 hours a day, 7 days a week. You can reach us via live chat on this website (average 90-second response), WhatsApp at +91-XXXXX-XXXXX, phone call, or email at support@hidpowertools.com. For warranty and repair requests, raise a ticket through your account dashboard and we will respond within 2 hours during business hours.',
    category: 'support',
  },
  {
    id: 7,
    question: 'Do you offer bulk or corporate pricing?',
    answer: 'Yes. For orders of 5 or more units, or for construction companies, contractors and enterprises needing fleet-level tooling, we offer custom pricing, dedicated account management, extended warranty packages, and on-site delivery and setup. Contact our sales team at sales@hidpowertools.com or use the Get Bulk Quote button below the pricing section.',
    category: 'payment',
  },
  {
    id: 8,
    question: 'How long does the UltraCell battery last?',
    answer: 'The HID UltraCell battery is rated for 2,000+ full charge cycles before capacity drops below 80%. At daily professional use (1 full charge per day), this translates to over 5 years of service life. The intelligent battery management system also prevents overcharging, overheating and deep discharge, which are the three main causes of early battery death in competing products.',
    category: 'product',
  },
];
// ✅ FILE COMPLETE

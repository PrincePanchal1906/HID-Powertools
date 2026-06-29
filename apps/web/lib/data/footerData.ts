import type { 
  FooterColumn, 
  SocialLink, 
  ContactDetail,
  PaymentMethod 
} from '@hid/types';

export const footerColumns: FooterColumn[] = [
  {
    id: 'shop',
    title: 'Shop',
    links: [
      { label: 'All Power Tools',      href: '/shop'                    },
      { label: 'Drills & Drivers',     href: '/shop/drills'             },
      { label: 'Grinders',             href: '/shop/grinders'           },
      { label: 'Circular Saws',        href: '/shop/saws'               },
      { label: 'Impact Drivers',       href: '/shop/impact-drivers'     },
      { label: 'Batteries & Chargers', href: '/shop/batteries'          },
      { label: 'New Arrivals',         href: '/shop/new', isBadge: true, badgeText: 'New' },
      { label: 'Best Sellers',         href: '/shop/best-sellers'       },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { label: 'About HID',            href: '/about'                   },
      { label: 'Our Story',            href: '/about/story'             },
      { label: 'Careers',              href: '/careers', isBadge: true, badgeText: 'Hiring' },
      { label: 'Press & Media',        href: '/press'                   },
      { label: 'Blog',                 href: '/blog'                    },
      { label: 'Dealer Partnership',   href: '/partners'                },
      { label: 'Bulk & Corporate',     href: '/contact/bulk'            },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    links: [
      { label: 'Help Center',          href: '/help'                    },
      { label: 'Track My Order',       href: '/track'                   },
      { label: 'Returns & Refunds',    href: '/returns'                 },
      { label: 'Warranty Claims',      href: '/warranty'                },
      { label: 'Service Centers',      href: '/service-centers'         },
      { label: 'Product Manuals',      href: '/manuals'                 },
      { label: 'Contact Us',           href: '/contact'                 },
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    links: [
      { label: 'Privacy Policy',       href: '/privacy'                 },
      { label: 'Terms of Service',     href: '/terms'                   },
      { label: 'Cookie Policy',        href: '/cookies'                 },
      { label: 'Refund Policy',        href: '/refund-policy'           },
      { label: 'Shipping Policy',      href: '/shipping-policy'         },
      { label: 'Disclaimer',           href: '/disclaimer'              },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: 'Instagram',
    href: 'https://instagram.com/hidpowertools',
    icon: 'Instagram',
    followers: '24K',
  },
  {
    platform: 'YouTube',
    href: 'https://youtube.com/hidpowertools',
    icon: 'Youtube',
    followers: '18K',
  },
  {
    platform: 'LinkedIn',
    href: 'https://linkedin.com/company/hidpowertools',
    icon: 'Linkedin',
    followers: '8K',
  },
  {
    platform: 'Facebook',
    href: 'https://facebook.com/hidpowertools',
    icon: 'Facebook',
    followers: '31K',
  },
  {
    platform: 'Twitter / X',
    href: 'https://x.com/hidpowertools',
    icon: 'Twitter',
    followers: '5K',
  },
];

export const contactDetails: ContactDetail[] = [
  {
    icon: 'MapPin',
    label: 'Head Office',
    value: 'HID PowerTools Pvt Ltd, GIFT City, Gandhinagar, Gujarat 382355',
    href: 'https://maps.google.com',
  },
  {
    icon: 'Phone',
    label: 'Sales & Support',
    value: '+91 79000 00000',
    href: 'tel:+917900000000',
  },
  {
    icon: 'Mail',
    label: 'Email Us',
    value: 'hello@hidpowertools.com',
    href: 'mailto:hello@hidpowertools.com',
  },
  {
    icon: 'Clock',
    label: 'Support Hours',
    value: '24 hours · 7 days a week',
    href: '',
  },
];

export const paymentMethods: PaymentMethod[] = [
  { name: 'UPI',        src: '/images/payments/upi.png',        width: 48, height: 28 },
  { name: 'Visa',       src: '/images/payments/visa.png',       width: 48, height: 28 },
  { name: 'Mastercard', src: '/images/payments/mastercard.png', width: 48, height: 28 },
  { name: 'RuPay',      src: '/images/payments/rupay.png',      width: 48, height: 28 },
  { name: 'Paytm',      src: '/images/payments/paytm.png',      width: 48, height: 28 },
  { name: 'GPay',       src: '/images/payments/gpay.png',       width: 48, height: 28 },
];

export const footerTagline: string = 'Built by contractors, for contractors. Every tool field-tested before it reaches your hands.';

export const copyrightYear: number = new Date().getFullYear();
// ✅ FILE COMPLETE

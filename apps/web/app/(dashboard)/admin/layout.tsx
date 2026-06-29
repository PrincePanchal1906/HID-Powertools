import Link from 'next/link'
import { requireAdmin } from '@/lib/auth/helpers'
import { LogoutButton } from '@/components/ui/LogoutButton'
import { LayoutDashboard, Package, Tags, ShoppingCart, Users, Settings, User, MonitorPlay } from 'lucide-react'

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  const nav = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
    { name: 'Hero Section', href: '/admin/hero', icon: MonitorPlay },
    { name: 'Offers Section', href: '/admin/offers', icon: ShoppingCart },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'Profile', href: '/admin/profile', icon: User },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-gray-900 text-white hidden md:block">
        <div className="p-6">
          <h2 className="text-lg font-bold text-white">HID Admin</h2>
        </div>
        <nav className="px-4 space-y-1">
          {nav.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-gray-800">
            <LogoutButton />
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

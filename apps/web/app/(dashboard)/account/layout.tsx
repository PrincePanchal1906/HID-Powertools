import Link from 'next/link'
import { requireAuth } from '@/lib/auth/helpers'
import { LogoutButton } from '@/components/ui/LogoutButton'
import { User, Package, MapPin, Shield, Bell } from 'lucide-react'

export default async function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAuth()

  const nav = [
    { name: 'Overview', href: '/account', icon: User },
    { name: 'Profile', href: '/account/profile', icon: User },
    { name: 'Orders', href: '/account/orders', icon: Package },
    { name: 'Addresses', href: '/account/addresses', icon: MapPin },
    { name: 'Security', href: '/account/security', icon: Shield },
    { name: 'Notifications', href: '/account/notifications', icon: Bell },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900">My Account</h2>
        </div>
        <nav className="px-4 space-y-1">
          {nav.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg">
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-gray-100">
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

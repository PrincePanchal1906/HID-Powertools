import React from 'react'
import { HeroProductManager } from '@/components/admin/visual/forms/HeroProductManager'

export const metadata = {
  title: 'Manage Hero | HID Admin',
}

export default function AdminHeroPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Hero Section Manager</h1>
        <p className="text-gray-500 mt-1">Select and order the newly launched products that appear in the homepage Hero carousel.</p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm h-[600px] overflow-hidden">
        {/* We reuse the exact same component built for the drawer, but force it to render by overriding activeDrawer logic or tweaking it */}
        <HeroProductManager forceRender={true} />
      </div>
    </div>
  )
}

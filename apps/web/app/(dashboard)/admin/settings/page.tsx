import React from 'react'
import { getSiteContent } from '@/actions/admin/content'
import { SettingsForm } from '@/components/admin/SettingsForm'

export const metadata = {
  title: 'Settings - HID Admin',
}

export default async function SettingsPage() {
  const [storeSettings, contactInfo] = await Promise.all([
    getSiteContent('store_settings'),
    getSiteContent('contact_info')
  ])

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Global Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage store configuration and contact details.</p>
      </div>

      <SettingsForm 
        initialStoreSettings={storeSettings || {}} 
        initialContactInfo={contactInfo || {}} 
      />
    </div>
  )
}

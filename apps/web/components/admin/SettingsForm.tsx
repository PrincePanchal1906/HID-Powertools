'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { updateSiteContent } from '@/actions/admin/content'
import { Loader2, Save } from 'lucide-react'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
    >
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
      Save Settings
    </button>
  )
}

export function SettingsForm({ initialStoreSettings, initialContactInfo }: { initialStoreSettings: any, initialContactInfo: any }) {
  const handleAction = async (formData: FormData) => {
    const storeSettings = {
      store_name: formData.get('store_name'),
      currency: formData.get('currency'),
      tax_rate: formData.get('tax_rate') ? Number(formData.get('tax_rate')) : 0,
    }
    
    const contactInfo = {
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
    }
    
    await updateSiteContent('store_settings', storeSettings)
    await updateSiteContent('contact_info', contactInfo)
    
    alert("Settings saved successfully!")
  }

  return (
    <form action={handleAction} className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Store Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="store_name" className="text-sm font-medium text-gray-700">Store Name</label>
            <input 
              id="store_name" name="store_name" type="text" defaultValue={initialStoreSettings.store_name}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="currency" className="text-sm font-medium text-gray-700">Currency (Code)</label>
            <input 
              id="currency" name="currency" type="text" defaultValue={initialStoreSettings.currency || 'USD'}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none uppercase"
              maxLength={3}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="tax_rate" className="text-sm font-medium text-gray-700">Default Tax Rate (%)</label>
            <input 
              id="tax_rate" name="tax_rate" type="number" step="0.01" defaultValue={initialStoreSettings.tax_rate}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Contact Details</h3>
        
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Support Email</label>
          <input 
            id="email" name="email" type="email" defaultValue={initialContactInfo.email}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">Support Phone</label>
          <input 
            id="phone" name="phone" type="text" defaultValue={initialContactInfo.phone}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="address" className="text-sm font-medium text-gray-700">Physical Address</label>
          <textarea 
            id="address" name="address" rows={3} defaultValue={initialContactInfo.address}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <SubmitButton />
      </div>
    </form>
  )
}

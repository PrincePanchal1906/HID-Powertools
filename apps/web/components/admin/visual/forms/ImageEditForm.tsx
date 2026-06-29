'use client'

import React, { useState } from 'react'
import { useVisualCMS } from '../VisualCMSProvider'
import { updateSiteContent } from '@/actions/admin/content'
import { Loader2, Save } from 'lucide-react'
import { MediaPicker } from '@/components/admin/media/MediaPicker'

export function ImageEditForm() {
  const { activeDrawer, activeTab: imageKey, content, updateContentState, closeDrawer } = useVisualCMS()
  const [isSaving, setIsSaving] = useState(false)
  
  if (!activeDrawer || !imageKey) return null;

  // activeDrawer is the sectionKey (e.g. 'hero'), activeTab is the specific image key (e.g. 'background_image')
  const sectionContent = content[activeDrawer] || {}
  const currentImageUrl = sectionContent[imageKey] || ''

  const handleImageChange = (url: string | null) => {
    // Optimistic UI update instantly
    updateContentState(activeDrawer, { [imageKey]: url || '' })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const updatedSection = { ...sectionContent, [imageKey]: currentImageUrl }
      await updateSiteContent(activeDrawer, updatedSection)
      closeDrawer()
      alert("Image saved successfully!")
    } catch (e) {
      console.error(e)
      alert("Failed to save image")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-6 flex flex-col h-full">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Change Image</h3>
      <MediaPicker value={currentImageUrl} onChange={handleImageChange} />
      
      <div className="mt-auto pt-6 border-t">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Image
        </button>
      </div>
    </div>
  )
}

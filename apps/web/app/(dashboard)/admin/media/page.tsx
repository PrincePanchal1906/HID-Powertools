import React from 'react'
import { MediaManager } from '@/components/admin/media/MediaManager'

export const metadata = {
  title: 'Media Library - HID Admin',
}

export default function MediaLibraryPage() {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all your product images and CMS assets.</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[600px]">
        <MediaManager bucket="images" folder="" />
      </div>
    </div>
  )
}

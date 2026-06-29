'use client'

import React, { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'
import { useVisualCMS } from './VisualCMSProvider'

interface AdminImageEditWrapperProps {
  sectionKey: string;
  imageKey: string;
  children: React.ReactNode;
  className?: string;
}

export function AdminImageEditWrapper({ sectionKey, imageKey, children, className = '' }: AdminImageEditWrapperProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { openDrawer } = useVisualCMS()

  return (
    <div 
      className={`group ${className || 'relative'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-full h-full ${isHovered ? 'opacity-90 transition-opacity' : 'transition-opacity'}`}>
        {children}
      </div>

      <div 
        className={`absolute inset-0 pointer-events-none border-2 border-blue-500 border-dashed z-50 transition-opacity duration-200 flex items-start justify-end p-4 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // Open drawer with 'image' tab, and pass the specific key we want to edit
            openDrawer(sectionKey, imageKey)
          }}
          className="pointer-events-auto flex items-center gap-2 bg-blue-600 text-white shadow-lg px-4 py-2 rounded-full font-medium hover:bg-blue-700 hover:scale-105 transition-all text-sm"
        >
          <ImageIcon className="w-4 h-4" />
          Change Image
        </button>
      </div>
    </div>
  )
}

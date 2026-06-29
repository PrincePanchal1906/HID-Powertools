'use client'

import React, { useState } from 'react'
import { MediaManager } from './MediaManager'
import { Image as ImageIcon, X } from 'lucide-react'
import Image from 'next/image'

interface MediaPickerProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export function MediaPicker({ value, onChange }: MediaPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {/* Visual Display */}
      {value ? (
        <div className="relative w-full aspect-video md:aspect-square md:w-48 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden group">
          <Image src={value} alt="Selected image" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button 
              type="button" 
              onClick={() => setIsOpen(true)}
              className="p-2 bg-white text-blue-600 rounded-full shadow-sm hover:bg-blue-50 transition-colors"
              title="Change Image"
            >
              <ImageIcon size={18} />
            </button>
            <button 
              type="button" 
              onClick={() => onChange(null)}
              className="p-2 bg-white text-red-600 rounded-full shadow-sm hover:bg-red-50 transition-colors"
              title="Remove Image"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center w-full aspect-video md:aspect-square md:w-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors"
        >
          <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm font-medium text-gray-500">Select Image</span>
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold">Select Media</h3>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden p-0 relative h-[60vh]">
              <MediaManager 
                bucket="images" 
                folder="" 
                className="border-0 rounded-none h-full"
                onSelect={(url) => {
                  onChange(url)
                  setIsOpen(false)
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

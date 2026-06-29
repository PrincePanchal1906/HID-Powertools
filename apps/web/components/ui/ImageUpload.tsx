"use client";

import React, { useState } from 'react'
import { UploadCloud, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value: string | null
  onChange: (url: string | null) => void
  bucket?: string
  folder?: string
}

export function ImageUpload({ value, onChange, bucket = 'products', folder = 'general' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('File must be an image')
      return
    }

    setIsUploading(true)
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', bucket)
      formData.append('folder', folder)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Upload failed')
      
      onChange(data.url)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsUploading(false)
    }
  }

  if (value) {
    return (
      <div className="relative w-full aspect-video md:aspect-square md:w-48 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden group">
        <Image src={value} alt="Uploaded image" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            type="button" 
            onClick={() => onChange(null)}
            className="p-2 bg-white text-red-600 rounded-full shadow-sm hover:bg-red-50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <label className={`flex flex-col items-center justify-center w-full aspect-video md:aspect-square md:w-48 bg-gray-50 rounded-xl border-2 border-dashed transition-colors cursor-pointer
        ${error ? 'border-red-300 hover:border-red-400 bg-red-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}
      `}>
        {isUploading ? (
          <div className="flex flex-col items-center gap-2 text-blue-600">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm font-medium">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <UploadCloud className="w-8 h-8" />
            <span className="text-sm font-medium text-center px-4">Click to upload<br />image</span>
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  )
}

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { uploadMedia, listMedia, deleteMedia } from '@/actions/admin/media'
import { Loader2, UploadCloud, Trash2, Check, Copy, Search, RefreshCw } from 'lucide-react'
import Image from 'next/image'

export interface MediaFile {
  id: string;
  name: string;
  path: string;
  url: string;
  created_at: string;
  metadata?: any;
}

interface MediaManagerProps {
  onSelect?: (url: string) => void;
  bucket?: string;
  folder?: string;
  className?: string;
}

export function MediaManager({ onSelect, bucket = 'images', folder = '', className = '' }: MediaManagerProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchMedia = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await listMedia(bucket, folder)
      if (res.error) throw new Error(res.error)
      setFiles(res.data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [bucket, folder])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.')
      return
    }

    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', bucket)
      if (folder) formData.append('folder', folder)

      const res = await uploadMedia(formData)
      if (res.error) throw new Error(res.error)
      
      await fetchMedia()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (path: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm("Are you sure you want to delete this image? This action cannot be undone.")) return;
    
    setLoading(true)
    try {
      const res = await deleteMedia(bucket, path)
      if (res.error) throw new Error(res.error)
      await fetchMedia()
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleCopyUrl = (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(url)
    alert("URL copied to clipboard")
  }

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className={`flex flex-col h-full bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}>
      
      {/* Header Controls */}
      <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search media..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white"
            />
          </div>
          <button 
            onClick={fetchMedia}
            disabled={loading}
            className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading && !uploading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleUpload}
            disabled={uploading}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 m-4 mb-0 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {/* Grid */}
      <div className="flex-1 p-4 overflow-y-auto min-h-[300px]">
        {loading && files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p>Loading media library...</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 border-2 border-dashed border-gray-200 rounded-xl m-4 p-8">
            <UploadCloud className="w-12 h-12 mb-3 text-gray-300" />
            <p className="font-medium text-gray-600">No images found</p>
            <p className="text-sm mt-1">Upload an image or adjust your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredFiles.map((file) => (
              <div 
                key={file.id} 
                className={`relative group aspect-square rounded-xl border overflow-hidden cursor-pointer bg-gray-100 ${onSelect ? 'hover:border-blue-500 hover:ring-2 hover:ring-blue-200' : 'hover:border-gray-300'}`}
                onClick={() => onSelect && onSelect(file.url)}
              >
                <Image 
                  src={file.url} 
                  alt={file.name} 
                  fill 
                  className="object-cover transition-transform group-hover:scale-105" 
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-end">
                  <div className="truncate text-xs text-white max-w-[70%] font-medium" title={file.name}>
                    {file.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={(e) => handleCopyUrl(file.url, e)}
                      className="p-1.5 bg-white/20 hover:bg-white/40 rounded text-white backdrop-blur-sm transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={(e) => handleDelete(file.path, e)}
                      className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded text-white backdrop-blur-sm transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                
                {onSelect && (
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white text-blue-600 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Select
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

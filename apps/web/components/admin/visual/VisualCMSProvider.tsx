'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { ImageEditForm } from './forms/ImageEditForm'
import { HeroProductManager } from './forms/HeroProductManager'
import { ProductListManager } from './forms/ProductListManager'

interface VisualCMSContextType {
  activeDrawer: string | null;
  activeTab: string | null;
  openDrawer: (id: string, tab?: string) => void;
  closeDrawer: () => void;
  content: Record<string, any>;
  updateContentState: (key: string, newContent: any) => void;
}

const VisualCMSContext = createContext<VisualCMSContextType | undefined>(undefined)

export function VisualCMSProvider({ 
  children, 
  initialContent = {} 
}: { 
  children: React.ReactNode;
  initialContent?: Record<string, any>;
}) {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [content, setContent] = useState<Record<string, any>>(initialContent)

  const openDrawer = (id: string, tab: string = 'content') => {
    setActiveDrawer(id)
    setActiveTab(tab)
  }
  const closeDrawer = () => {
    setActiveDrawer(null)
    setActiveTab(null)
  }

  const updateContentState = (key: string, newContent: any) => {
    setContent(prev => ({
      ...prev,
      [key]: { ...prev[key], ...newContent }
    }))
  }

  return (
    <VisualCMSContext.Provider value={{ activeDrawer, activeTab, openDrawer, closeDrawer, content, updateContentState }}>
      {children}
      
      {/* Drawer Container */}
      {activeDrawer && (
        <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl border-l border-gray-200 z-[100] animate-in slide-in-from-right flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Edit {activeDrawer}</h2>
            <button 
              onClick={closeDrawer}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto bg-gray-50/50">
            {/* Generic Image Editor for the current section & key */}
            <div id="visual-cms-drawer-root" className="h-full">
              {activeDrawer === 'hero_manager' ? (
                <HeroProductManager />
              ) : activeDrawer === 'offers_manager' ? (
                <ProductListManager sectionKey="offers" title="Manage Offers of the Week" />
              ) : (
                <ImageEditForm />
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Backdrop */}
      {activeDrawer && (
        <div 
          className="fixed inset-0 bg-black/20 z-[90] animate-in fade-in" 
          onClick={closeDrawer}
        />
      )}
    </VisualCMSContext.Provider>
  )
}

export function useVisualCMS() {
  const context = useContext(VisualCMSContext)
  if (context === undefined) {
    throw new Error('useVisualCMS must be used within a VisualCMSProvider')
  }
  return context
}

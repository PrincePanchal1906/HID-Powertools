'use client'

import React, { useState } from 'react'

export interface EditButtonConfig {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface AdminEditWrapperProps {
  sectionId: string;
  children: React.ReactNode;
  className?: string;
  buttons: EditButtonConfig[];
}

export function AdminEditWrapper({ children, className = '', buttons }: AdminEditWrapperProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The actual customer-facing component */}
      <div className={isHovered ? 'opacity-90 transition-opacity' : 'transition-opacity'}>
        {children}
      </div>

      {/* Admin Hover Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none border-2 border-blue-500 border-dashed z-50 transition-opacity duration-200 flex items-start justify-end p-4 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex gap-2 pointer-events-auto bg-white/90 backdrop-blur shadow-lg p-2 rounded-xl border border-gray-200">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                btn.action()
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium hover:scale-105 transition-all text-sm ${
                btn.variant === 'secondary' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 
                'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

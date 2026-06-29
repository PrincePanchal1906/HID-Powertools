import React from "react"

export function AuthCard({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle?: string }) {
  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

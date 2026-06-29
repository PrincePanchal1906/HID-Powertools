'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { login } from '@/actions/auth/auth'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? <LoadingSpinner /> : 'Sign In'}
    </button>
  )
}

export function LoginForm() {
  const [state, action] = useFormState(login, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
          {state.error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          id="email"
          type="email" 
          name="email" 
          required 
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input 
            id="password"
            type={showPassword ? "text" : "password"}
            name="password" 
            required 
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
            placeholder="••••••••"
          />
          <button 
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <input id="remember" type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
      </div>

      <SubmitButton />

      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{' '}
        <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
          Sign up
        </Link>
      </p>
    </form>
  )
}

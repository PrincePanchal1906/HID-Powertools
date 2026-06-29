'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { resetPassword } from '@/actions/auth/auth'
import { LoadingSpinner } from '../ui/LoadingSpinner'
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
      {pending ? <LoadingSpinner /> : 'Update Password'}
    </button>
  )
}

export function ResetPasswordForm() {
  const [state, action] = useFormState(resetPassword, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
        <div className="relative">
          <input 
            id="password"
            type={showPassword ? "text" : "password"}
            name="password" 
            required 
            minLength={8}
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
        <p className="text-xs text-gray-500 mt-1">At least 8 characters, 1 uppercase, 1 number</p>
      </div>

      <div>
        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
        <div className="relative">
          <input 
            id="confirm_password"
            type={showPassword ? "text" : "password"}
            name="confirm_password" 
            required 
            minLength={8}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
            placeholder="••••••••"
          />
        </div>
      </div>

      <SubmitButton />
    </form>
  )
}

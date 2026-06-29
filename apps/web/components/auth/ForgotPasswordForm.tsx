'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { forgotPassword } from '@/actions/auth/auth'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import Link from 'next/link'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? <LoadingSpinner /> : 'Send Reset Link'}
    </button>
  )
}

export function ForgotPasswordForm() {
  const [state, action] = useFormState(forgotPassword, null)

  if (state?.success) {
    return (
      <div className="text-center space-y-4">
        <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200">
          We've sent a password reset link to your email. Please check your inbox.
        </div>
        <Link href="/login" className="block text-sm font-semibold text-blue-600 hover:text-blue-500">
          Return to login
        </Link>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
          {state.error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          name="email" 
          required 
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
          placeholder="you@example.com"
        />
      </div>

      <SubmitButton />

      <p className="text-center text-sm text-gray-600 mt-6">
        Remember your password?{' '}
        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
          Log in
        </Link>
      </p>
    </form>
  )
}

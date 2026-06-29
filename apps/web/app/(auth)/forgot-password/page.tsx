import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"
import { AuthCard } from "@/components/auth/AuthCard"

export const metadata = {
  title: "Forgot Password - HID Power Tools",
}

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthCard title="Reset your password" subtitle="Enter your email and we'll send you a recovery link.">
        <ForgotPasswordForm />
      </AuthCard>
    </main>
  )
}

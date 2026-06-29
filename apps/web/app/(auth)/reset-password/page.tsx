import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"
import { AuthCard } from "@/components/auth/AuthCard"

export const metadata = {
  title: "Reset Password - HID Power Tools",
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthCard title="Set new password" subtitle="Please enter your new password below.">
        <ResetPasswordForm />
      </AuthCard>
    </main>
  )
}

import { SignupForm } from "@/components/auth/SignupForm"
import { AuthCard } from "@/components/auth/AuthCard"

export const metadata = {
  title: "Create Account - HID Power Tools",
  description: "Create an account to track orders and save your information.",
}

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthCard title="Create an account" subtitle="Join us today to manage your tools and orders.">
        <SignupForm />
      </AuthCard>
    </main>
  )
}

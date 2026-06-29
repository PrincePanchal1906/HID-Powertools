import { LoginForm } from "@/components/auth/LoginForm"
import { AuthCard } from "@/components/auth/AuthCard"

export const metadata = {
  title: "Log In - HID Power Tools",
  description: "Log in to your account to manage your orders and profile.",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthCard title="Welcome back" subtitle="Please enter your details to sign in.">
        <LoginForm />
      </AuthCard>
    </main>
  )
}

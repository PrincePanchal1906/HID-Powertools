import { getCurrentProfile } from "@/lib/auth/helpers"

export default async function AccountOverviewPage() {
  const profile = await getCurrentProfile()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Overview</h1>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Welcome back, {profile?.full_name || 'Customer'}!</h2>
        <p className="text-gray-600">You are logged in as <span className="font-medium text-gray-900">{profile?.email}</span>.</p>
      </div>
    </div>
  )
}

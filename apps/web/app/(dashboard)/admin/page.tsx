import { getCurrentProfile } from "@/lib/auth/helpers"

export default async function AdminOverviewPage() {
  await getCurrentProfile()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Total Sales</h2>
          <p className="text-3xl font-bold text-gray-900">$0.00</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Active Orders</h2>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Total Customers</h2>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>
    </div>
  )
}

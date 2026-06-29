import { ProductListManager } from "@/components/admin/visual/forms/ProductListManager";

export const metadata = {
  title: 'Manage Offers of the Week - HID Admin',
}

export default function OffersAdminPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-6rem)]">
      <ProductListManager 
        sectionKey="offers" 
        title="Manage Offers of the Week" 
      />
    </div>
  )
}

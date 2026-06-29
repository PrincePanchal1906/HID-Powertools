'use client'

import { useTransition } from "react"
import { logout } from "@/actions/auth/auth"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => logout())}
      disabled={isPending}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full text-left transition-colors"
    >
      <LogOut className="w-4 h-4" />
      {isPending ? "Logging out..." : "Log out"}
    </button>
  )
}

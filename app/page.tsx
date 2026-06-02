"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/auth-store"

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, role, _hasHydrated } = useAuthStore()

  useEffect(() => {
    if (!_hasHydrated) return
    
    if (isAuthenticated && role) {
      router.replace(`/${role}/dashboard`)
    } else {
      router.replace("/login")
    }
  }, [isAuthenticated, role, router, _hasHydrated])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

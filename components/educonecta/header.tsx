"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bell, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logo } from "./logo"
import { useAuthStore } from "@/lib/store/auth-store"
import { cn } from "@/lib/utils"

interface HeaderProps {
  title?: string
  showBack?: boolean
  showLogo?: boolean
  showNotifications?: boolean
  showMenu?: boolean
  className?: string
}

export function Header({
  title,
  showBack = false,
  showLogo = false,
  showNotifications = true,
  showMenu = true,
  className,
}: HeaderProps) {
  const router = useRouter()
  const { user, logout, role } = useAuthStore()

  const initials = user?.nome
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?"

  const dashboardPath = role === "professor" ? "/professor/dashboard" : "/aluno/dashboard"

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-card px-4",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {showBack && (
          <Link
            href={dashboardPath}
            className="inline-flex items-center justify-center shrink-0 h-10 w-10 rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Voltar</span>
          </Link>
        )}
        {showLogo && <Logo size="sm" />}
        {title && (
          <h1 className="text-lg font-semibold truncate">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-1">
        {showNotifications && (
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => router.push("/notificacoes")}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            <span className="sr-only">Notificações</span>
          </Button>
        )}

        {showMenu && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.nome} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Menu do usuário</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user?.nome}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/${role}/perfil`)}
              >
                Meu Perfil
              </DropdownMenuItem>
              {role === "professor" && (
                <DropdownMenuItem
                  onClick={() => router.push("/professor/certificados")}
                >
                  Meus Certificados
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => router.push(`/${role}/configuracoes`)}
              >
                Configuracoes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive"
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}

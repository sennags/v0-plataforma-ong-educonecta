"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Search,
  MessageSquare,
  User,
  Users,
  BookOpen,
  ClipboardList,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/store/auth-store"

const alunoNavItems = [
  { href: "/aluno/dashboard", label: "Início", icon: Home },
  { href: "/aluno/buscar", label: "Buscar", icon: Search },
  { href: "/aluno/mensagens", label: "Mensagens", icon: MessageSquare },
  { href: "/aluno/perfil", label: "Perfil", icon: User },
]

const professorNavItems = [
  { href: "/professor/dashboard", label: "Início", icon: Home },
  { href: "/professor/solicitacoes", label: "Solicitações", icon: ClipboardList },
  { href: "/professor/alunos", label: "Alunos", icon: Users },
  { href: "/professor/aulas", label: "Aulas", icon: BookOpen },
  { href: "/professor/mensagens", label: "Mensagens", icon: MessageSquare },
]

export function BottomNav() {
  const pathname = usePathname()
  const { role } = useAuthStore()

  const navItems = role === "professor" ? professorNavItems : alunoNavItems

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card pb-safe">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-3 py-2 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

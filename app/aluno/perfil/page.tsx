"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { BottomNav } from "@/components/educonecta/bottom-nav"
import { MetricsBlock } from "@/components/educonecta/metrics-block"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuthStore, useAluno } from "@/lib/store/auth-store"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  LogOut,
  ChevronRight,
  Settings,
  HelpCircle,
  FileText,
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function PerfilAlunoPage() {
  const router = useRouter()
  const { logout } = useAuthStore()
  const aluno = useAluno()

  if (!aluno) {
    router.replace("/login")
    return null
  }

  const initials = aluno.nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const menuItems = [
    { icon: Settings, label: "Configurações", href: "/aluno/configuracoes" },
    { icon: HelpCircle, label: "Ajuda e Suporte", href: "/aluno/ajuda" },
    { icon: FileText, label: "Termos de Uso", href: "/termos" },
  ]

  return (
    <div className="min-h-screen pb-20">
      <Header title="Meu Perfil" showLogo />

      <main className="p-4 space-y-6">
        {/* Perfil header */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-3">
            <AvatarImage src={aluno.avatar} alt={aluno.nome} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {initials}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-xl font-bold">{aluno.nome}</h1>
          <p className="text-sm text-muted-foreground">{aluno.email}</p>
          {aluno.serie && aluno.escola && (
            <p className="text-sm text-muted-foreground">
              {aluno.serie} - {aluno.escola}
            </p>
          )}
        </div>

        {/* Métricas */}
        <section>
          <h2 className="mb-3 font-semibold">Meu desempenho</h2>
          <MetricsBlock metricas={aluno.metricas} />
        </section>

        <Separator />

        {/* Informações pessoais */}
        <section>
          <h2 className="mb-3 font-semibold">Informações pessoais</h2>
          <Card>
            <CardContent className="divide-y p-0">
              <div className="flex items-center gap-3 p-4">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">CPF</p>
                  <p className="text-sm">{aluno.cpf}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Data de Nascimento
                  </p>
                  <p className="text-sm">
                    {format(new Date(aluno.dataNascimento), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm">{aluno.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Telefone</p>
                  <p className="text-sm">{aluno.telefone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Endereço</p>
                  <p className="text-sm">
                    {aluno.endereco.rua}, {aluno.endereco.numero}
                    {aluno.endereco.complemento && ` - ${aluno.endereco.complemento}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {aluno.endereco.bairro} - {aluno.endereco.cidade}/{aluno.endereco.estado}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Menu */}
        <section>
          <Card>
            <CardContent className="divide-y p-0">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair da conta
        </Button>
      </main>

      <BottomNav />
    </div>
  )
}

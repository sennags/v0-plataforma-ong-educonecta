"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { BottomNav } from "@/components/educonecta/bottom-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RatingStars } from "@/components/educonecta/rating-stars"
import { 
  Mail, 
  Phone, 
  GraduationCap, 
  BookOpen,
  Clock,
  Star,
  Users,
  Edit,
  LogOut,
  Bell,
  Shield,
  HelpCircle
} from "lucide-react"
import { useProfessor, useAuthStore } from "@/lib/store/auth-store"
import { toast } from "sonner"

export default function PerfilProfessorPage() {
  const router = useRouter()
  const professor = useProfessor()
  const { logout } = useAuthStore()
  const [notificacoes, setNotificacoes] = useState(true)

  if (!professor) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
    toast.success("Logout realizado com sucesso!")
  }

  const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header showLogo showNotifications showMenu={false} />

      <main className="px-4 py-4 space-y-4">
        {/* Card do Perfil */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={professor.avatar} />
                <AvatarFallback className="text-xl">
                  {professor.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-xl font-semibold">{professor.nome}</h1>
                <p className="text-sm text-muted-foreground">{professor.formacao}</p>
                <div className="flex items-center gap-2 mt-2">
                  <RatingStars value={professor.avaliacaoMedia || 4.8} size="sm" />
                  <span className="text-sm font-medium">{professor.avaliacaoMedia || 4.8}</span>
                </div>
                <Badge 
                  variant="secondary" 
                  className="mt-2 bg-success/10 text-success"
                >
                  Voluntário Ativo
                </Badge>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => router.push("/professor/editar-perfil")}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <Users className="h-5 w-5 mx-auto text-primary mb-1" />
              <p className="text-lg font-semibold">{professor.alunosAtivos || 5}</p>
              <p className="text-xs text-muted-foreground">Alunos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Clock className="h-5 w-5 mx-auto text-primary mb-1" />
              <p className="text-lg font-semibold">{professor.horasVoluntariado || 48}</p>
              <p className="text-xs text-muted-foreground">Horas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Star className="h-5 w-5 mx-auto text-primary mb-1" />
              <p className="text-lg font-semibold">{professor.totalAvaliacoes || 12}</p>
              <p className="text-xs text-muted-foreground">Avaliações</p>
            </CardContent>
          </Card>
        </div>

        {/* Informações */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">E-mail</p>
                <p className="text-sm">{professor.email}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Formação</p>
                <p className="text-sm">{professor.formacao}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Matérias</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {professor.materias.map((materia) => (
                    <Badge key={materia} variant="secondary" className="text-xs">
                      {materia}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disponibilidade */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Disponibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {diasSemana.map((dia, idx) => {
                const disponivel = professor.disponibilidade?.[idx]?.length > 0
                return (
                  <Badge 
                    key={dia}
                    variant={disponivel ? "default" : "secondary"}
                    className={disponivel ? "" : "opacity-50"}
                  >
                    {dia}
                  </Badge>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Clique em &quot;Editar Perfil&quot; para alterar sua disponibilidade
            </p>
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="notificacoes" className="cursor-pointer">
                  Notificações
                </Label>
              </div>
              <Switch
                id="notificacoes"
                checked={notificacoes}
                onCheckedChange={setNotificacoes}
              />
            </div>
            <Separator />
            <button 
              className="flex items-center gap-3 w-full text-left"
              onClick={() => router.push("/professor/privacidade")}
            >
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Privacidade e Segurança</span>
            </button>
            <Separator />
            <button 
              className="flex items-center gap-3 w-full text-left"
              onClick={() => router.push("/ajuda")}
            >
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Ajuda e Suporte</span>
            </button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair da Conta
        </Button>
      </main>

      <BottomNav role="professor" />
    </div>
  )
}

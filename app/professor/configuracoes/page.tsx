"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuthStore, useProfessor } from "@/lib/store/auth-store"
import { toast } from "sonner"
import {
  Bell,
  Moon,
  Sun,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
  Trash2,
  Clock,
  Award,
} from "lucide-react"
import Link from "next/link"

export default function ConfiguracoesProfessorPage() {
  const router = useRouter()
  const { logout } = useAuthStore()
  const professor = useProfessor()

  const [notificacoesSolicitacoes, setNotificacoesSolicitacoes] = useState(true)
  const [notificacoesAulas, setNotificacoesAulas] = useState(true)
  const [notificacoesMensagens, setNotificacoesMensagens] = useState(true)
  const [disponivel, setDisponivel] = useState(true)
  const [temaEscuro, setTemaEscuro] = useState(false)

  useEffect(() => {
    if (!professor) {
      router.replace("/login")
    }
  }, [professor, router])

  if (!professor) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleDeleteAccount = () => {
    toast.error("Esta funcionalidade ainda nao esta disponivel")
  }

  const handleDisponibilidadeChange = (checked: boolean) => {
    setDisponivel(checked)
    toast.success(
      checked
        ? "Voce esta disponivel para novas solicitacoes"
        : "Voce esta indisponivel temporariamente"
    )
  }

  return (
    <div className="min-h-screen pb-6 bg-background">
      <Header title="Configuracoes" showBack />

      <main className="p-4 space-y-4">
        {/* Disponibilidade */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-5 w-5" />
              Disponibilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="disponivel">Disponivel para aulas</Label>
                <p className="text-sm text-muted-foreground">
                  Desative para pausar novas solicitacoes
                </p>
              </div>
              <Switch
                id="disponivel"
                checked={disponivel}
                onCheckedChange={handleDisponibilidadeChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notificacoes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-5 w-5" />
              Notificacoes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-solicitacoes" className="flex-1">
                Novas solicitacoes
              </Label>
              <Switch
                id="notif-solicitacoes"
                checked={notificacoesSolicitacoes}
                onCheckedChange={setNotificacoesSolicitacoes}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-aulas" className="flex-1">
                Lembretes de aulas
              </Label>
              <Switch
                id="notif-aulas"
                checked={notificacoesAulas}
                onCheckedChange={setNotificacoesAulas}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-mensagens" className="flex-1">
                Novas mensagens
              </Label>
              <Switch
                id="notif-mensagens"
                checked={notificacoesMensagens}
                onCheckedChange={setNotificacoesMensagens}
              />
            </div>
          </CardContent>
        </Card>

        {/* Aparencia */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              {temaEscuro ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              Aparencia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="tema-escuro" className="flex-1">
                Tema escuro
              </Label>
              <Switch
                id="tema-escuro"
                checked={temaEscuro}
                onCheckedChange={setTemaEscuro}
              />
            </div>
          </CardContent>
        </Card>

        {/* Links uteis */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <HelpCircle className="h-5 w-5" />
              Ajuda e informacoes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/professor/certificados"
              className="flex items-center gap-3 py-2 text-sm hover:text-primary"
            >
              <Award className="h-4 w-4" />
              Meus Certificados
            </Link>
            <Link
              href="/termos"
              className="flex items-center gap-3 py-2 text-sm hover:text-primary"
            >
              <FileText className="h-4 w-4" />
              Termos de Uso
            </Link>
            <Link
              href="/privacidade"
              className="flex items-center gap-3 py-2 text-sm hover:text-primary"
            >
              <Shield className="h-4 w-4" />
              Politica de Privacidade
            </Link>
          </CardContent>
        </Card>

        <Separator />

        {/* Acoes da conta */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair da conta
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleDeleteAccount}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir minha conta
          </Button>
        </div>
      </main>
    </div>
  )
}

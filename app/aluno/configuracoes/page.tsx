"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { BottomNav } from "@/components/educonecta/bottom-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuthStore, useAluno } from "@/lib/store/auth-store"
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
} from "lucide-react"
import Link from "next/link"

export default function ConfiguracoesAlunoPage() {
  const router = useRouter()
  const { logout } = useAuthStore()
  const aluno = useAluno()

  const [notificacoesAulas, setNotificacoesAulas] = useState(true)
  const [notificacoesMensagens, setNotificacoesMensagens] = useState(true)
  const [notificacoesPromocoes, setNotificacoesPromocoes] = useState(false)
  const [temaEscuro, setTemaEscuro] = useState(false)

  useEffect(() => {
    if (!aluno) {
      router.replace("/login")
    }
  }, [aluno, router])

  if (!aluno) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleDeleteAccount = () => {
    toast.error("Esta funcionalidade ainda nao esta disponivel")
  }

  return (
    <div className="min-h-screen pb-20 bg-background">
      <Header title="Configuracoes" showBack />

      <main className="p-4 space-y-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-promocoes" className="flex-1">
                Novidades e dicas
              </Label>
              <Switch
                id="notif-promocoes"
                checked={notificacoesPromocoes}
                onCheckedChange={setNotificacoesPromocoes}
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
              Ajuda
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
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

      <BottomNav />
    </div>
  )
}

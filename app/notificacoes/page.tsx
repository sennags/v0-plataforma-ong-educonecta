"use client"

import { useState } from "react"
import { Header } from "@/components/educonecta/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  MessageSquare, 
  Calendar, 
  CheckCircle, 
  Star,
  BookOpen,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Notificacao {
  id: string
  tipo: "mensagem" | "aula" | "solicitacao" | "avaliacao" | "sistema"
  titulo: string
  descricao: string
  lida: boolean
  data: Date
}

const notificacoesMock: Notificacao[] = [
  {
    id: "1",
    tipo: "mensagem",
    titulo: "Nova mensagem",
    descricao: "Prof. Carlos enviou uma mensagem sobre sua duvida de matematica",
    lida: false,
    data: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    tipo: "aula",
    titulo: "Aula confirmada",
    descricao: "Sua aula de Portugues foi confirmada para amanha as 14h",
    lida: false,
    data: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "3",
    tipo: "solicitacao",
    titulo: "Solicitacao aceita",
    descricao: "Prof. Ana aceitou sua solicitacao de ajuda em Historia",
    lida: true,
    data: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "4",
    tipo: "avaliacao",
    titulo: "Avalie sua aula",
    descricao: "Como foi sua aula de Matematica com Prof. Carlos?",
    lida: true,
    data: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "5",
    tipo: "sistema",
    titulo: "Bem-vindo ao EduConecta!",
    descricao: "Complete seu perfil para encontrar os melhores professores",
    lida: true,
    data: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
]

const iconePorTipo = {
  mensagem: MessageSquare,
  aula: Calendar,
  solicitacao: CheckCircle,
  avaliacao: Star,
  sistema: Bell,
}

const corPorTipo = {
  mensagem: "bg-blue-100 text-blue-600",
  aula: "bg-green-100 text-green-600",
  solicitacao: "bg-purple-100 text-purple-600",
  avaliacao: "bg-yellow-100 text-yellow-600",
  sistema: "bg-gray-100 text-gray-600",
}

export default function NotificacoesPage() {
  const [notificacoes, setNotificacoes] = useState(notificacoesMock)
  const [tab, setTab] = useState("todas")

  const naoLidas = notificacoes.filter((n) => !n.lida)
  const notificacoesFiltradas = tab === "nao-lidas" ? naoLidas : notificacoes

  const marcarComoLida = (id: string) => {
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    )
  }

  const marcarTodasComoLidas = () => {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })))
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <Header title="Notificacoes" showBack showNotifications={false} />

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {naoLidas.length} nao lida{naoLidas.length !== 1 && "s"}
          </p>
          {naoLidas.length > 0 && (
            <Button variant="ghost" size="sm" onClick={marcarTodasComoLidas}>
              Marcar todas como lidas
            </Button>
          )}
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full">
            <TabsTrigger value="todas" className="flex-1">
              Todas
            </TabsTrigger>
            <TabsTrigger value="nao-lidas" className="flex-1">
              Nao lidas ({naoLidas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="mt-4 space-y-3">
            {notificacoesFiltradas.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                  <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  {tab === "nao-lidas"
                    ? "Nenhuma notificacao nao lida"
                    : "Nenhuma notificacao"}
                </p>
              </div>
            ) : (
              notificacoesFiltradas.map((notificacao) => {
                const Icone = iconePorTipo[notificacao.tipo]
                const corIcone = corPorTipo[notificacao.tipo]

                return (
                  <Card
                    key={notificacao.id}
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-accent/50",
                      !notificacao.lida && "border-primary/30 bg-primary/5"
                    )}
                    onClick={() => marcarComoLida(notificacao.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                            corIcone
                          )}
                        >
                          <Icone className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={cn(
                                "font-medium",
                                !notificacao.lida && "text-primary"
                              )}
                            >
                              {notificacao.titulo}
                            </p>
                            {!notificacao.lida && (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-primary mt-2" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {notificacao.descricao}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(notificacao.data, {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

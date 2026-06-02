"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { BottomNav } from "@/components/educonecta/bottom-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { conversasMock, getProfessorById, getAlunoById } from "@/lib/data/mock-data"
import { useAuthStore } from "@/lib/store/auth-store"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function MensagensProfessorPage() {
  const router = useRouter()
  const { user, role } = useAuthStore()

  // Conversas do usuário
  const conversas = conversasMock.filter((c) =>
    c.participantes.includes(user?.id || "")
  )

  return (
    <div className="min-h-screen pb-20">
      <Header title="Mensagens" showLogo />

      <main className="p-4">
        {conversas.length > 0 ? (
          <div className="space-y-3">
            {conversas.map((conversa) => {
              const outroParticipanteId = conversa.participantes.find(
                (p) => p !== user?.id
              )
              const outroParticipante =
                getProfessorById(outroParticipanteId || "") ||
                getAlunoById(outroParticipanteId || "")

              const ultimaMensagem =
                conversa.mensagens[conversa.mensagens.length - 1]
              const naoLidas = conversa.mensagens.filter(
                (m) => !m.lida && m.destinatarioId === user?.id
              ).length

              const initials = outroParticipante?.nome
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()

              return (
                <Card
                  key={conversa.id}
                  className="cursor-pointer transition-all hover:shadow-md"
                  onClick={() =>
                    router.push(`/${role}/chat/${outroParticipanteId}`)
                  }
                >
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={outroParticipante?.avatar}
                          alt={outroParticipante?.nome}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      {naoLidas > 0 && (
                        <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                          {naoLidas}
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">
                          {outroParticipante?.nome}
                        </h3>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {formatDistanceToNow(new Date(ultimaMensagem.criadaEm), {
                            addSuffix: false,
                            locale: ptBR,
                          })}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${
                          naoLidas > 0
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {ultimaMensagem.remetenteId === user?.id && "Você: "}
                        {ultimaMensagem.conteudo}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <span className="text-2xl">💬</span>
            </div>
            <h2 className="text-lg font-semibold">Nenhuma mensagem</h2>
            <p className="text-sm text-muted-foreground">
              Suas conversas com alunos aparecerão aqui
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}

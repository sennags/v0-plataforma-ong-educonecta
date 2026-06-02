"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { BottomNav } from "@/components/educonecta/bottom-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { solicitacoesMock, getMateriaById } from "@/lib/data/mock-data"
import { ChevronRight } from "lucide-react"

export default function AlunosPage() {
  const router = useRouter()

  // Alunos únicos das solicitações aceitas/em andamento
  const alunosAtivos = solicitacoesMock
    .filter((s) => s.status === "aceita" || s.status === "em_andamento")
    .map((s) => ({
      ...s.aluno,
      materia: s.materia,
      solicitacaoId: s.id,
    }))

  return (
    <div className="min-h-screen pb-20">
      <Header title="Meus Alunos" showLogo />

      <main className="p-4">
        {alunosAtivos.length > 0 ? (
          <div className="space-y-3">
            {alunosAtivos.map((aluno) => {
              const materia = getMateriaById(aluno.materia)
              const initials = aluno.nome
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()

              return (
                <Card
                  key={aluno.id}
                  className="cursor-pointer transition-all hover:shadow-md"
                  onClick={() =>
                    router.push(`/professor/solicitacao/${aluno.solicitacaoId}`)
                  }
                >
                  <CardContent className="flex items-center gap-3 p-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={aluno.avatar} alt={aluno.nome} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{aluno.nome}</h3>
                      <p className="text-sm text-muted-foreground">
                        {aluno.serie}
                      </p>
                      {materia && (
                        <Badge
                          variant="secondary"
                          className="mt-1"
                          style={{
                            backgroundColor: `${materia.cor}15`,
                            color: materia.cor,
                          }}
                        >
                          {materia.nome}
                        </Badge>
                      )}
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <span className="text-2xl">📚</span>
            </div>
            <h2 className="text-lg font-semibold">Nenhum aluno ainda</h2>
            <p className="text-sm text-muted-foreground">
              Aceite solicitações para começar a ajudar alunos
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}

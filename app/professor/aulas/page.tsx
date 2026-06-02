"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { BottomNav } from "@/components/educonecta/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { aulasMock, getMateriaById, getAlunoById } from "@/lib/data/mock-data"
import { useAuthStore } from "@/lib/store/auth-store"
import { Calendar, Clock, Video, MapPin, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function AulasPage() {
  const router = useRouter()
  const { user } = useAuthStore()

  // Aulas do professor
  const aulasDoProf = aulasMock.filter((a) => a.professorId === user?.id)
  const aulasAgendadas = aulasDoProf.filter((a) => a.status === "agendada")
  const aulasConcluidas = aulasDoProf.filter((a) => a.status === "concluida")

  const renderAulaCard = (aula: (typeof aulasMock)[0]) => {
    const materia = getMateriaById(aula.materia)
    const aluno = getAlunoById(aula.alunoId)

    return (
      <Card
        key={aula.id}
        className="cursor-pointer transition-all hover:shadow-md"
        onClick={() => router.push(`/professor/aula/${aula.id}`)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {materia && (
                <Badge
                  variant="secondary"
                  style={{
                    backgroundColor: `${materia.cor}15`,
                    color: materia.cor,
                  }}
                >
                  {materia.nome}
                </Badge>
              )}
              <Badge
                variant="secondary"
                className={
                  aula.status === "agendada"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }
              >
                {aula.status === "agendada" ? "Agendada" : "Concluída"}
              </Badge>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="font-semibold mb-2">Aula com {aluno?.nome || "Aluno"}</p>

          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {format(new Date(aula.dataHora), "EEEE, dd/MM/yyyy", {
                  locale: ptBR,
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {format(new Date(aula.dataHora), "HH:mm", { locale: ptBR })} -{" "}
                {aula.duracao} minutos
              </span>
            </div>
            <div className="flex items-center gap-2">
              {aula.modalidade === "online" ? (
                <>
                  <Video className="h-4 w-4" />
                  <span>Online</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4" />
                  <span>Presencial</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <Header title="Minhas Aulas" showLogo />

      <main className="p-4">
        <Tabs defaultValue="agendadas">
          <TabsList className="w-full">
            <TabsTrigger value="agendadas" className="flex-1">
              Agendadas ({aulasAgendadas.length})
            </TabsTrigger>
            <TabsTrigger value="concluidas" className="flex-1">
              Concluídas ({aulasConcluidas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agendadas" className="mt-4 space-y-3">
            {aulasAgendadas.length > 0 ? (
              aulasAgendadas.map(renderAulaCard)
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhuma aula agendada
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="concluidas" className="mt-4 space-y-3">
            {aulasConcluidas.length > 0 ? (
              aulasConcluidas.map(renderAulaCard)
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhuma aula concluída
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  )
}

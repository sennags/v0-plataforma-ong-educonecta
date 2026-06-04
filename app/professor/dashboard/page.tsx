"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { BottomNav } from "@/components/educonecta/bottom-nav"
import { StudentCard } from "@/components/educonecta/student-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuthStore, useProfessor } from "@/lib/store/auth-store"
import { solicitacoesMock, aulasMock } from "@/lib/data/mock-data"
import { Users, BookOpen, Clock, ChevronRight, Calendar } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function ProfessorDashboardPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const professor = useProfessor()

  useEffect(() => {
    if (!isAuthenticated || !professor) {
      router.replace("/login")
    }
  }, [isAuthenticated, professor, router])

  if (!isAuthenticated || !professor) {
    return null
  }

  // Solicitações pendentes
  const solicitacoesPendentes = solicitacoesMock.filter(
    (s) => s.status === "pendente"
  )

  // Aulas do professor
  const aulasAgendadas = aulasMock.filter(
    (a) => a.professorId === professor.id && a.status === "agendada"
  )

  // Estatísticas
  const stats = [
    {
      icon: Users,
      label: "Alunos atendidos",
      value: professor.totalAulas,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: BookOpen,
      label: "Aulas realizadas",
      value: professor.totalAulas,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Clock,
      label: "Solicitações",
      value: solicitacoesPendentes.length,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
  ]

  return (
    <div className="min-h-screen pb-20">
      <Header showLogo />

      <main className="p-4 space-y-6">
        {/* Saudação */}
        <div>
          <h1 className="text-2xl font-bold">
            Olá, {professor.nome.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            Você está fazendo a diferença na educação
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex flex-col items-center p-3 text-center">
                <div
                  className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${stat.bgColor}`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Próxima aula */}
        {aulasAgendadas.length > 0 && (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">Próxima Aula</h2>
            </div>
            {aulasAgendadas.slice(0, 1).map((aula) => (
              <Card
                key={aula.id}
                className="cursor-pointer bg-primary text-primary-foreground"
                onClick={() => router.push(`/professor/aula/${aula.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{aula.materia}</p>
                      <p className="text-sm opacity-90">
                        com Aluno
                      </p>
                      <p className="text-sm opacity-75">
                        {format(
                          new Date(aula.dataHora),
                          "EEEE, dd/MM 'às' HH:mm",
                          { locale: ptBR }
                        )}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 opacity-75" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {/* Solicitações pendentes */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              Solicitações
              {solicitacoesPendentes.length > 0 && (
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  {solicitacoesPendentes.length} novas
                </Badge>
              )}
            </h2>
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => router.push("/professor/solicitacoes")}
            >
              Ver todas
            </Button>
          </div>

          {solicitacoesPendentes.length > 0 ? (
            <div className="space-y-3">
              {solicitacoesPendentes.slice(0, 3).map((solicitacao) => (
                <StudentCard
                  key={solicitacao.id}
                  solicitacao={solicitacao}
                  onClick={() =>
                    router.push(`/professor/solicitacao/${solicitacao.id}`)
                  }
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">
                  Nenhuma solicitação pendente
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

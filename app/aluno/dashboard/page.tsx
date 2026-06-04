"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { BottomNav } from "@/components/educonecta/bottom-nav"
import { SubjectCard } from "@/components/educonecta/subject-card"
import { TeacherCard } from "@/components/educonecta/teacher-card"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore, useAluno } from "@/lib/store/auth-store"
import { materias, professoresMock, aulasMock } from "@/lib/data/mock-data"
import { Calendar, ChevronRight, Search, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"

export default function AlunoDashboardPage() {
  const router = useRouter()
  const { isAuthenticated, _hasHydrated } = useAuthStore()
  const aluno = useAluno()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (_hasHydrated) {
      if (!isAuthenticated || !aluno) {
        router.replace("/login")
      }
      setIsChecking(false)
    }
  }, [_hasHydrated, isAuthenticated, aluno, router])

  if (!_hasHydrated || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated || !aluno) {
    return null
  }

  // Aulas agendadas do aluno
  const aulasAgendadas = aulasMock.filter(
    (a) => a.alunoId === aluno.id && a.status === "agendada"
  )

  // Professores recomendados (baseado nas matérias de interesse)
  const professoresRecomendados = professoresMock.filter((p) =>
    p.materias.some((m) => aluno.materiasInteresse.includes(m))
  )

  return (
    <div className="min-h-screen pb-20">
      <Header showLogo />

      <main className="p-4 space-y-6">
        {/* Saudação */}
        <div>
          <h1 className="text-2xl font-bold">
            Olá, {aluno.nome.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            O que você quer aprender hoje?
          </p>
        </div>

        {/* Busca rápida */}
        <div
          className="flex items-center w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground cursor-pointer hover:bg-accent"
          onClick={() => router.push("/aluno/buscar")}
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar matéria ou professor...
        </div>

        {/* Próxima aula */}
        {aulasAgendadas.length > 0 && (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">Próxima Aula</h2>
            </div>
            {aulasAgendadas.slice(0, 1).map((aula) => {
              const professor = professoresMock.find(
                (p) => p.id === aula.professorId
              )
              return (
                <Card
                  key={aula.id}
                  className="cursor-pointer bg-primary text-primary-foreground"
                  onClick={() => router.push(`/aluno/aula/${aula.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{aula.materia}</p>
                        <p className="text-sm opacity-90">
                          com {professor?.nome}
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
              )
            })}
          </section>
        )}

        {/* Matérias */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Escolha uma matéria</h2>
            <Link
              href="/aluno/buscar"
              className="text-sm text-primary hover:underline"
            >
              Ver todas
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {materias.slice(0, 6).map((materia) => (
              <SubjectCard
                key={materia.id}
                materia={materia}
                onClick={() => router.push(`/aluno/materia/${materia.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Professores recomendados */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Professores para você</h2>
            <Link
              href="/aluno/professores"
              className="text-sm text-primary hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="space-y-3">
            {professoresRecomendados.slice(0, 2).map((professor) => (
              <TeacherCard key={professor.id} professor={professor} />
            ))}
          </div>
        </section>

        
      </main>

      <BottomNav />
    </div>
  )
}

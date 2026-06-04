"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { BottomNav } from "@/components/educonecta/bottom-nav"
import { SubjectCard } from "@/components/educonecta/subject-card"
import { TeacherCard } from "@/components/educonecta/teacher-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore, useAluno } from "@/lib/store/auth-store"
import { materias, professoresMock, aulasMock } from "@/lib/data/mock-data"
import { BookOpen, Calendar, ChevronRight, Search } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"

export default function AlunoDashboardPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const aluno = useAluno()

  // Redireciona se não autenticado
  useEffect(() => {
    if (!isAuthenticated || !aluno) {
      router.replace("/login")
    }
  }, [isAuthenticated, aluno, router])

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
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground"
          onClick={() => router.push("/aluno/buscar")}
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar matéria ou professor...
        </Button>

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

        {/* CTA: Preciso de ajuda */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Precisa de ajuda?</p>
                <p className="text-sm text-muted-foreground">
                  Descreva sua dúvida e encontre um professor
                </p>
              </div>
            </div>
            <Button
              className="mt-3 w-full"
              onClick={() => router.push("/aluno/buscar")}
            >
              Pedir ajuda agora
            </Button>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}

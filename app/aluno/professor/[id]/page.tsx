"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { RatingStars } from "@/components/educonecta/rating-stars"
import { AvailabilityGrid } from "@/components/educonecta/availability-grid"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getProfessorById, getMateriaById } from "@/lib/data/mock-data"
import {
  BookOpen,
  GraduationCap,
  MessageSquare,
  Calendar,
  Clock,
} from "lucide-react"

export default function ProfessorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()

  const professor = getProfessorById(id)

  if (!professor) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <p className="text-muted-foreground">Professor não encontrado</p>
        <Button variant="link" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    )
  }

  const initials = professor.nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className="min-h-screen pb-24">
      <Header showBack />

      <main className="p-4 space-y-6">
        {/* Perfil header */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-3">
            <AvatarImage src={professor.avatar} alt={professor.nome} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {initials}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-xl font-bold">{professor.nome}</h1>
          <p className="text-sm text-muted-foreground">{professor.formacao}</p>

          <div className="mt-2 flex items-center gap-2">
            <RatingStars rating={professor.avaliacao} size="sm" />
            <span className="font-medium">{professor.avaliacao}</span>
            <span className="text-sm text-muted-foreground">
              ({professor.totalAulas} aulas)
            </span>
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {professor.materias.map((materiaId) => {
              const materia = getMateriaById(materiaId)
              return materia ? (
                <Badge
                  key={materiaId}
                  variant="secondary"
                  style={{
                    backgroundColor: `${materia.cor}15`,
                    color: materia.cor,
                  }}
                >
                  {materia.nome}
                </Badge>
              ) : null
            })}
          </div>
        </div>

        <Separator />

        {/* Bio */}
        <section>
          <h2 className="mb-2 font-semibold flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Sobre
          </h2>
          <p className="text-sm text-muted-foreground">{professor.bio}</p>
        </section>

        {/* Experiência */}
        <Card>
          <CardContent className="grid grid-cols-2 gap-4 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold">{professor.experiencia}</p>
                <p className="text-xs text-muted-foreground">de experiência</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-bold">{professor.totalAulas}</p>
                <p className="text-xs text-muted-foreground">aulas realizadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metodologia */}
        {professor.metodologia && (
          <section>
            <h2 className="mb-2 font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Metodologia
            </h2>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  {professor.metodologia}
                </p>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Disponibilidade */}
        <section>
          <h2 className="mb-2 font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Disponibilidade
          </h2>
          <Card>
            <CardContent className="p-4">
              <AvailabilityGrid
                disponibilidade={professor.disponibilidade}
                readOnly
              />
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Botões fixos */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-card p-4 pb-safe">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.push(`/aluno/chat/${professor.id}`)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Mensagem
          </Button>
          <Button
            className="flex-1"
            onClick={() => router.push(`/aluno/materia/matematica`)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Pedir aula
          </Button>
        </div>
      </div>
    </div>
  )
}

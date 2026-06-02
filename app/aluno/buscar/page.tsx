"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { BottomNav } from "@/components/educonecta/bottom-nav"
import { TeacherCard } from "@/components/educonecta/teacher-card"
import { SubjectCard } from "@/components/educonecta/subject-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { professoresMock, materias } from "@/lib/data/mock-data"
import { Search, X } from "lucide-react"

export default function BuscarPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMateria, setSelectedMateria] = useState<string | null>(null)

  // Filtra professores
  const professoresFiltrados = professoresMock.filter((professor) => {
    const matchSearch =
      searchTerm === "" ||
      professor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.materias.some((m) =>
        m.toLowerCase().includes(searchTerm.toLowerCase())
      )

    const matchMateria =
      selectedMateria === null || professor.materias.includes(selectedMateria)

    return matchSearch && matchMateria
  })

  return (
    <div className="min-h-screen pb-20">
      <Header title="Buscar" showBack />

      <main className="p-4 space-y-6">
        {/* Campo de busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar professor ou matéria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filtros de matéria */}
        <div className="space-y-3">
          <h2 className="font-semibold">Filtrar por matéria</h2>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedMateria === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedMateria(null)}
            >
              Todas
            </Badge>
            {materias.map((materia) => (
              <Badge
                key={materia.id}
                variant={selectedMateria === materia.id ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() =>
                  setSelectedMateria(
                    selectedMateria === materia.id ? null : materia.id
                  )
                }
                style={
                  selectedMateria === materia.id
                    ? { backgroundColor: materia.cor }
                    : {}
                }
              >
                {materia.nome}
              </Badge>
            ))}
          </div>
        </div>

        {/* Matérias (quando não há busca) */}
        {!searchTerm && !selectedMateria && (
          <section>
            <h2 className="mb-3 font-semibold">Escolha uma matéria</h2>
            <div className="grid grid-cols-3 gap-3">
              {materias.map((materia) => (
                <SubjectCard
                  key={materia.id}
                  materia={materia}
                  onClick={() => router.push(`/aluno/materia/${materia.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Lista de professores */}
        <section>
          <h2 className="mb-3 font-semibold">
            Professores disponíveis ({professoresFiltrados.length})
          </h2>
          {professoresFiltrados.length > 0 ? (
            <div className="space-y-3">
              {professoresFiltrados.map((professor) => (
                <TeacherCard key={professor.id} professor={professor} />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>Nenhum professor encontrado</p>
              <p className="text-sm">Tente ajustar os filtros</p>
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

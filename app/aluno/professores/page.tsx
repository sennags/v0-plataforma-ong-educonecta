"use client"

import { Header } from "@/components/educonecta/header"
import { BottomNav } from "@/components/educonecta/bottom-nav"
import { TeacherCard } from "@/components/educonecta/teacher-card"
import { professoresMock } from "@/lib/data/mock-data"

export default function ProfessoresPage() {
  return (
    <div className="min-h-screen pb-20">
      <Header title="Professores Disponíveis" showBack />

      <main className="p-4">
        <p className="mb-4 text-sm text-muted-foreground">
          {professoresMock.length} professores disponíveis para ajudar você
        </p>

        <div className="space-y-3">
          {professoresMock.map((professor) => (
            <TeacherCard key={professor.id} professor={professor} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

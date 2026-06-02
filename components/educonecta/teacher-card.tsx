"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { RatingStars } from "./rating-stars"
import { cn } from "@/lib/utils"
import type { Professor } from "@/lib/types"
import { getMateriaById } from "@/lib/data/mock-data"

interface TeacherCardProps {
  professor: Professor
  onClick?: () => void
  className?: string
}

export function TeacherCard({ professor, onClick, className }: TeacherCardProps) {
  const router = useRouter()

  const initials = professor.nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(`/aluno/professor/${professor.id}`)
    }
  }

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md active:scale-[0.98]",
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-14 w-14 shrink-0">
            <AvatarImage src={professor.avatar} alt={professor.nome} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{professor.nome}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {professor.formacao}
            </p>

            <div className="mt-1.5 flex items-center gap-2">
              <RatingStars rating={professor.avaliacao} size="sm" />
              <span className="text-sm font-medium">{professor.avaliacao}</span>
              <span className="text-xs text-muted-foreground">
                ({professor.totalAulas} aulas)
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              {professor.materias.slice(0, 3).map((materiaId) => {
                const materia = getMateriaById(materiaId)
                return materia ? (
                  <Badge
                    key={materiaId}
                    variant="secondary"
                    className="text-xs"
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
        </div>
      </CardContent>
    </Card>
  )
}

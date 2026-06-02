"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Materia } from "@/lib/types"
import {
  Calculator,
  BookOpen,
  Atom,
  FlaskConical,
  Leaf,
  Landmark,
  Globe,
  Languages,
  PenTool,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  calculator: Calculator,
  "book-open": BookOpen,
  atom: Atom,
  "flask-conical": FlaskConical,
  leaf: Leaf,
  landmark: Landmark,
  globe: Globe,
  languages: Languages,
  "pen-tool": PenTool,
}

interface SubjectCardProps {
  materia: Materia
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function SubjectCard({
  materia,
  selected = false,
  onClick,
  className,
}: SubjectCardProps) {
  const Icon = iconMap[materia.icone] || BookOpen

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md active:scale-[0.98]",
        selected && "ring-2 ring-primary ring-offset-2",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center p-4 text-center">
        <div
          className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${materia.cor}20` }}
        >
          <Icon className="h-6 w-6" style={{ color: materia.cor }} />
        </div>
        <span className="text-sm font-medium">{materia.nome}</span>
      </CardContent>
    </Card>
  )
}

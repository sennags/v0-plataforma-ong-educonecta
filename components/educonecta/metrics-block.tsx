"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { MetricasAluno } from "@/lib/types"
import { BookOpen, CheckCircle, Calendar, Sparkles } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface MetricsBlockProps {
  metricas: MetricasAluno
  className?: string
}

export function MetricsBlock({ metricas, className }: MetricsBlockProps) {
  const items = [
    {
      icon: BookOpen,
      label: "Total de Aulas",
      value: metricas.totalAulas,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: CheckCircle,
      label: "Taxa de Presença",
      value: `${metricas.taxaPresenca}%`,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Calendar,
      label: "Última Aula",
      value: metricas.ultimaAula
        ? format(new Date(metricas.ultimaAula), "dd/MM/yyyy", { locale: ptBR })
        : "Nenhuma",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
  ]

  return (
    <div className={cn("space-y-3", className)}>
      {metricas.primeiraVez && (
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="flex items-center gap-3 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-accent">Primeira vez pedindo ajuda</p>
              <p className="text-sm text-muted-foreground">
                Este aluno ainda não teve aulas na plataforma
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <Card key={item.label}>
            <CardContent className="flex flex-col items-center p-3 text-center">
              <div
                className={cn(
                  "mb-2 flex h-10 w-10 items-center justify-center rounded-full",
                  item.bgColor
                )}
              >
                <item.icon className={cn("h-5 w-5", item.color)} />
              </div>
              <p className="text-lg font-bold">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

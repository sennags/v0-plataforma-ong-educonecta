"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Solicitacao } from "@/lib/types"
import { getMateriaById } from "@/lib/data/mock-data"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, AlertTriangle, Sparkles } from "lucide-react"

interface StudentCardProps {
  solicitacao: Solicitacao
  onClick?: () => void
  className?: string
}

const urgenciaConfig = {
  baixa: { label: "Baixa", color: "bg-green-100 text-green-700" },
  media: { label: "Média", color: "bg-amber-100 text-amber-700" },
  alta: { label: "Alta", color: "bg-red-100 text-red-700", icon: AlertTriangle },
}

export function StudentCard({ solicitacao, onClick, className }: StudentCardProps) {
  const { aluno } = solicitacao
  const materia = getMateriaById(solicitacao.materia)
  const urgencia = urgenciaConfig[solicitacao.urgencia]

  const initials = aluno.nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const tempoDecorrido = formatDistanceToNow(new Date(solicitacao.criadaEm), {
    addSuffix: true,
    locale: ptBR,
  })

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarImage src={aluno.avatar} alt={aluno.nome} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold truncate">{aluno.nome}</h3>
                <p className="text-sm text-muted-foreground">
                  {aluno.serie} - {aluno.escola}
                </p>
              </div>
              {aluno.metricas.primeiraVez && (
                <Badge
                  variant="secondary"
                  className="shrink-0 bg-accent/10 text-accent gap-1"
                >
                  <Sparkles className="h-3 w-3" />
                  Primeira vez
                </Badge>
              )}
            </div>

            <div className="mt-2 flex items-center gap-2 flex-wrap">
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
                className={cn("gap-1", urgencia.color)}
              >
                {urgencia.icon && <urgencia.icon className="h-3 w-3" />}
                Urgência: {urgencia.label}
              </Badge>
            </div>

            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {solicitacao.descricao}
            </p>

            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{tempoDecorrido}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

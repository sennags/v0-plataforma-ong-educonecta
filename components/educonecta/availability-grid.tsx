"use client"

import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"
import type { Disponibilidade } from "@/lib/types"

interface AvailabilityGridProps {
  disponibilidade: Disponibilidade
  onChange?: (disponibilidade: Disponibilidade) => void
  readOnly?: boolean
  className?: string
}

const dias = [
  { key: "segunda", label: "Seg" },
  { key: "terca", label: "Ter" },
  { key: "quarta", label: "Qua" },
  { key: "quinta", label: "Qui" },
  { key: "sexta", label: "Sex" },
  { key: "sabado", label: "Sáb" },
  { key: "domingo", label: "Dom" },
]

const periodos = [
  { key: "manha", label: "Manhã", time: "8h-12h" },
  { key: "tarde", label: "Tarde", time: "13h-17h" },
  { key: "noite", label: "Noite", time: "18h-22h" },
]

export function AvailabilityGrid({
  disponibilidade,
  onChange,
  readOnly = false,
  className,
}: AvailabilityGridProps) {
  const handleToggle = (dia: string, periodo: string) => {
    if (readOnly || !onChange) return

    const currentValue = disponibilidade[dia]?.[periodo as keyof typeof disponibilidade[typeof dia]] ?? false

    onChange({
      ...disponibilidade,
      [dia]: {
        ...disponibilidade[dia],
        [periodo]: !currentValue,
      },
    })
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="min-w-[320px]">
        {/* Header - dias da semana */}
        <div className="mb-2 grid grid-cols-8 gap-1">
          <div className="h-8" /> {/* Célula vazia para alinhar */}
          {dias.map((dia) => (
            <div
              key={dia.key}
              className="flex h-8 items-center justify-center text-xs font-medium text-muted-foreground"
            >
              {dia.label}
            </div>
          ))}
        </div>

        {/* Linhas - períodos */}
        {periodos.map((periodo) => (
          <div key={periodo.key} className="mb-1 grid grid-cols-8 gap-1">
            <div className="flex flex-col items-start justify-center pr-2">
              <span className="text-xs font-medium">{periodo.label}</span>
              <span className="text-[10px] text-muted-foreground">
                {periodo.time}
              </span>
            </div>
            {dias.map((dia) => {
              const isAvailable =
                disponibilidade[dia.key]?.[periodo.key as keyof typeof disponibilidade[typeof dia.key]] ?? false

              return readOnly ? (
                <div
                  key={`${dia.key}-${periodo.key}`}
                  className={cn(
                    "flex h-10 items-center justify-center rounded-md border text-xs transition-colors",
                    isAvailable
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-muted/50 text-muted-foreground"
                  )}
                >
                  {isAvailable ? "Sim" : "-"}
                </div>
              ) : (
                <Toggle
                  key={`${dia.key}-${periodo.key}`}
                  pressed={isAvailable}
                  onPressedChange={() => handleToggle(dia.key, periodo.key)}
                  className={cn(
                    "h-10 border data-[state=on]:border-primary/30 data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
                  )}
                  aria-label={`${dia.label} - ${periodo.label}`}
                >
                  {isAvailable ? "Sim" : "-"}
                </Toggle>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

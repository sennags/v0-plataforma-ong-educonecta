"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, CheckCircle } from "lucide-react"

export default function AguardandoPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"buscando" | "encontrado">("buscando")

  useEffect(() => {
    // Simula progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setStatus("encontrado")
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const handleVerProfessores = () => {
    router.push("/aluno/professores")
  }

  return (
    <div className="min-h-screen">
      <Header title="Aguardando" showBack />

      <main className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center p-6">
        {status === "buscando" ? (
          <div className="w-full max-w-sm space-y-8 text-center">
            {/* Animação de busca */}
            <div className="relative mx-auto h-32 w-32">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
              <div className="absolute inset-4 animate-ping rounded-full bg-primary/30 animation-delay-150" />
              <div className="absolute inset-8 flex items-center justify-center rounded-full bg-primary">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-bold">Buscando professores...</h1>
              <p className="text-sm text-muted-foreground">
                Estamos procurando os melhores professores disponíveis para ajudar você
              </p>
            </div>

            <Progress value={progress} className="h-2" />

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Tempo estimado: menos de 1 minuto</span>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-8 text-center">
            {/* Sucesso */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-bold">Professores encontrados!</h1>
              <p className="text-sm text-muted-foreground">
                Encontramos 4 professores disponíveis para ajudar você
              </p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-sm font-medium text-primary"
                        >
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      +4 disponíveis
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" onClick={handleVerProfessores}>
              Ver professores disponíveis
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

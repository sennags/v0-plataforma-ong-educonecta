"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RatingStars } from "@/components/educonecta/rating-stars"
import { toast } from "sonner"
import { CheckCircle2 } from "lucide-react"
import { professoresMock } from "@/lib/data/mock-data"

interface PageProps {
  params: Promise<{ id: string }>
}

const criteriosAvaliacao = [
  { id: "didatica", label: "Didática e clareza nas explicações" },
  { id: "pontualidade", label: "Pontualidade nas aulas" },
  { id: "paciencia", label: "Paciência e atenção ao aluno" },
  { id: "conhecimento", label: "Domínio do conteúdo" },
  { id: "disponibilidade", label: "Disponibilidade para tirar dúvidas" },
]

export default function AvaliarProfessorPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [avaliacoes, setAvaliacoes] = useState<Record<string, number>>({})
  const [comentario, setComentario] = useState("")
  const [enviado, setEnviado] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const professor = professoresMock.find(p => p.id === id) || professoresMock[0]
  
  const handleAvaliar = (criterioId: string, valor: number) => {
    setAvaliacoes(prev => ({ ...prev, [criterioId]: valor }))
  }

  const mediaAvaliacao = () => {
    const valores = Object.values(avaliacoes)
    if (valores.length === 0) return 0
    return valores.reduce((a, b) => a + b, 0) / valores.length
  }

  const todosAvaliados = criteriosAvaliacao.every(c => avaliacoes[c.id] !== undefined)

  const handleEnviar = async () => {
    if (!todosAvaliados) {
      toast.error("Por favor, avalie todos os critérios")
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setEnviado(true)
    setIsLoading(false)
    toast.success("Avaliação enviada com sucesso!")
  }

  if (enviado) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Avaliação" showBack />
        <main className="flex flex-col items-center justify-center px-4 py-12">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-xl font-semibold text-center mb-2">
            Avaliação Enviada!
          </h1>
          <p className="text-muted-foreground text-center mb-6 max-w-xs">
            Obrigado por avaliar o professor. Seu feedback é muito importante para a plataforma.
          </p>
          <Button onClick={() => router.push("/aluno/dashboard")}>
            Voltar ao início
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      <Header title="Avaliar Professor" showBack />

      <main className="px-4 py-4 space-y-4">
        {/* Professor */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={professor.avatar} />
                <AvatarFallback>{professor.nome[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="font-semibold">{professor.nome}</h2>
                <p className="text-sm text-muted-foreground">{professor.formacao}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {professor.materias.join(", ")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instruções */}
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm text-muted-foreground">
            Avalie cada critério de 1 a 5 estrelas. Sua avaliação é anônima e ajuda a melhorar a qualidade do ensino.
          </p>
        </div>

        {/* Critérios */}
        <div className="space-y-4">
          {criteriosAvaliacao.map((criterio) => (
            <Card key={criterio.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">{criterio.label}</Label>
                  <RatingStars
                    value={avaliacoes[criterio.id] || 0}
                    onChange={(valor) => handleAvaliar(criterio.id, valor)}
                    size="lg"
                    interactive
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comentário */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="comentario">Comentário (opcional)</Label>
              <Textarea
                id="comentario"
                placeholder="Deixe um comentário sobre sua experiência com o professor..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Resumo */}
        {todosAvaliados && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Média da avaliação</p>
                  <p className="text-xs text-muted-foreground">
                    Baseada em {criteriosAvaliacao.length} critérios
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <RatingStars value={mediaAvaliacao()} size="sm" />
                  <span className="font-semibold">{mediaAvaliacao().toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Botão */}
        <Button 
          className="w-full" 
          size="lg"
          onClick={handleEnviar}
          disabled={!todosAvaliados || isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar Avaliação"}
        </Button>
      </main>
    </div>
  )
}

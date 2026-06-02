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
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { CheckCircle2, ChevronRight } from "lucide-react"
import { alunosMock } from "@/lib/data/mock-data"

interface PageProps {
  params: Promise<{ id: string }>
}

const criteriosAvaliacao = [
  { id: "participacao", label: "Participação nas aulas" },
  { id: "dedicacao", label: "Dedicação aos estudos" },
  { id: "pontualidade", label: "Pontualidade nas entregas" },
  { id: "evolucao", label: "Evolução no aprendizado" },
  { id: "comunicacao", label: "Comunicação e respeito" },
]

interface AvaliacaoAluno {
  alunoId: string
  avaliacoes: Record<string, number>
  comentario: string
  concluida: boolean
}

export default function AvaliarAlunosPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [alunoAtual, setAlunoAtual] = useState(0)
  const [avaliacoesAlunos, setAvaliacoesAlunos] = useState<AvaliacaoAluno[]>(
    alunosMock.map(a => ({
      alunoId: a.id,
      avaliacoes: {},
      comentario: "",
      concluida: false
    }))
  )
  const [enviado, setEnviado] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const aluno = alunosMock[alunoAtual]
  const avaliacaoAtual = avaliacoesAlunos[alunoAtual]
  
  const handleAvaliar = (criterioId: string, valor: number) => {
    setAvaliacoesAlunos(prev => prev.map((av, idx) => 
      idx === alunoAtual 
        ? { ...av, avaliacoes: { ...av.avaliacoes, [criterioId]: valor } }
        : av
    ))
  }

  const handleComentario = (texto: string) => {
    setAvaliacoesAlunos(prev => prev.map((av, idx) => 
      idx === alunoAtual ? { ...av, comentario: texto } : av
    ))
  }

  const mediaAvaliacao = () => {
    const valores = Object.values(avaliacaoAtual.avaliacoes)
    if (valores.length === 0) return 0
    return valores.reduce((a, b) => a + b, 0) / valores.length
  }

  const todosAvaliados = criteriosAvaliacao.every(c => avaliacaoAtual.avaliacoes[c.id] !== undefined)
  const todasAvaliacoesConcluidas = avaliacoesAlunos.every(a => a.concluida)

  const handleProximo = () => {
    if (!todosAvaliados) {
      toast.error("Por favor, avalie todos os critérios")
      return
    }

    setAvaliacoesAlunos(prev => prev.map((av, idx) => 
      idx === alunoAtual ? { ...av, concluida: true } : av
    ))

    if (alunoAtual < alunosMock.length - 1) {
      setAlunoAtual(prev => prev + 1)
    }
  }

  const handleEnviar = async () => {
    if (!todosAvaliados) {
      toast.error("Por favor, avalie todos os critérios")
      return
    }

    // Marca o último como concluído
    setAvaliacoesAlunos(prev => prev.map((av, idx) => 
      idx === alunoAtual ? { ...av, concluida: true } : av
    ))

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setEnviado(true)
    setIsLoading(false)
    toast.success("Avaliações enviadas com sucesso!")
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
            Avaliações Enviadas!
          </h1>
          <p className="text-muted-foreground text-center mb-6 max-w-xs">
            Obrigado por avaliar seus alunos. Seu feedback ajuda a acompanhar o progresso de cada um.
          </p>
          <Button onClick={() => router.push("/professor/dashboard")}>
            Voltar ao início
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      <Header title="Avaliar Alunos" showBack />

      <main className="px-4 py-4 space-y-4">
        {/* Progresso */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {alunosMock.map((a, idx) => (
            <button
              key={a.id}
              onClick={() => setAlunoAtual(idx)}
              className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                idx === alunoAtual 
                  ? "border-primary bg-primary/5" 
                  : avaliacoesAlunos[idx].concluida 
                    ? "border-success/30 bg-success/5"
                    : "border-border"
              }`}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={a.avatar} />
                <AvatarFallback className="text-xs">{a.nome[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium truncate max-w-[80px]">
                {a.nome.split(" ")[0]}
              </span>
              {avaliacoesAlunos[idx].concluida && (
                <CheckCircle2 className="h-4 w-4 text-success" />
              )}
            </button>
          ))}
        </div>

        {/* Aluno Atual */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={aluno.avatar} />
                <AvatarFallback>{aluno.nome[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="font-semibold">{aluno.nome}</h2>
                <p className="text-sm text-muted-foreground">{aluno.escola}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {aluno.serie}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {alunoAtual + 1} de {alunosMock.length}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instruções */}
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm text-muted-foreground">
            Avalie cada critério de 1 a 5 estrelas. Esta avaliação ajuda a acompanhar o progresso do aluno.
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
                    value={avaliacaoAtual.avaliacoes[criterio.id] || 0}
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
                placeholder="Deixe um comentário sobre o desempenho do aluno..."
                value={avaliacaoAtual.comentario}
                onChange={(e) => handleComentario(e.target.value)}
                className="min-h-[80px] resize-none"
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

        {/* Botões */}
        {alunoAtual < alunosMock.length - 1 ? (
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleProximo}
            disabled={!todosAvaliados}
          >
            Próximo Aluno
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleEnviar}
            disabled={!todosAvaliados || isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Todas Avaliações"}
          </Button>
        )}
      </main>
    </div>
  )
}

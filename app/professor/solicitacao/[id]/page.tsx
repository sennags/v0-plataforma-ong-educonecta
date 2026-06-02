"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Header } from "@/components/educonecta/header"
import { MetricsBlock } from "@/components/educonecta/metrics-block"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { solicitacoesMock, getMateriaById } from "@/lib/data/mock-data"
import {
  MessageSquare,
  Calendar,
  CheckCircle,
  X,
  Loader2,
  Video,
  MapPin,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function SolicitacaoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [showAcceptDialog, setShowAcceptDialog] = useState(false)
  const [modalidade, setModalidade] = useState<"online" | "presencial">("online")
  const [isLoading, setIsLoading] = useState(false)

  const solicitacao = solicitacoesMock.find((s) => s.id === id)

  if (!solicitacao) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <p className="text-muted-foreground">Solicitação não encontrada</p>
        <Button variant="link" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    )
  }

  const { aluno } = solicitacao
  const materia = getMateriaById(solicitacao.materia)

  const initials = aluno.nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const urgenciaConfig = {
    baixa: { label: "Baixa", color: "bg-green-100 text-green-700" },
    media: { label: "Média", color: "bg-amber-100 text-amber-700" },
    alta: { label: "Alta", color: "bg-red-100 text-red-700" },
  }

  const urgencia = urgenciaConfig[solicitacao.urgencia]

  const handleAccept = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.success("Solicitação aceita! Aula agendada.")
    setShowAcceptDialog(false)
    router.push("/professor/dashboard")
    setIsLoading(false)
  }

  const handleReject = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.info("Solicitação recusada")
    router.push("/professor/dashboard")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen pb-24">
      <Header title="Detalhes da Solicitação" showBack />

      <main className="p-4 space-y-6">
        {/* Aluno info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={aluno.avatar} alt={aluno.nome} />
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="font-semibold">{aluno.nome}</h2>
                <p className="text-sm text-muted-foreground">
                  {aluno.serie} - {aluno.escola}
                </p>
                <p className="text-xs text-muted-foreground">
                  Solicitado{" "}
                  {formatDistanceToNow(new Date(solicitacao.criadaEm), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas do aluno */}
        <section>
          <h3 className="mb-3 font-semibold">Histórico do aluno</h3>
          <MetricsBlock metricas={aluno.metricas} />
        </section>

        <Separator />

        {/* Detalhes da solicitação */}
        <section>
          <h3 className="mb-3 font-semibold">Sobre a solicitação</h3>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
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
                <Badge variant="secondary" className={urgencia.color}>
                  Urgência: {urgencia.label}
                </Badge>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Descrição do problema:</p>
                <p className="text-sm text-muted-foreground">
                  {solicitacao.descricao}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Botões fixos */}
      {solicitacao.status === "pendente" && (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-card p-4 pb-safe">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleReject}
              disabled={isLoading}
            >
              <X className="mr-2 h-4 w-4" />
              Recusar
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push(`/professor/chat/${aluno.id}`)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Mensagem
            </Button>
            <Button
              className="flex-1"
              onClick={() => setShowAcceptDialog(true)}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Aceitar
            </Button>
          </div>
        </div>
      )}

      {/* Dialog de aceitar */}
      <Dialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aceitar solicitação</DialogTitle>
            <DialogDescription>
              Escolha a modalidade da aula para {aluno.nome}
            </DialogDescription>
          </DialogHeader>

          <RadioGroup
            value={modalidade}
            onValueChange={(value) =>
              setModalidade(value as "online" | "presencial")
            }
            className="space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="online" id="online" />
              <Label
                htmlFor="online"
                className="flex flex-1 cursor-pointer items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Online</p>
                  <p className="text-sm text-muted-foreground">
                    Via Google Meet ou similar
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <RadioGroupItem value="presencial" id="presencial" />
              <Label
                htmlFor="presencial"
                className="flex flex-1 cursor-pointer items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Presencial</p>
                  <p className="text-sm text-muted-foreground">
                    Em local a combinar
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAcceptDialog(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button onClick={handleAccept} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

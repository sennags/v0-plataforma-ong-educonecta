"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Video, 
  FileText, 
  MessageSquare, 
  CheckCircle2,
  Clock,
  Calendar,
  Link as LinkIcon,
  Download,
  Play,
  BookOpen
} from "lucide-react"
import { professoresMock, materias } from "@/lib/data/mock-data"
import Link from "next/link"

interface PageProps {
  params: Promise<{ id: string }>
}

// Mock de aula em andamento
const aulaMock = {
  id: "aula-1",
  titulo: "Equações do Segundo Grau",
  materia: "Matemática",
  professor: professoresMock[0],
  status: "em_andamento" as const,
  proximaAula: "2026-06-05T14:00:00",
  totalAulas: 8,
  aulasCompletadas: 3,
  materiais: [
    { id: "1", tipo: "video", titulo: "Introdução às Equações", url: "#", duracao: "15min" },
    { id: "2", tipo: "pdf", titulo: "Lista de Exercícios 1", url: "#", paginas: 5 },
    { id: "3", tipo: "video", titulo: "Fórmula de Bhaskara", url: "#", duracao: "20min" },
    { id: "4", tipo: "pdf", titulo: "Resumo Teórico", url: "#", paginas: 3 },
  ],
  tarefas: [
    { id: "1", titulo: "Resolver exercícios 1-10", prazo: "2026-06-03", concluida: true },
    { id: "2", titulo: "Assistir vídeo sobre Bhaskara", prazo: "2026-06-04", concluida: true },
    { id: "3", titulo: "Resolver lista de exercícios 2", prazo: "2026-06-06", concluida: false },
    { id: "4", titulo: "Preparar dúvidas para aula", prazo: "2026-06-05", concluida: false },
  ],
  mensagensRecentes: [
    { id: "1", autor: "Professor", texto: "Ótimo progresso! Continue assim.", data: "2026-06-01" },
    { id: "2", autor: "Você", texto: "Obrigado! Tive dúvida no exercício 5.", data: "2026-06-01" },
  ]
}

export default function AulaPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [tarefas, setTarefas] = useState(aulaMock.tarefas)
  
  const materia = materias.find(m => m.nome === aulaMock.materia)
  const progressoGeral = (aulaMock.aulasCompletadas / aulaMock.totalAulas) * 100
  const tarefasConcluidas = tarefas.filter(t => t.concluida).length
  const progressoTarefas = (tarefasConcluidas / tarefas.length) * 100

  const toggleTarefa = (tarefaId: string) => {
    setTarefas(prev => prev.map(t => 
      t.id === tarefaId ? { ...t, concluida: !t.concluida } : t
    ))
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short"
    })
  }

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      <Header title="Sala de Aula" showBack />

      <main className="px-4 py-4 space-y-4">
        {/* Card da Aula */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: materia?.cor + "20" }}
              >
                {materia?.icone}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-semibold text-lg">{aulaMock.titulo}</h1>
                <p className="text-sm text-muted-foreground">{aulaMock.materia}</p>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success shrink-0">
                Em andamento
              </Badge>
            </div>

            {/* Professor */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t">
              <Avatar className="h-10 w-10">
                <AvatarImage src={aulaMock.professor.avatar} />
                <AvatarFallback>{aulaMock.professor.nome[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{aulaMock.professor.nome}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {aulaMock.professor.formacao}
                </p>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => router.push(`/aluno/chat/${aulaMock.professor.id}`)}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Chat
              </Button>
            </div>

            {/* Progresso */}
            <div className="mt-4 pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progresso do curso</span>
                <span className="font-medium">{aulaMock.aulasCompletadas}/{aulaMock.totalAulas} aulas</span>
              </div>
              <Progress value={progressoGeral} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Próxima Aula */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Próxima aula ao vivo</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDateTime(aulaMock.proximaAula)}
                </p>
              </div>
              <Button size="sm">
                <Video className="h-4 w-4 mr-1" />
                Entrar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="materiais" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="materiais">Materiais</TabsTrigger>
            <TabsTrigger value="tarefas">Tarefas</TabsTrigger>
            <TabsTrigger value="avisos">Avisos</TabsTrigger>
          </TabsList>

          <TabsContent value="materiais" className="mt-4 space-y-3">
            {aulaMock.materiais.map((material) => (
              <Card key={material.id}>
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      material.tipo === "video" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                    }`}>
                      {material.tipo === "video" ? (
                        <Play className="h-5 w-5" />
                      ) : (
                        <FileText className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{material.titulo}</p>
                      <p className="text-xs text-muted-foreground">
                        {material.tipo === "video" ? material.duracao : `${material.paginas} páginas`}
                      </p>
                    </div>
                    <Button size="icon" variant="ghost">
                      {material.tipo === "video" ? (
                        <Play className="h-4 w-4" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tarefas" className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {tarefasConcluidas} de {tarefas.length} concluídas
              </p>
              <Progress value={progressoTarefas} className="w-24 h-2" />
            </div>

            {tarefas.map((tarefa) => (
              <Card key={tarefa.id} className={tarefa.concluida ? "opacity-60" : ""}>
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      checked={tarefa.concluida}
                      onCheckedChange={() => toggleTarefa(tarefa.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${tarefa.concluida ? "line-through text-muted-foreground" : "font-medium"}`}>
                        {tarefa.titulo}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        Prazo: {formatDate(tarefa.prazo)}
                      </p>
                    </div>
                    {tarefa.concluida && (
                      <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="avisos" className="mt-4 space-y-3">
            {aulaMock.mensagensRecentes.map((msg) => (
              <Card key={msg.id}>
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      {msg.autor === "Professor" ? (
                        <>
                          <AvatarImage src={aulaMock.professor.avatar} />
                          <AvatarFallback>{aulaMock.professor.nome[0]}</AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          EU
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {msg.autor === "Professor" ? aulaMock.professor.nome : "Você"}
                        </p>
                        <p className="text-xs text-muted-foreground">{formatDate(msg.data)}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{msg.texto}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full">
              Ver todas as mensagens
            </Button>
          </TabsContent>
        </Tabs>

        {/* Ações */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => router.push(`/aluno/avaliar/${id}`)}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Avaliar Aula
          </Button>
          <Button 
            className="flex-1"
            onClick={() => router.push(`/aluno/chat/${aulaMock.professor.id}`)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Falar com Professor
          </Button>
        </div>
      </main>
    </div>
  )
}

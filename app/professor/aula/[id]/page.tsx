"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Video, 
  FileText, 
  MessageSquare, 
  Users,
  Clock,
  Calendar,
  Plus,
  Upload,
  Send,
  CheckCircle2,
  MoreVertical
} from "lucide-react"
import { alunosMock, materiasMock } from "@/lib/data/mock-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface PageProps {
  params: Promise<{ id: string }>
}

// Mock de aula do professor
const aulaMock = {
  id: "aula-1",
  titulo: "Equações do Segundo Grau",
  materia: "Matemática",
  alunos: alunosMock.slice(0, 3),
  status: "em_andamento" as const,
  proximaAula: "2026-06-05T14:00:00",
  totalAulas: 8,
  aulasCompletadas: 3,
  materiais: [
    { id: "1", tipo: "video", titulo: "Introdução às Equações", url: "#" },
    { id: "2", tipo: "pdf", titulo: "Lista de Exercícios 1", url: "#" },
    { id: "3", tipo: "video", titulo: "Fórmula de Bhaskara", url: "#" },
  ],
  tarefas: [
    { id: "1", titulo: "Resolver exercícios 1-10", prazo: "2026-06-03", entregas: 2 },
    { id: "2", titulo: "Assistir vídeo sobre Bhaskara", prazo: "2026-06-04", entregas: 3 },
    { id: "3", titulo: "Resolver lista de exercícios 2", prazo: "2026-06-06", entregas: 0 },
  ],
}

export default function AulaProfessorPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [novoAviso, setNovoAviso] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  
  const materia = materiasMock.find(m => m.nome === aulaMock.materia)
  const progressoGeral = (aulaMock.aulasCompletadas / aulaMock.totalAulas) * 100

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const handleEnviarAviso = () => {
    if (novoAviso.trim()) {
      toast.success("Aviso enviado para todos os alunos!")
      setNovoAviso("")
    }
  }

  const handleAdicionarMaterial = () => {
    toast.success("Material adicionado com sucesso!")
    setDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      <Header title="Gerenciar Aula" showBack />

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Editar aula</DropdownMenuItem>
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Encerrar aula</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Alunos */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t">
              <div className="flex -space-x-2">
                {aulaMock.alunos.slice(0, 3).map((aluno) => (
                  <Avatar key={aluno.id} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={aluno.avatar} />
                    <AvatarFallback className="text-xs">{aluno.nome[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{aulaMock.alunos.length} alunos</p>
                <p className="text-xs text-muted-foreground">matriculados</p>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => router.push(`/professor/aula/${id}/alunos`)}
              >
                <Users className="h-4 w-4 mr-1" />
                Ver todos
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
                Iniciar
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
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Material
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Material</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Título</Label>
                    <Input placeholder="Nome do material" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Video className="h-4 w-4 mr-2" />
                        Vídeo
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Arquivo ou Link</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Arraste um arquivo ou clique para selecionar
                      </p>
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleAdicionarMaterial}>
                    Adicionar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {aulaMock.materiais.map((material) => (
              <Card key={material.id}>
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      material.tipo === "video" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                    }`}>
                      {material.tipo === "video" ? (
                        <Video className="h-5 w-5" />
                      ) : (
                        <FileText className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{material.titulo}</p>
                      <p className="text-xs text-muted-foreground capitalize">{material.tipo}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remover</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tarefas" className="mt-4 space-y-3">
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Criar Tarefa
            </Button>

            {aulaMock.tarefas.map((tarefa) => (
              <Card key={tarefa.id}>
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{tarefa.titulo}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Prazo: {new Date(tarefa.prazo).toLocaleDateString("pt-BR")}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {tarefa.entregas}/{aulaMock.alunos.length} entregas
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver entregas</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remover</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="avisos" className="mt-4 space-y-3">
            <Card>
              <CardContent className="p-3">
                <Textarea 
                  placeholder="Digite um aviso para os alunos..."
                  value={novoAviso}
                  onChange={(e) => setNovoAviso(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" onClick={handleEnviarAviso} disabled={!novoAviso.trim()}>
                    <Send className="h-4 w-4 mr-1" />
                    Enviar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center py-6">
              <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">Nenhum aviso enviado ainda</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Ações */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => router.push(`/professor/avaliar/${id}`)}
          >
            Avaliar Alunos
          </Button>
          <Button 
            className="flex-1"
          >
            <Video className="h-4 w-4 mr-2" />
            Iniciar Aula
          </Button>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useProfessor } from "@/lib/store/auth-store"
import { toast } from "sonner"
import {
  Award,
  Download,
  Share2,
  Trophy,
  Star,
  Clock,
  Users,
  Target,
} from "lucide-react"

const certificadosMock = [
  {
    id: "1",
    titulo: "Professor Voluntario",
    descricao: "Completou 10 aulas voluntarias",
    dataConquista: "2024-01-15",
    icone: Award,
    cor: "bg-amber-500",
  },
  {
    id: "2",
    titulo: "Avaliacao 5 Estrelas",
    descricao: "Recebeu 5 avaliacoes com nota maxima",
    dataConquista: "2024-02-20",
    icone: Star,
    cor: "bg-yellow-500",
  },
]

const metasMock = [
  {
    id: "1",
    titulo: "Mestre Dedicado",
    descricao: "Complete 50 aulas",
    progresso: 23,
    total: 50,
    icone: Trophy,
  },
  {
    id: "2",
    titulo: "Educador Popular",
    descricao: "Ajude 20 alunos diferentes",
    progresso: 8,
    total: 20,
    icone: Users,
  },
  {
    id: "3",
    titulo: "Compromisso Total",
    descricao: "100 horas de aulas ministradas",
    progresso: 42,
    total: 100,
    icone: Clock,
  },
]

export default function CertificadosProfessorPage() {
  const router = useRouter()
  const professor = useProfessor()

  useEffect(() => {
    if (!professor) {
      router.replace("/login")
    }
  }, [professor, router])

  if (!professor) {
    return null
  }

  const handleDownload = (certificadoId: string) => {
    toast.success("Certificado baixado com sucesso!")
  }

  const handleShare = (certificadoId: string) => {
    toast.success("Link copiado para a area de transferencia!")
  }

  return (
    <div className="min-h-screen pb-6 bg-background">
      <Header title="Meus Certificados" showBack />

      <main className="p-4 space-y-6">
        {/* Resumo */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                <Trophy className="h-7 w-7" />
              </div>
              <div>
                <p className="text-2xl font-bold">{certificadosMock.length}</p>
                <p className="text-sm opacity-90">Certificados conquistados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificados conquistados */}
        <section>
          <h2 className="mb-3 font-semibold">Certificados</h2>
          {certificadosMock.length > 0 ? (
            <div className="space-y-3">
              {certificadosMock.map((cert) => {
                const Icone = cert.icone
                return (
                  <Card key={cert.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${cert.cor} text-white`}
                        >
                          <Icone className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{cert.titulo}</h3>
                          <p className="text-sm text-muted-foreground">
                            {cert.descricao}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Conquistado em{" "}
                            {new Date(cert.dataConquista).toLocaleDateString(
                              "pt-BR"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDownload(cert.id)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Baixar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleShare(cert.id)}
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Compartilhar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">
                  Voce ainda nao possui certificados
                </p>
                <p className="text-sm text-muted-foreground">
                  Continue dando aulas para conquistar!
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Metas em progresso */}
        <section>
          <h2 className="mb-3 font-semibold flex items-center gap-2">
            <Target className="h-5 w-5" />
            Proximas conquistas
          </h2>
          <div className="space-y-3">
            {metasMock.map((meta) => {
              const Icone = meta.icone
              const porcentagem = Math.round((meta.progresso / meta.total) * 100)
              return (
                <Card key={meta.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Icone className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{meta.titulo}</h3>
                        <p className="text-sm text-muted-foreground">
                          {meta.descricao}
                        </p>
                      </div>
                      <Badge variant="secondary">{porcentagem}%</Badge>
                    </div>
                    <div className="space-y-1">
                      <Progress value={porcentagem} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">
                        {meta.progresso} de {meta.total}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

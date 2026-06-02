"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Header } from "@/components/educonecta/header"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getMateriaById, materias } from "@/lib/data/mock-data"
import { AlertTriangle, Loader2, Send } from "lucide-react"

const solicitacaoSchema = z.object({
  descricao: z
    .string()
    .min(20, "Descreva seu problema com mais detalhes (mínimo 20 caracteres)"),
  urgencia: z.enum(["baixa", "media", "alta"]),
})

type SolicitacaoData = z.infer<typeof solicitacaoSchema>

export default function MateriaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const materia = getMateriaById(slug)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SolicitacaoData>({
    resolver: zodResolver(solicitacaoSchema),
    defaultValues: {
      descricao: "",
      urgencia: "media",
    },
  })

  const urgencia = watch("urgencia")

  if (!materia) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <p className="text-muted-foreground">Matéria não encontrada</p>
        <Button variant="link" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    )
  }

  const onSubmit = async (data: SolicitacaoData) => {
    setIsLoading(true)
    // Simula envio
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.success("Solicitação enviada com sucesso!")
    router.push("/aluno/aguardando")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen pb-6">
      <Header title={materia.nome} showBack />

      <main className="p-4 space-y-6">
        {/* Header da matéria */}
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${materia.cor}20` }}
            >
              <span className="text-3xl" style={{ color: materia.cor }}>
                {materia.nome.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold">{materia.nome}</h1>
              <p className="text-sm text-muted-foreground">
                Descreva o que você precisa de ajuda
              </p>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Descrição do problema */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Qual é sua dúvida ou dificuldade?</Label>
            <Textarea
              id="descricao"
              placeholder="Ex: Estou com dificuldade em entender equações de segundo grau, especialmente quando preciso usar a fórmula de Bhaskara..."
              rows={5}
              {...register("descricao")}
              className={errors.descricao ? "border-destructive" : ""}
            />
            {errors.descricao && (
              <p className="text-xs text-destructive">
                {errors.descricao.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Quanto mais detalhes, melhor poderemos ajudar você
            </p>
          </div>

          {/* Urgência */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Qual a urgência?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={urgencia}
                onValueChange={(value) =>
                  setValue("urgencia", value as "baixa" | "media" | "alta")
                }
                className="space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="baixa" id="baixa" />
                  <Label
                    htmlFor="baixa"
                    className="flex flex-1 cursor-pointer items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">Baixa</p>
                      <p className="text-sm text-muted-foreground">
                        Posso esperar alguns dias
                      </p>
                    </div>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Tranquilo
                    </span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="media" id="media" />
                  <Label
                    htmlFor="media"
                    className="flex flex-1 cursor-pointer items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">Média</p>
                      <p className="text-sm text-muted-foreground">
                        Preciso para os próximos dias
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                      Em breve
                    </span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="alta" id="alta" />
                  <Label
                    htmlFor="alta"
                    className="flex flex-1 cursor-pointer items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">Alta</p>
                      <p className="text-sm text-muted-foreground">
                        Tenho prova ou trabalho urgente
                      </p>
                    </div>
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                      Urgente
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Enviar solicitação
          </Button>
        </form>
      </main>
    </div>
  )
}

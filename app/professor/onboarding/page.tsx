"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Logo } from "@/components/educonecta/logo"
import { AvailabilityGrid } from "@/components/educonecta/availability-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore, useProfessor } from "@/lib/store/auth-store"
import { materias } from "@/lib/data/mock-data"
import type { Disponibilidade } from "@/lib/types"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"

const onboardingSchema = z.object({
  bio: z.string().min(20, "Bio deve ter no mínimo 20 caracteres"),
  formacao: z.string().min(5, "Informe sua formação acadêmica"),
  experiencia: z.string().min(1, "Informe sua experiência"),
  metodologia: z.string().min(20, "Descreva sua metodologia"),
  materias: z.array(z.string()).min(1, "Selecione pelo menos uma matéria"),
})

type OnboardingData = z.infer<typeof onboardingSchema>

const defaultDisponibilidade: Disponibilidade = {
  segunda: { manha: false, tarde: false, noite: false },
  terca: { manha: false, tarde: false, noite: false },
  quarta: { manha: false, tarde: false, noite: false },
  quinta: { manha: false, tarde: false, noite: false },
  sexta: { manha: false, tarde: false, noite: false },
  sabado: { manha: false, tarde: false, noite: false },
  domingo: { manha: false, tarde: false, noite: false },
}

export default function OnboardingProfessorPage() {
  const router = useRouter()
  const { user, setUser } = useAuthStore()
  const professor = useProfessor()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [disponibilidade, setDisponibilidade] = useState<Disponibilidade>(
    professor?.disponibilidade || defaultDisponibilidade
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      bio: professor?.bio || "",
      formacao: professor?.formacao || "",
      experiencia: professor?.experiencia || "",
      metodologia: professor?.metodologia || "",
      materias: professor?.materias || [],
    },
  })

  const selectedMaterias = watch("materias")

  const handleMateriaToggle = (materiaId: string) => {
    const current = selectedMaterias || []
    if (current.includes(materiaId)) {
      setValue(
        "materias",
        current.filter((m) => m !== materiaId)
      )
    } else {
      setValue("materias", [...current, materiaId])
    }
  }

  const onSubmit = async (data: OnboardingData) => {
    // Verifica se selecionou pelo menos um horário
    const temDisponibilidade = Object.values(disponibilidade).some((dia) =>
      Object.values(dia).some((periodo) => periodo)
    )

    if (!temDisponibilidade) {
      toast.error("Selecione pelo menos um horário de disponibilidade")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Atualiza o usuário com os dados do onboarding
    if (user) {
      setUser({
        ...user,
        ...data,
        disponibilidade,
      } as typeof user)
    }

    toast.success("Perfil configurado com sucesso!")
    router.push("/professor/dashboard")
    setIsLoading(false)
  }

  const progress = (step / 3) * 100

  return (
    <main className="flex min-h-screen flex-col px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        {step > 1 ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStep(step - 1)}
            disabled={isLoading}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        ) : (
          <div className="w-10" />
        )}
        <Logo size="sm" />
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">Etapa {step} de 3</span>
          <span className="text-muted-foreground">
            {step === 1 && "Sobre você"}
            {step === 2 && "Matérias"}
            {step === 3 && "Disponibilidade"}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col"
      >
        {/* Step 1: Dados do perfil */}
        {step === 1 && (
          <div className="flex flex-1 flex-col space-y-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Bem-vindo, {user?.nome?.split(" ")[0]}!</h1>
              <p className="text-sm text-muted-foreground">
                Complete seu perfil para começar a ajudar alunos
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Sobre você</Label>
                <Textarea
                  id="bio"
                  placeholder="Conte um pouco sobre você e sua paixão por ensinar..."
                  rows={4}
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-xs text-destructive">{errors.bio.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="formacao">Formação acadêmica</Label>
                <Input
                  id="formacao"
                  placeholder="Ex: Licenciatura em Matemática - USP"
                  {...register("formacao")}
                />
                {errors.formacao && (
                  <p className="text-xs text-destructive">
                    {errors.formacao.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experiencia">Tempo de experiência</Label>
                <Input
                  id="experiencia"
                  placeholder="Ex: 5 anos"
                  {...register("experiencia")}
                />
                {errors.experiencia && (
                  <p className="text-xs text-destructive">
                    {errors.experiencia.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="metodologia">Metodologia de ensino</Label>
                <Textarea
                  id="metodologia"
                  placeholder="Como você costuma ensinar? Quais técnicas usa?"
                  rows={3}
                  {...register("metodologia")}
                />
                {errors.metodologia && (
                  <p className="text-xs text-destructive">
                    {errors.metodologia.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-1" />

            <Button type="button" className="w-full" onClick={() => setStep(2)}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Continuar
            </Button>
          </div>
        )}

        {/* Step 2: Matérias */}
        {step === 2 && (
          <div className="flex flex-1 flex-col space-y-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Quais matérias você ensina?</h1>
              <p className="text-sm text-muted-foreground">
                Selecione as matérias que você pode ajudar
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {materias.map((materia) => {
                const isSelected = selectedMaterias?.includes(materia.id)
                return (
                  <Card
                    key={materia.id}
                    className={`cursor-pointer transition-all ${
                      isSelected ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                    onClick={() => handleMateriaToggle(materia.id)}
                  >
                    <CardContent className="flex items-center gap-3 p-3">
                      <Checkbox checked={isSelected} />
                      <div
                        className="h-8 w-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${materia.cor}20` }}
                      >
                        <span style={{ color: materia.cor }}>
                          {materia.nome.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{materia.nome}</span>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {errors.materias && (
              <p className="text-xs text-destructive">
                {errors.materias.message}
              </p>
            )}

            <div className="flex-1" />

            <Button type="button" className="w-full" onClick={() => setStep(3)}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Continuar
            </Button>
          </div>
        )}

        {/* Step 3: Disponibilidade */}
        {step === 3 && (
          <div className="flex flex-1 flex-col space-y-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Sua disponibilidade</h1>
              <p className="text-sm text-muted-foreground">
                Marque os horários em que você pode dar aulas
              </p>
            </div>

            <Card>
              <CardContent className="p-4">
                <AvailabilityGrid
                  disponibilidade={disponibilidade}
                  onChange={setDisponibilidade}
                />
              </CardContent>
            </Card>

            <p className="text-xs text-muted-foreground text-center">
              Você pode alterar sua disponibilidade a qualquer momento nas configurações
            </p>

            <div className="flex-1" />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4" />
              )}
              Finalizar configuração
            </Button>
          </div>
        )}
      </form>
    </main>
  )
}

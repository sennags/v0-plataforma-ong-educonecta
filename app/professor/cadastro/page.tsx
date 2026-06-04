"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Logo } from "@/components/educonecta/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useAuthStore } from "@/lib/store/auth-store"
import { professorMock } from "@/lib/data/mock-data"
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"

const step1Schema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
})

const step3Schema = z
  .object({
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmarSenha: z.string(),
    aceitaTermos: z.literal(true, {
      errorMap: () => ({ message: "Você deve aceitar os termos de uso" }),
    }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  })

type Step1Data = z.infer<typeof step1Schema>
type Step3Data = z.infer<typeof step3Schema>

function formatPhone(value: string): string {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 2) return `(${numbers}`
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

export default function CadastroProfessorPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
    },
  })

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      senha: "",
      confirmarSenha: "",
      aceitaTermos: false as unknown as true,
    },
  })

  const handleStep1Submit = async (data: Step1Data) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStep1Data(data)
    toast.success("Código de verificação enviado para seu email!")
    toast.info("Use o código: 123456")
    setStep(2)
    setIsLoading(false)
  }

  const handleStep2Submit = async () => {
    if (otpValue.length !== 6) {
      toast.error("Digite o código completo")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (otpValue === "123456") {
      toast.success("Email verificado com sucesso!")
      setStep(3)
    } else {
      toast.error("Código inválido. Use: 123456")
    }
    setIsLoading(false)
  }

  const handleStep3Submit = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const novoProfessor = {
      ...professorMock,
      id: `professor-${Date.now()}`,
      nome: step1Data?.nome || "",
      email: step1Data?.email || "",
      telefone: step1Data?.telefone || "",
      bio: "",
      formacao: "",
      experiencia: "",
      metodologia: "",
      materias: [],
      metricas: {
        totalAlunos: 0,
        totalAulas: 0,
        mediaAvaliacao: 0,
        taxaResposta: 0,
        horasVoluntariado: 0,
      },
    }

    setUser(novoProfessor)
    toast.success("Cadastro realizado com sucesso!")
    router.push("/professor/onboarding")
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
          <Link href="/login">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        )}
        <Logo size="sm" />
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">Etapa {step} de 3</span>
          <span className="text-muted-foreground">
            {step === 1 && "Dados básicos"}
            {step === 2 && "Verificação"}
            {step === 3 && "Senha"}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step 1: Dados Básicos */}
      {step === 1 && (
        <form
          onSubmit={step1Form.handleSubmit(handleStep1Submit)}
          className="flex flex-1 flex-col space-y-4"
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Seja um voluntário</h1>
            <p className="text-sm text-muted-foreground">
              Preencha seus dados para se cadastrar como professor voluntário
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                placeholder="Seu nome completo"
                {...step1Form.register("nome")}
              />
              {step1Form.formState.errors.nome && (
                <p className="text-xs text-destructive">
                  {step1Form.formState.errors.nome.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...step1Form.register("email")}
              />
              {step1Form.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {step1Form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone (WhatsApp)</Label>
              <Input
                id="telefone"
                placeholder="(00) 00000-0000"
                maxLength={15}
                value={step1Form.watch("telefone")}
                onChange={(e) =>
                  step1Form.setValue("telefone", formatPhone(e.target.value))
                }
              />
              {step1Form.formState.errors.telefone && (
                <p className="text-xs text-destructive">
                  {step1Form.formState.errors.telefone.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex-1" />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="mr-2 h-4 w-4" />
            )}
            Continuar
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Ou entre com sua conta{" "}
            <Link href="/login" className="text-primary hover:underline">
              Google
            </Link>
          </p>
        </form>
      )}

      {/* Step 2: Verificação OTP */}
      {step === 2 && (
        <div className="flex flex-1 flex-col">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Verificar email</h1>
            <p className="text-sm text-muted-foreground">
              Digite o código de 6 dígitos enviado para{" "}
              <span className="font-medium">{step1Data?.email}</span>
            </p>
          </div>

          <div className="my-8 flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={setOtpValue}
              disabled={isLoading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Não recebeu o código?{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => toast.info("Código reenviado: 123456")}
            >
              Reenviar
            </button>
          </p>

          <div className="flex-1" />

          <Button
            onClick={handleStep2Submit}
            className="w-full"
            disabled={isLoading || otpValue.length !== 6}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-2 h-4 w-4" />
            )}
            Verificar
          </Button>
        </div>
      )}

      {/* Step 3: Senha e Termos */}
      {step === 3 && (
        <form
          onSubmit={step3Form.handleSubmit(handleStep3Submit)}
          className="flex flex-1 flex-col space-y-4"
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Criar senha</h1>
            <p className="text-sm text-muted-foreground">
              Defina uma senha segura para sua conta
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  className="pr-10"
                  {...step3Form.register("senha")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {step3Form.formState.errors.senha && (
                <p className="text-xs text-destructive">
                  {step3Form.formState.errors.senha.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar senha</Label>
              <Input
                id="confirmarSenha"
                type={showPassword ? "text" : "password"}
                placeholder="Digite a senha novamente"
                {...step3Form.register("confirmarSenha")}
              />
              {step3Form.formState.errors.confirmarSenha && (
                <p className="text-xs text-destructive">
                  {step3Form.formState.errors.confirmarSenha.message}
                </p>
              )}
            </div>

            <div className="flex items-start gap-2 pt-2">
              <Checkbox
                id="aceitaTermos"
                checked={step3Form.watch("aceitaTermos")}
                onCheckedChange={(checked) =>
                  step3Form.setValue("aceitaTermos", checked as true)
                }
              />
              <label
                htmlFor="aceitaTermos"
                className="text-sm leading-tight text-muted-foreground"
              >
                Li e aceito os{" "}
                <Link href="/termos" className="text-primary hover:underline">
                  termos de uso
                </Link>{" "}
                e a{" "}
                <Link
                  href="/privacidade"
                  className="text-primary hover:underline"
                >
                  política de privacidade
                </Link>
              </label>
            </div>
            {step3Form.formState.errors.aceitaTermos && (
              <p className="text-xs text-destructive">
                {step3Form.formState.errors.aceitaTermos.message}
              </p>
            )}
          </div>

          <div className="flex-1" />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-2 h-4 w-4" />
            )}
            Criar conta
          </Button>
        </form>
      )}
    </main>
  )
}

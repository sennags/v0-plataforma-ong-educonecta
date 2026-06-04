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
import { Progress } from "@/components/ui/progress"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Loader2, Mail } from "lucide-react"
import Link from "next/link"

const step1Schema = z.object({
  cpf: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 11, "CPF deve ter 11 dígitos"),
})

const step3Schema = z
  .object({
    novaSenha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.novaSenha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  })

type Step1Data = z.infer<typeof step1Schema>
type Step3Data = z.infer<typeof step3Schema>

function formatCPF(value: string): string {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 3) return numbers
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
  if (numbers.length <= 9)
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
}

export default function RecuperarSenhaPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [maskedEmail, setMaskedEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      cpf: "",
    },
  })

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      novaSenha: "",
      confirmarSenha: "",
    },
  })

  const handleStep1Submit = async (data: Step1Data) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simula busca do email associado ao CPF
    const email = "ma***@email.com"
    setMaskedEmail(email)

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
      toast.success("Código verificado com sucesso!")
      setStep(3)
    } else {
      toast.error("Código inválido. Use: 123456")
    }
    setIsLoading(false)
  }

  const handleStep3Submit = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Senha alterada com sucesso!")
    router.push("/login")
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
            {step === 1 && "Identificação"}
            {step === 2 && "Verificação"}
            {step === 3 && "Nova senha"}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step 1: CPF */}
      {step === 1 && (
        <form
          onSubmit={step1Form.handleSubmit(handleStep1Submit)}
          className="flex flex-1 flex-col space-y-4"
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Recuperar senha</h1>
            <p className="text-sm text-muted-foreground">
              Digite seu CPF para enviarmos um código de verificação para seu email cadastrado
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                maxLength={14}
                value={step1Form.watch("cpf")}
                onChange={(e) =>
                  step1Form.setValue("cpf", formatCPF(e.target.value))
                }
              />
              {step1Form.formState.errors.cpf && (
                <p className="text-xs text-destructive">
                  {step1Form.formState.errors.cpf.message}
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
        </form>
      )}

      {/* Step 2: OTP Verification */}
      {step === 2 && (
        <div className="flex flex-1 flex-col">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Verificar email</h1>
            <p className="text-sm text-muted-foreground">
              Digite o código de 6 dígitos enviado para{" "}
              <span className="font-medium">{maskedEmail}</span>
            </p>
          </div>

          <div className="my-8 flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
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

      {/* Step 3: New Password */}
      {step === 3 && (
        <form
          onSubmit={step3Form.handleSubmit(handleStep3Submit)}
          className="flex flex-1 flex-col space-y-4"
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Nova senha</h1>
            <p className="text-sm text-muted-foreground">
              Digite sua nova senha
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="novaSenha">Nova senha</Label>
              <div className="relative">
                <Input
                  id="novaSenha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  className="pr-10"
                  {...step3Form.register("novaSenha")}
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
              {step3Form.formState.errors.novaSenha && (
                <p className="text-xs text-destructive">
                  {step3Form.formState.errors.novaSenha.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar nova senha</Label>
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
          </div>

          <div className="flex-1" />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-2 h-4 w-4" />
            )}
            Alterar senha
          </Button>
        </form>
      )}
    </main>
  )
}

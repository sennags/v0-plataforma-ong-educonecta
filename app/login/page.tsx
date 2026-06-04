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
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/lib/store/auth-store"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"

const loginSchema = z.object({
  cpf: z
    .string()
    .min(11, "CPF inválido")
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 11, "CPF deve ter 11 dígitos"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
})

type LoginFormData = z.infer<typeof loginSchema>

function formatCPF(value: string): string {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 3) return numbers
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
  if (numbers.length <= 9)
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
}

export default function LoginPage() {
  const router = useRouter()
  const { loginAsAluno, loginAsProfessor, isLoading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
      senha: "",
    },
  })

  const cpfValue = watch("cpf")

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    setValue("cpf", formatted)
  }

  const onSubmit = async (data: LoginFormData) => {
    const success = await loginAsAluno(data.cpf, data.senha)
    if (success) {
      toast.success("Login realizado com sucesso!")
      router.push("/aluno/dashboard")
    } else {
      toast.error("CPF ou senha inválidos")
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true)
    const success = await loginAsProfessor()
    if (success) {
      toast.success("Login realizado com sucesso!")
      router.push("/professor/onboarding")
    } else {
      toast.error("Erro ao fazer login com Google")
    }
    setIsLoadingGoogle(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Logo size="lg" />
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Conectando alunos e professores voluntários
          </p>
        </div>

        {/* Formulário de Login do Aluno */}
        <div className="space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Entrar como Aluno</h1>
            <p className="text-sm text-muted-foreground">
              Digite seu CPF e senha para acessar
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                maxLength={14}
                {...register("cpf")}
                value={cpfValue}
                onChange={handleCPFChange}
                className={errors.cpf ? "border-destructive" : ""}
              />
              {errors.cpf && (
                <p className="text-xs text-destructive">{errors.cpf.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  {...register("senha")}
                  className={errors.senha ? "border-destructive pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.senha && (
                <p className="text-xs text-destructive">{errors.senha.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                href="/aluno/recuperar-senha"
                className="text-sm text-primary hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link href="/aluno/cadastro" className="text-primary hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>

        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
            ou
          </span>
        </div>

        {/* Login do Professor */}
        <div className="space-y-4">
          <div className="space-y-2 text-center">
            <h2 className="text-lg font-semibold">Sou Professor Voluntário</h2>
            <p className="text-sm text-muted-foreground">
              Entre com sua conta Google para ser voluntário
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={isLoadingGoogle}
          >
            {isLoadingGoogle ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continuar com Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Quer se cadastrar?{" "}
            <Link href="/professor/cadastro" className="text-primary hover:underline">
              Criar conta de professor
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

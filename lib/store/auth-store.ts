import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Aluno, Professor, UserRole } from "@/lib/types"
import { alunoMock, professoresMock } from "@/lib/data/mock-data"

interface AuthState {
  user: User | null
  role: UserRole | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  loginAsAluno: (cpf: string, senha: string) => Promise<boolean>
  loginAsProfessor: () => Promise<boolean>
  logout: () => void
  setUser: (user: User) => void
  
  // Para testes - alternar entre papéis
  switchRole: (role: UserRole) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,

      loginAsAluno: async (cpf: string, _senha: string) => {
        set({ isLoading: true })
        
        // Simula delay de rede
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        // Login simulado - aceita qualquer CPF válido
        if (cpf.replace(/\D/g, "").length === 11) {
          set({
            user: alunoMock,
            role: "aluno",
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        }
        
        set({ isLoading: false })
        return false
      },

      loginAsProfessor: async () => {
        set({ isLoading: true })
        
        // Simula delay de rede (OAuth)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        
        // Login simulado com primeiro professor
        set({
          user: professoresMock[0],
          role: "professor",
          isAuthenticated: true,
          isLoading: false,
        })
        return true
      },

      logout: () => {
        set({
          user: null,
          role: null,
          isAuthenticated: false,
        })
      },

      setUser: (user: User) => {
        set({
          user,
          role: user.role,
          isAuthenticated: true,
        })
      },

      switchRole: (role: UserRole) => {
        if (role === "aluno") {
          set({
            user: alunoMock,
            role: "aluno",
            isAuthenticated: true,
          })
        } else {
          set({
            user: professoresMock[0],
            role: "professor",
            isAuthenticated: true,
          })
        }
      },
    }),
    {
      name: "educonecta-auth",
    }
  )
)

// Hook helper para acessar dados específicos do aluno
export function useAluno(): Aluno | null {
  const { user, role } = useAuthStore()
  if (role === "aluno" && user) {
    return user as Aluno
  }
  return null
}

// Hook helper para acessar dados específicos do professor
export function useProfessor(): Professor | null {
  const { user, role } = useAuthStore()
  if (role === "professor" && user) {
    return user as Professor
  }
  return null
}

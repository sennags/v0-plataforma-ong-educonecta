// Tipos centralizados para a plataforma Educonecta

export type UserRole = "aluno" | "professor"

export interface User {
  id: string
  role: UserRole
  nome: string
  email: string
  avatar?: string
  telefone?: string
}

export interface Aluno extends User {
  role: "aluno"
  cpf: string
  dataNascimento: string
  endereco: Endereco
  escola?: string
  serie?: string
  materiasInteresse: string[]
  metricas: MetricasAluno
}

export interface Professor extends User {
  role: "professor"
  bio: string
  formacao: string
  experiencia: string
  materias: string[]
  disponibilidade: Disponibilidade
  avaliacao: number
  totalAulas: number
  metodologia?: string
}

export interface Endereco {
  cep: string
  rua: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
}

export interface Disponibilidade {
  [dia: string]: {
    manha: boolean
    tarde: boolean
    noite: boolean
  }
}

export interface MetricasAluno {
  totalAulas: number
  taxaPresenca: number
  ultimaAula?: string
  primeiraVez: boolean
}

export interface Solicitacao {
  id: string
  alunoId: string
  aluno: Aluno
  materia: string
  descricao: string
  urgencia: "baixa" | "media" | "alta"
  status: "pendente" | "aceita" | "em_andamento" | "concluida" | "cancelada"
  criadaEm: string
  professorId?: string
  professor?: Professor
}

export interface Aula {
  id: string
  solicitacaoId: string
  alunoId: string
  professorId: string
  materia: string
  dataHora: string
  duracao: number // em minutos
  modalidade: "online" | "presencial"
  status: "agendada" | "em_andamento" | "concluida" | "cancelada"
  linkSala?: string
  avaliacaoAluno?: Avaliacao
  avaliacaoProfessor?: Avaliacao
}

export interface Avaliacao {
  id: string
  aulaId: string
  avaliadorId: string
  avaliadoId: string
  nota: number // 1-5
  comentario?: string
  criadaEm: string
}

export interface Mensagem {
  id: string
  remetenteId: string
  destinatarioId: string
  conteudo: string
  lida: boolean
  criadaEm: string
}

export interface Conversa {
  id: string
  participantes: string[]
  mensagens: Mensagem[]
  ultimaMensagem?: Mensagem
}

export interface Materia {
  id: string
  nome: string
  icone: string
  cor: string
}

// Estados do cadastro multi-step
export interface CadastroAlunoStep1 {
  nome: string
  cpf: string
  dataNascimento: string
  email: string
  telefone: string
  senha: string
  confirmarSenha: string
}

export interface CadastroAlunoStep2 {
  codigoOtp: string
}

export interface CadastroAlunoStep3 {
  cep: string
  rua: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  aceitaTermos: boolean
}

export interface OnboardingProfessor {
  bio: string
  formacao: string
  experiencia: string
  materias: string[]
  disponibilidade: Disponibilidade
  metodologia: string
}

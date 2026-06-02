/**
 * Implementação Mock dos Repositórios
 * Usa dados em memória - fácil trocar por implementação real depois
 */

import type {
  IAlunoRepository,
  IProfessorRepository,
  IAulaRepository,
  IAvaliacaoRepository,
  IMensagemRepository,
  ISolicitacaoRepository,
  ICredentialRepository,
  FindOptions,
  FindResult,
} from "../interfaces"
import type { Aluno, Professor, Aula, Avaliacao, Mensagem, Solicitacao } from "@/lib/types"
import { alunoMock, alunosMock, professoresMock, aulasMock, solicitacoesMock, conversasMock } from "@/lib/data/mock-data"

// Dados em memória (simulando banco)
const alunos: Aluno[] = [...alunosMock]
const professores: Professor[] = [...professoresMock]
const aulas: Aula[] = [...aulasMock]
const avaliacoes: Avaliacao[] = []
const mensagens: Mensagem[] = []
const solicitacoes: Solicitacao[] = [...solicitacoesMock]

// Credenciais mock (em produção seria hash bcrypt)
const credentials: Map<string, { hash: string }> = new Map([
  ["aluno:aluno-1", { hash: "123456" }], // senha: 123456
  ["professor:prof-1", { hash: "oauth" }],
  ["professor:prof-2", { hash: "oauth" }],
  ["professor:prof-3", { hash: "oauth" }],
])

// Helper para paginação
function paginate<T>(items: T[], options?: FindOptions): FindResult<T> {
  const total = items.length
  const offset = options?.offset ?? 0
  const limit = options?.limit ?? 50
  const data = items.slice(offset, offset + limit)
  return { data, total }
}

// Helper para gerar IDs
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// ============ ALUNO REPOSITORY ============
export const mockAlunoRepository: IAlunoRepository = {
  async findById(id) {
    return alunos.find((a) => a.id === id) ?? null
  },

  async findByCpf(cpf) {
    const normalizedCpf = cpf.replace(/\D/g, "")
    return alunos.find((a) => a.cpf.replace(/\D/g, "") === normalizedCpf) ?? null
  },

  async findByEmail(email) {
    return alunos.find((a) => a.email.toLowerCase() === email.toLowerCase()) ?? null
  },

  async findAll(options) {
    return paginate(alunos, options)
  },

  async create(data) {
    const newAluno: Aluno = {
      ...data,
      id: generateId("aluno"),
    }
    alunos.push(newAluno)
    return newAluno
  },

  async update(id, data) {
    const index = alunos.findIndex((a) => a.id === id)
    if (index === -1) return null
    alunos[index] = { ...alunos[index], ...data }
    return alunos[index]
  },

  async delete(id) {
    const index = alunos.findIndex((a) => a.id === id)
    if (index === -1) return false
    alunos.splice(index, 1)
    return true
  },
}

// ============ PROFESSOR REPOSITORY ============
export const mockProfessorRepository: IProfessorRepository = {
  async findById(id) {
    return professores.find((p) => p.id === id) ?? null
  },

  async findByEmail(email) {
    return professores.find((p) => p.email.toLowerCase() === email.toLowerCase()) ?? null
  },

  async findAll(options) {
    return paginate(professores, options)
  },

  async findByMateria(materiaSlug, options) {
    const filtered = professores.filter((p) => p.materias.includes(materiaSlug))
    return paginate(filtered, options)
  },

  async create(data) {
    const newProfessor: Professor = {
      ...data,
      id: generateId("prof"),
    }
    professores.push(newProfessor)
    return newProfessor
  },

  async update(id, data) {
    const index = professores.findIndex((p) => p.id === id)
    if (index === -1) return null
    professores[index] = { ...professores[index], ...data }
    return professores[index]
  },

  async delete(id) {
    const index = professores.findIndex((p) => p.id === id)
    if (index === -1) return false
    professores.splice(index, 1)
    return true
  },
}

// ============ AULA REPOSITORY ============
export const mockAulaRepository: IAulaRepository = {
  async findById(id) {
    return aulas.find((a) => a.id === id) ?? null
  },

  async findByAluno(alunoId, options) {
    const filtered = aulas.filter((a) => a.alunoId === alunoId)
    return paginate(filtered, options)
  },

  async findByProfessor(professorId, options) {
    const filtered = aulas.filter((a) => a.professorId === professorId)
    return paginate(filtered, options)
  },

  async findUpcoming(userId, role) {
    const now = new Date()
    return aulas
      .filter((a) => {
        const isUser = role === "aluno" ? a.alunoId === userId : a.professorId === userId
        const aulaDate = new Date(a.data)
        return isUser && aulaDate >= now && a.status === "agendada"
      })
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
      .slice(0, 5)
  },

  async create(data) {
    const newAula: Aula = {
      ...data,
      id: generateId("aula"),
    }
    aulas.push(newAula)
    return newAula
  },

  async update(id, data) {
    const index = aulas.findIndex((a) => a.id === id)
    if (index === -1) return null
    aulas[index] = { ...aulas[index], ...data }
    return aulas[index]
  },

  async delete(id) {
    const index = aulas.findIndex((a) => a.id === id)
    if (index === -1) return false
    aulas.splice(index, 1)
    return true
  },
}

// ============ AVALIACAO REPOSITORY ============
export const mockAvaliacaoRepository: IAvaliacaoRepository = {
  async findById(id) {
    return avaliacoes.find((a) => a.id === id) ?? null
  },

  async findByAvaliador(avaliadorId) {
    return avaliacoes.filter((a) => a.avaliadorId === avaliadorId)
  },

  async findByAvaliado(avaliadoId) {
    return avaliacoes.filter((a) => a.avaliadoId === avaliadoId)
  },

  async findByAula(aulaId) {
    return avaliacoes.filter((a) => a.aulaId === aulaId)
  },

  async create(data) {
    const newAvaliacao: Avaliacao = {
      ...data,
      id: generateId("aval"),
      createdAt: new Date().toISOString(),
    }
    avaliacoes.push(newAvaliacao)
    return newAvaliacao
  },

  async getMediaByUser(userId) {
    const userAvaliacoes = avaliacoes.filter((a) => a.avaliadoId === userId)
    if (userAvaliacoes.length === 0) return 0
    const sum = userAvaliacoes.reduce((acc, a) => acc + a.notaGeral, 0)
    return sum / userAvaliacoes.length
  },
}

// ============ MENSAGEM REPOSITORY ============
export const mockMensagemRepository: IMensagemRepository = {
  async findById(id) {
    return mensagens.find((m) => m.id === id) ?? null
  },

  async findByConversa(participante1Id, participante2Id, options) {
    const filtered = mensagens.filter(
      (m) =>
        (m.remetenteId === participante1Id && m.destinatarioId === participante2Id) ||
        (m.remetenteId === participante2Id && m.destinatarioId === participante1Id)
    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    return paginate(filtered, options)
  },

  async findConversas(userId) {
    // Retorna conversas mock do arquivo de dados
    return conversasMock.map((c) => ({
      participanteId: c.participanteId,
      participanteNome: c.participanteNome,
      participanteAvatar: c.participanteAvatar,
      ultimaMensagem: c.ultimaMensagem,
      dataUltimaMensagem: c.dataUltimaMensagem,
      naoLidas: c.naoLidas,
    }))
  },

  async create(data) {
    const newMensagem: Mensagem = {
      ...data,
      id: generateId("msg"),
      createdAt: new Date().toISOString(),
    }
    mensagens.push(newMensagem)
    return newMensagem
  },

  async markAsRead(_conversaId, _userId) {
    // Mock: não faz nada real
  },
}

// ============ SOLICITACAO REPOSITORY ============
export const mockSolicitacaoRepository: ISolicitacaoRepository = {
  async findById(id) {
    return solicitacoes.find((s) => s.id === id) ?? null
  },

  async findByAluno(alunoId) {
    return solicitacoes.filter((s) => s.alunoId === alunoId)
  },

  async findByProfessor(professorId) {
    return solicitacoes.filter((s) => s.professorId === professorId)
  },

  async findPendentes(professorId) {
    return solicitacoes.filter((s) => s.professorId === professorId && s.status === "pendente")
  },

  async create(data) {
    const newSolicitacao: Solicitacao = {
      ...data,
      id: generateId("sol"),
      createdAt: new Date().toISOString(),
    }
    solicitacoes.push(newSolicitacao)
    return newSolicitacao
  },

  async updateStatus(id, status) {
    const index = solicitacoes.findIndex((s) => s.id === id)
    if (index === -1) return null
    solicitacoes[index] = { ...solicitacoes[index], status }
    return solicitacoes[index]
  },
}

// ============ CREDENTIAL REPOSITORY ============
export const mockCredentialRepository: ICredentialRepository = {
  async findByUserId(userId, role) {
    return credentials.get(`${role}:${userId}`) ?? null
  },

  async create(userId, role, hash) {
    credentials.set(`${role}:${userId}`, { hash })
  },

  async update(userId, role, hash) {
    credentials.set(`${role}:${userId}`, { hash })
  },
}

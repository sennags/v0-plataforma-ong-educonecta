/**
 * Interfaces de repositório - Abstração da camada de dados
 * Permite trocar implementação (mock -> banco real) sem alterar regras de negócio
 */

import type { Aluno, Professor, Aula, Avaliacao, Mensagem, Solicitacao } from "@/lib/types"

// Tipos base para operações
export interface FindOptions {
  limit?: number
  offset?: number
  orderBy?: string
  order?: "asc" | "desc"
}

export interface FindResult<T> {
  data: T[]
  total: number
}

// Repository de Alunos
export interface IAlunoRepository {
  findById(id: string): Promise<Aluno | null>
  findByCpf(cpf: string): Promise<Aluno | null>
  findByEmail(email: string): Promise<Aluno | null>
  findAll(options?: FindOptions): Promise<FindResult<Aluno>>
  create(data: Omit<Aluno, "id">): Promise<Aluno>
  update(id: string, data: Partial<Aluno>): Promise<Aluno | null>
  delete(id: string): Promise<boolean>
}

// Repository de Professores
export interface IProfessorRepository {
  findById(id: string): Promise<Professor | null>
  findByEmail(email: string): Promise<Professor | null>
  findAll(options?: FindOptions): Promise<FindResult<Professor>>
  findByMateria(materiaSlug: string, options?: FindOptions): Promise<FindResult<Professor>>
  create(data: Omit<Professor, "id">): Promise<Professor>
  update(id: string, data: Partial<Professor>): Promise<Professor | null>
  delete(id: string): Promise<boolean>
}

// Repository de Aulas
export interface IAulaRepository {
  findById(id: string): Promise<Aula | null>
  findByAluno(alunoId: string, options?: FindOptions): Promise<FindResult<Aula>>
  findByProfessor(professorId: string, options?: FindOptions): Promise<FindResult<Aula>>
  findUpcoming(userId: string, role: "aluno" | "professor"): Promise<Aula[]>
  create(data: Omit<Aula, "id">): Promise<Aula>
  update(id: string, data: Partial<Aula>): Promise<Aula | null>
  delete(id: string): Promise<boolean>
}

// Repository de Avaliações
export interface IAvaliacaoRepository {
  findById(id: string): Promise<Avaliacao | null>
  findByAvaliador(avaliadorId: string): Promise<Avaliacao[]>
  findByAvaliado(avaliadoId: string): Promise<Avaliacao[]>
  findByAula(aulaId: string): Promise<Avaliacao[]>
  create(data: Omit<Avaliacao, "id" | "createdAt">): Promise<Avaliacao>
  getMediaByUser(userId: string): Promise<number>
}

// Repository de Mensagens
export interface IMensagemRepository {
  findById(id: string): Promise<Mensagem | null>
  findByConversa(
    participante1Id: string,
    participante2Id: string,
    options?: FindOptions
  ): Promise<FindResult<Mensagem>>
  findConversas(userId: string): Promise<Array<{
    participanteId: string
    participanteNome: string
    participanteAvatar?: string
    ultimaMensagem: string
    dataUltimaMensagem: string
    naoLidas: number
  }>>
  create(data: Omit<Mensagem, "id" | "createdAt">): Promise<Mensagem>
  markAsRead(conversaId: string, userId: string): Promise<void>
}

// Repository de Solicitações
export interface ISolicitacaoRepository {
  findById(id: string): Promise<Solicitacao | null>
  findByAluno(alunoId: string): Promise<Solicitacao[]>
  findByProfessor(professorId: string): Promise<Solicitacao[]>
  findPendentes(professorId: string): Promise<Solicitacao[]>
  create(data: Omit<Solicitacao, "id" | "createdAt">): Promise<Solicitacao>
  updateStatus(id: string, status: Solicitacao["status"]): Promise<Solicitacao | null>
}

// Credenciais de usuário (separado por segurança)
export interface ICredentialRepository {
  findByUserId(userId: string, role: "aluno" | "professor"): Promise<{ hash: string } | null>
  create(userId: string, role: "aluno" | "professor", hash: string): Promise<void>
  update(userId: string, role: "aluno" | "professor", hash: string): Promise<void>
}

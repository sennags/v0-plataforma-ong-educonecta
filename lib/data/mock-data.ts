import type { Aluno, Professor, Solicitacao, Aula, Materia, Conversa, Mensagem } from "@/lib/types"

export const materias: Materia[] = [
  { id: "matematica", nome: "Matemática", icone: "calculator", cor: "#3B82F6" },
  { id: "portugues", nome: "Português", icone: "book-open", cor: "#EF4444" },
  { id: "fisica", nome: "Física", icone: "atom", cor: "#8B5CF6" },
  { id: "quimica", nome: "Química", icone: "flask-conical", cor: "#10B981" },
  { id: "biologia", nome: "Biologia", icone: "leaf", cor: "#22C55E" },
  { id: "historia", nome: "História", icone: "landmark", cor: "#F59E0B" },
  { id: "geografia", nome: "Geografia", icone: "globe", cor: "#06B6D4" },
  { id: "ingles", nome: "Inglês", icone: "languages", cor: "#EC4899" },
  { id: "redacao", nome: "Redação", icone: "pen-tool", cor: "#6366F1" },
]

export const alunoMock: Aluno = {
  id: "aluno-1",
  role: "aluno",
  nome: "Maria Silva",
  email: "maria.silva@email.com",
  cpf: "123.456.789-00",
  telefone: "(11) 99999-9999",
  dataNascimento: "2008-05-15",
  avatar: "/avatars/maria.jpg",
  escola: "E.E. Prof. João da Silva",
  serie: "9º ano",
  materiasInteresse: ["matematica", "fisica", "quimica"],
  endereco: {
    cep: "01310-100",
    rua: "Av. Paulista",
    numero: "1000",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
  },
  metricas: {
    totalAulas: 12,
    taxaPresenca: 92,
    ultimaAula: "2024-01-15",
    primeiraVez: false,
  },
}

export const professoresMock: Professor[] = [
  {
    id: "prof-1",
    role: "professor",
    nome: "Carlos Mendes",
    email: "carlos.mendes@email.com",
    telefone: "(11) 98888-8888",
    avatar: "/avatars/carlos.jpg",
    bio: "Professor de matemática com 10 anos de experiência em escolas públicas e particulares.",
    formacao: "Licenciatura em Matemática - USP",
    experiencia: "10 anos",
    materias: ["matematica", "fisica"],
    metodologia: "Foco em resolução de problemas práticos e contextualização com o dia a dia do aluno.",
    disponibilidade: {
      segunda: { manha: true, tarde: true, noite: false },
      terca: { manha: false, tarde: true, noite: true },
      quarta: { manha: true, tarde: false, noite: true },
      quinta: { manha: true, tarde: true, noite: false },
      sexta: { manha: false, tarde: true, noite: false },
      sabado: { manha: true, tarde: false, noite: false },
      domingo: { manha: false, tarde: false, noite: false },
    },
    avaliacao: 4.8,
    totalAulas: 156,
  },
  {
    id: "prof-2",
    role: "professor",
    nome: "Ana Beatriz Costa",
    email: "ana.costa@email.com",
    telefone: "(11) 97777-7777",
    avatar: "/avatars/ana.jpg",
    bio: "Apaixonada por ensinar química de forma divertida e acessível.",
    formacao: "Bacharelado e Licenciatura em Química - UNICAMP",
    experiencia: "5 anos",
    materias: ["quimica", "biologia"],
    metodologia: "Uso de experimentos virtuais e exemplos do cotidiano para fixar conceitos.",
    disponibilidade: {
      segunda: { manha: false, tarde: true, noite: true },
      terca: { manha: true, tarde: true, noite: false },
      quarta: { manha: false, tarde: false, noite: true },
      quinta: { manha: true, tarde: true, noite: true },
      sexta: { manha: true, tarde: false, noite: false },
      sabado: { manha: false, tarde: true, noite: false },
      domingo: { manha: false, tarde: false, noite: false },
    },
    avaliacao: 4.9,
    totalAulas: 89,
  },
  {
    id: "prof-3",
    role: "professor",
    nome: "Roberto Almeida",
    email: "roberto.almeida@email.com",
    telefone: "(11) 96666-6666",
    avatar: "/avatars/roberto.jpg",
    bio: "Historiador e educador social, acredito que conhecer o passado nos prepara para o futuro.",
    formacao: "Mestrado em História Social - PUC-SP",
    experiencia: "8 anos",
    materias: ["historia", "geografia"],
    metodologia: "Narrativas envolventes e conexões com eventos atuais.",
    disponibilidade: {
      segunda: { manha: true, tarde: false, noite: true },
      terca: { manha: true, tarde: true, noite: false },
      quarta: { manha: true, tarde: true, noite: true },
      quinta: { manha: false, tarde: true, noite: false },
      sexta: { manha: true, tarde: true, noite: true },
      sabado: { manha: true, tarde: true, noite: false },
      domingo: { manha: false, tarde: false, noite: false },
    },
    avaliacao: 4.7,
    totalAulas: 203,
  },
  {
    id: "prof-4",
    role: "professor",
    nome: "Fernanda Lima",
    email: "fernanda.lima@email.com",
    telefone: "(11) 95555-5555",
    avatar: "/avatars/fernanda.jpg",
    bio: "Especialista em redação e literatura, ajudo alunos a encontrarem sua voz na escrita.",
    formacao: "Letras - Português/Inglês - UNESP",
    experiencia: "6 anos",
    materias: ["portugues", "redacao", "ingles"],
    metodologia: "Escrita criativa, análise de textos e prática constante com feedback personalizado.",
    disponibilidade: {
      segunda: { manha: false, tarde: true, noite: false },
      terca: { manha: true, tarde: false, noite: true },
      quarta: { manha: true, tarde: true, noite: false },
      quinta: { manha: false, tarde: true, noite: true },
      sexta: { manha: false, tarde: false, noite: true },
      sabado: { manha: true, tarde: true, noite: false },
      domingo: { manha: false, tarde: false, noite: false },
    },
    avaliacao: 4.9,
    totalAulas: 178,
  },
]

export const solicitacoesMock: Solicitacao[] = [
  {
    id: "sol-1",
    alunoId: "aluno-1",
    aluno: alunoMock,
    materia: "matematica",
    descricao: "Preciso de ajuda com equações de segundo grau e funções quadráticas. Tenho prova na próxima semana.",
    urgencia: "alta",
    status: "pendente",
    criadaEm: "2024-01-20T10:30:00Z",
  },
  {
    id: "sol-2",
    alunoId: "aluno-2",
    aluno: {
      ...alunoMock,
      id: "aluno-2",
      nome: "João Pedro Santos",
      email: "joao.santos@email.com",
      serie: "7º ano",
      metricas: {
        totalAulas: 0,
        taxaPresenca: 0,
        primeiraVez: true,
      },
    },
    materia: "portugues",
    descricao: "Dificuldade com interpretação de texto e gramática básica.",
    urgencia: "media",
    status: "pendente",
    criadaEm: "2024-01-19T14:00:00Z",
  },
  {
    id: "sol-3",
    alunoId: "aluno-3",
    aluno: {
      ...alunoMock,
      id: "aluno-3",
      nome: "Larissa Oliveira",
      email: "larissa.oliveira@email.com",
      serie: "1º ano EM",
      metricas: {
        totalAulas: 5,
        taxaPresenca: 100,
        ultimaAula: "2024-01-10",
        primeiraVez: false,
      },
    },
    materia: "quimica",
    descricao: "Não entendo balanceamento de equações químicas e estequiometria.",
    urgencia: "alta",
    status: "aceita",
    professorId: "prof-2",
    professor: professoresMock[1],
    criadaEm: "2024-01-18T09:15:00Z",
  },
]

export const aulasMock: Aula[] = [
  {
    id: "aula-1",
    solicitacaoId: "sol-3",
    alunoId: "aluno-3",
    professorId: "prof-2",
    materia: "quimica",
    dataHora: "2024-01-22T15:00:00Z",
    duracao: 60,
    modalidade: "online",
    status: "agendada",
    linkSala: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "aula-2",
    solicitacaoId: "sol-old",
    alunoId: "aluno-1",
    professorId: "prof-1",
    materia: "matematica",
    dataHora: "2024-01-15T14:00:00Z",
    duracao: 45,
    modalidade: "online",
    status: "concluida",
    avaliacaoAluno: {
      id: "av-1",
      aulaId: "aula-2",
      avaliadorId: "aluno-1",
      avaliadoId: "prof-1",
      nota: 5,
      comentario: "Excelente professor! Explicou muito bem.",
      criadaEm: "2024-01-15T15:00:00Z",
    },
    avaliacaoProfessor: {
      id: "av-2",
      aulaId: "aula-2",
      avaliadorId: "prof-1",
      avaliadoId: "aluno-1",
      nota: 5,
      comentario: "Aluna dedicada e participativa.",
      criadaEm: "2024-01-15T15:05:00Z",
    },
  },
]

export const conversasMock: Conversa[] = [
  {
    id: "conv-1",
    participantes: ["aluno-1", "prof-1"],
    mensagens: [
      {
        id: "msg-1",
        remetenteId: "aluno-1",
        destinatarioId: "prof-1",
        conteudo: "Olá professor! Tudo bem?",
        lida: true,
        criadaEm: "2024-01-20T10:00:00Z",
      },
      {
        id: "msg-2",
        remetenteId: "prof-1",
        destinatarioId: "aluno-1",
        conteudo: "Olá Maria! Tudo ótimo, e você? Vi sua solicitação de ajuda em matemática.",
        lida: true,
        criadaEm: "2024-01-20T10:05:00Z",
      },
      {
        id: "msg-3",
        remetenteId: "aluno-1",
        destinatarioId: "prof-1",
        conteudo: "Estou bem! Sim, estou com dificuldade em equações de segundo grau.",
        lida: true,
        criadaEm: "2024-01-20T10:07:00Z",
      },
      {
        id: "msg-4",
        remetenteId: "prof-1",
        destinatarioId: "aluno-1",
        conteudo: "Posso te ajudar com isso! Que tal agendarmos uma aula para amanhã às 15h?",
        lida: false,
        criadaEm: "2024-01-20T10:10:00Z",
      },
    ],
  },
]

// Helpers
export function getProfessorById(id: string): Professor | undefined {
  return professoresMock.find((p) => p.id === id)
}

export function getAlunoById(id: string): Aluno | undefined {
  if (id === alunoMock.id) return alunoMock
  const solicitacao = solicitacoesMock.find((s) => s.alunoId === id)
  return solicitacao?.aluno
}

export function getMateriaById(id: string): Materia | undefined {
  return materias.find((m) => m.id === id)
}

export function getSolicitacoesByProfessor(professorId: string): Solicitacao[] {
  return solicitacoesMock.filter(
    (s) => s.status === "pendente" || s.professorId === professorId
  )
}

export function getAulasByProfessor(professorId: string): Aula[] {
  return aulasMock.filter((a) => a.professorId === professorId)
}

export function getAulasByAluno(alunoId: string): Aula[] {
  return aulasMock.filter((a) => a.alunoId === alunoId)
}

"use client"

import { use, useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { ChatBubble } from "@/components/educonecta/chat-bubble"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProfessorById, conversasMock } from "@/lib/data/mock-data"
import { useAuthStore } from "@/lib/store/auth-store"
import { Send, Paperclip, Phone, Video } from "lucide-react"
import type { Mensagem } from "@/lib/types"

export default function ChatAlunoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { user } = useAuthStore()
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Mensagem[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const professor = getProfessorById(id)

  // Carrega mensagens existentes
  useEffect(() => {
    const conversa = conversasMock.find(
      (c) =>
        c.participantes.includes(user?.id || "") &&
        c.participantes.includes(id)
    )
    if (conversa) {
      setMessages(conversa.mensagens)
    }
  }, [id, user?.id])

  // Scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!professor) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <p className="text-muted-foreground">Professor não encontrado</p>
        <Button variant="link" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    )
  }

  const initials = professor.nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const handleSend = () => {
    if (!newMessage.trim() || !user) return

    const novaMensagem: Mensagem = {
      id: `msg-${Date.now()}`,
      remetenteId: user.id,
      destinatarioId: id,
      conteudo: newMessage.trim(),
      lida: false,
      criadaEm: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, novaMensagem])
    setNewMessage("")

    // Simula resposta automática após 2 segundos
    setTimeout(() => {
      const respostaAutomatica: Mensagem = {
        id: `msg-${Date.now() + 1}`,
        remetenteId: id,
        destinatarioId: user.id,
        conteudo: "Recebi sua mensagem! Vou responder em breve.",
        lida: false,
        criadaEm: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, respostaAutomatica])
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header customizado */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={professor.avatar} alt={professor.nome} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{professor.nome}</p>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto bg-muted/30 p-4">
        <div className="space-y-4">
          {messages.map((mensagem) => (
            <ChatBubble
              key={mensagem.id}
              content={mensagem.conteudo}
              isOwn={mensagem.remetenteId === user?.id}
              senderName={
                mensagem.remetenteId === user?.id ? user?.nome : professor.nome
              }
              senderAvatar={
                mensagem.remetenteId === user?.id
                  ? user?.avatar
                  : professor.avatar
              }
              timestamp={mensagem.criadaEm}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input de mensagem */}
      <div className="border-t bg-card p-4 pb-safe">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button
            size="icon"
            disabled={!newMessage.trim()}
            onClick={handleSend}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

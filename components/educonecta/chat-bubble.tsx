"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ChatBubbleProps {
  content: string
  isOwn: boolean
  senderName?: string
  senderAvatar?: string
  timestamp: string
  showAvatar?: boolean
  className?: string
}

export function ChatBubble({
  content,
  isOwn,
  senderName,
  senderAvatar,
  timestamp,
  showAvatar = true,
  className,
}: ChatBubbleProps) {
  const initials = senderName
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?"

  const formattedTime = format(new Date(timestamp), "HH:mm", { locale: ptBR })

  return (
    <div
      className={cn(
        "flex gap-2",
        isOwn ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {showAvatar && !isOwn && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={senderAvatar} alt={senderName} />
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "flex max-w-[75%] flex-col",
          isOwn ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2",
            isOwn
              ? "rounded-br-md bg-primary text-primary-foreground"
              : "rounded-bl-md bg-muted"
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        </div>
        <span className="mt-1 text-[10px] text-muted-foreground">
          {formattedTime}
        </span>
      </div>

      {showAvatar && isOwn && <div className="w-8 shrink-0" />}
    </div>
  )
}

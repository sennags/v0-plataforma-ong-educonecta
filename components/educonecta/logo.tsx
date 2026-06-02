"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 48, text: "text-3xl" },
  }

  const { icon, text } = sizes[size]

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Livro aberto */}
        <rect
          x="4"
          y="12"
          width="40"
          height="28"
          rx="4"
          className="fill-primary"
        />
        {/* Linha do meio do livro */}
        <line
          x1="24"
          y1="12"
          x2="24"
          y2="40"
          stroke="white"
          strokeWidth="2"
        />
        {/* Linhas de texto esquerda */}
        <line x1="8" y1="20" x2="20" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="26" x2="18" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="32" x2="16" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* Linhas de texto direita */}
        <line x1="28" y1="20" x2="40" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="26" x2="38" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="32" x2="36" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* Pessoa conectada - círculo acima */}
        <circle cx="24" cy="6" r="5" className="fill-accent" />
        <circle cx="24" cy="5" r="2" fill="white" />
      </svg>
      {showText && (
        <span className={cn("font-bold tracking-tight", text)}>
          <span className="text-primary">Edu</span>
          <span className="text-accent">conecta</span>
        </span>
      )}
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/educonecta/header"
import { BottomNav } from "@/components/educonecta/bottom-nav"
import { StudentCard } from "@/components/educonecta/student-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { solicitacoesMock } from "@/lib/data/mock-data"

export default function SolicitacoesPage() {
  const router = useRouter()

  const solicitacoesPendentes = solicitacoesMock.filter(
    (s) => s.status === "pendente"
  )
  const solicitacoesAceitas = solicitacoesMock.filter(
    (s) => s.status === "aceita" || s.status === "em_andamento"
  )
  const solicitacoesConcluidas = solicitacoesMock.filter(
    (s) => s.status === "concluida"
  )

  return (
    <div className="min-h-screen pb-20">
      <Header title="Solicitações" showLogo />

      <main className="p-4">
        <Tabs defaultValue="pendentes">
          <TabsList className="w-full">
            <TabsTrigger value="pendentes" className="flex-1">
              Pendentes ({solicitacoesPendentes.length})
            </TabsTrigger>
            <TabsTrigger value="aceitas" className="flex-1">
              Aceitas ({solicitacoesAceitas.length})
            </TabsTrigger>
            <TabsTrigger value="concluidas" className="flex-1">
              Concluídas ({solicitacoesConcluidas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pendentes" className="mt-4 space-y-3">
            {solicitacoesPendentes.length > 0 ? (
              solicitacoesPendentes.map((solicitacao) => (
                <StudentCard
                  key={solicitacao.id}
                  solicitacao={solicitacao}
                  onClick={() =>
                    router.push(`/professor/solicitacao/${solicitacao.id}`)
                  }
                />
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhuma solicitação pendente
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="aceitas" className="mt-4 space-y-3">
            {solicitacoesAceitas.length > 0 ? (
              solicitacoesAceitas.map((solicitacao) => (
                <StudentCard
                  key={solicitacao.id}
                  solicitacao={solicitacao}
                  onClick={() =>
                    router.push(`/professor/solicitacao/${solicitacao.id}`)
                  }
                />
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhuma solicitação aceita
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="concluidas" className="mt-4 space-y-3">
            {solicitacoesConcluidas.length > 0 ? (
              solicitacoesConcluidas.map((solicitacao) => (
                <StudentCard
                  key={solicitacao.id}
                  solicitacao={solicitacao}
                  onClick={() =>
                    router.push(`/professor/solicitacao/${solicitacao.id}`)
                  }
                />
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhuma solicitação concluída
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  )
}

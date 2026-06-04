"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function TermosPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Termos de Uso</h1>
        </div>
      </header>

      <div className="container max-w-3xl mx-auto px-4 py-8">
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground mb-6">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground mb-4">
              Ao acessar e usar a plataforma EduConecta, você concorda em cumprir e estar sujeito a estes Termos de Uso. 
              Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">2. Descrição do Serviço</h2>
            <p className="text-muted-foreground mb-4">
              O EduConecta é uma plataforma educacional sem fins lucrativos que conecta alunos de escolas públicas 
              a professores voluntários para aulas de reforço gratuitas. Nossa missão é democratizar o acesso 
              à educação de qualidade.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">3. Elegibilidade</h2>
            <div className="text-muted-foreground space-y-2">
              <p><strong>Para Alunos:</strong></p>
              <ul className="list-disc pl-6 mb-4">
                <li>Estar matriculado em escola pública</li>
                <li>Ter entre 10 e 18 anos (menores precisam de autorização do responsável)</li>
                <li>Fornecer documentação válida quando solicitado</li>
              </ul>
              <p><strong>Para Professores Voluntários:</strong></p>
              <ul className="list-disc pl-6">
                <li>Ter mais de 18 anos</li>
                <li>Possuir conhecimento comprovável nas matérias que deseja ensinar</li>
                <li>Concordar com o código de conduta da plataforma</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">4. Cadastro e Conta</h2>
            <p className="text-muted-foreground mb-4">
              Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas 
              as atividades realizadas em sua conta. Você concorda em notificar imediatamente o EduConecta 
              sobre qualquer uso não autorizado de sua conta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">5. Conduta do Usuário</h2>
            <p className="text-muted-foreground mb-2">Ao usar o EduConecta, você concorda em:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Fornecer informações verdadeiras e precisas</li>
              <li>Tratar todos os usuários com respeito e dignidade</li>
              <li>Não compartilhar conteúdo ofensivo, discriminatório ou ilegal</li>
              <li>Não usar a plataforma para fins comerciais ou de publicidade</li>
              <li>Comparecer às aulas agendadas ou cancelar com antecedência mínima de 2 horas</li>
              <li>Não solicitar ou compartilhar informações pessoais fora da plataforma</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">6. Aulas e Agendamentos</h2>
            <p className="text-muted-foreground mb-4">
              As aulas são realizadas exclusivamente através da plataforma EduConecta. Não é permitido 
              o contato direto entre alunos e professores fora da plataforma por motivos de segurança. 
              Cancelamentos frequentes sem justificativa podem resultar em suspensão da conta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">7. Propriedade Intelectual</h2>
            <p className="text-muted-foreground mb-4">
              Todo o conteúdo disponibilizado na plataforma, incluindo materiais didáticos, é protegido 
              por direitos autorais. Os materiais compartilhados por professores voluntários permanecem 
              de sua autoria, mas podem ser utilizados pela plataforma para fins educacionais.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">8. Limitação de Responsabilidade</h2>
            <p className="text-muted-foreground mb-4">
              O EduConecta não garante resultados acadêmicos específicos. A plataforma é fornecida 
              &quot;como está&quot; e não nos responsabilizamos por interrupções no serviço, erros técnicos 
              ou conteúdo gerado por usuários.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">9. Certificados para Voluntários</h2>
            <p className="text-muted-foreground mb-4">
              Professores voluntários que completarem um mínimo de 20 horas de aulas com avaliação 
              positiva receberão um certificado de horas complementares, que pode ser utilizado para 
              fins acadêmicos conforme regulamentação de cada instituição.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">10. Modificações dos Termos</h2>
            <p className="text-muted-foreground mb-4">
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
              As alterações entrarão em vigor imediatamente após a publicação. O uso continuado 
              da plataforma após as modificações constitui aceitação dos novos termos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">11. Contato</h2>
            <p className="text-muted-foreground mb-4">
              Para dúvidas sobre estes Termos de Uso, entre em contato conosco através do e-mail: 
              <a href="mailto:contato@educonecta.org.br" className="text-primary hover:underline ml-1">
                contato@educonecta.org.br
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

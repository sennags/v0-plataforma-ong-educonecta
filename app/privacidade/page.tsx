"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function PrivacidadePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Política de Privacidade</h1>
        </div>
      </header>

      <div className="container max-w-3xl mx-auto px-4 py-8">
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground mb-6">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">1. Introdução</h2>
            <p className="text-muted-foreground mb-4">
              O EduConecta está comprometido em proteger sua privacidade. Esta Política de Privacidade 
              explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais em 
              conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">2. Dados que Coletamos</h2>
            <div className="text-muted-foreground space-y-4">
              <div>
                <p className="font-medium text-foreground">Dados de Identificação:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Nome completo</li>
                  <li>CPF (para verificação de identidade)</li>
                  <li>Data de nascimento</li>
                  <li>E-mail e telefone</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground">Dados Acadêmicos (para alunos):</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Escola em que está matriculado</li>
                  <li>Série/ano escolar</li>
                  <li>Matérias de interesse</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground">Dados Profissionais (para professores):</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Formação acadêmica</li>
                  <li>Áreas de conhecimento</li>
                  <li>Experiência profissional</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground">Dados de Uso:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Histórico de aulas</li>
                  <li>Mensagens trocadas na plataforma</li>
                  <li>Avaliações realizadas</li>
                  <li>Logs de acesso</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">3. Como Usamos seus Dados</h2>
            <p className="text-muted-foreground mb-2">Utilizamos suas informações para:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Criar e gerenciar sua conta na plataforma</li>
              <li>Conectar alunos a professores compatíveis</li>
              <li>Agendar e gerenciar aulas</li>
              <li>Enviar notificações sobre aulas e mensagens</li>
              <li>Emitir certificados para professores voluntários</li>
              <li>Melhorar nossos serviços e experiência do usuário</li>
              <li>Garantir a segurança da plataforma</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">4. Base Legal para Tratamento</h2>
            <p className="text-muted-foreground mb-2">
              O tratamento dos seus dados é realizado com base nas seguintes hipóteses legais da LGPD:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Consentimento:</strong> ao aceitar esta política e os termos de uso</li>
              <li><strong>Execução de contrato:</strong> para prestação dos serviços educacionais</li>
              <li><strong>Interesse legítimo:</strong> para melhorar nossos serviços</li>
              <li><strong>Cumprimento de obrigação legal:</strong> quando exigido por lei</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">5. Compartilhamento de Dados</h2>
            <p className="text-muted-foreground mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros 
              para fins comerciais. Seus dados podem ser compartilhados apenas:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Entre alunos e professores, limitado às informações necessárias para as aulas</li>
              <li>Com prestadores de serviços essenciais (hospedagem, e-mail) sob contrato de confidencialidade</li>
              <li>Quando exigido por lei ou ordem judicial</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">6. Proteção de Menores</h2>
            <p className="text-muted-foreground mb-4">
              Levamos muito a sério a proteção de crianças e adolescentes. Para usuários menores de 18 anos:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Exigimos autorização do responsável legal para cadastro</li>
              <li>Limitamos as informações pessoais visíveis para outros usuários</li>
              <li>Monitoramos interações para garantir ambiente seguro</li>
              <li>Responsáveis podem solicitar acesso aos dados do menor a qualquer momento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">7. Segurança dos Dados</h2>
            <p className="text-muted-foreground mb-4">
              Implementamos medidas técnicas e organizacionais para proteger seus dados:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Criptografia de dados em trânsito e em repouso</li>
              <li>Controle de acesso baseado em funções</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares</li>
              <li>Treinamento da equipe em proteção de dados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">8. Seus Direitos (LGPD)</h2>
            <p className="text-muted-foreground mb-2">
              Você tem os seguintes direitos em relação aos seus dados pessoais:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Acesso:</strong> solicitar cópia dos seus dados</li>
              <li><strong>Correção:</strong> corrigir dados incompletos ou desatualizados</li>
              <li><strong>Anonimização:</strong> solicitar anonimização de dados desnecessários</li>
              <li><strong>Portabilidade:</strong> receber seus dados em formato estruturado</li>
              <li><strong>Eliminação:</strong> solicitar exclusão dos seus dados</li>
              <li><strong>Revogação:</strong> retirar seu consentimento a qualquer momento</li>
              <li><strong>Informação:</strong> saber com quem seus dados foram compartilhados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">9. Retenção de Dados</h2>
            <p className="text-muted-foreground mb-4">
              Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas nesta política:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Dados de conta: enquanto a conta estiver ativa</li>
              <li>Histórico de aulas: 5 anos após a última aula</li>
              <li>Dados para certificados: 10 anos</li>
              <li>Após exclusão da conta: dados anonimizados podem ser mantidos para estatísticas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">10. Cookies e Tecnologias</h2>
            <p className="text-muted-foreground mb-4">
              Utilizamos cookies essenciais para o funcionamento da plataforma:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Cookies de sessão para manter você logado</li>
              <li>Cookies de preferências para lembrar suas configurações</li>
              <li>Não utilizamos cookies de rastreamento ou publicidade</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">11. Alterações nesta Política</h2>
            <p className="text-muted-foreground mb-4">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre 
              mudanças significativas por e-mail ou através de aviso na plataforma. Recomendamos revisar 
              esta página regularmente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">12. Contato do Encarregado (DPO)</h2>
            <p className="text-muted-foreground mb-4">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato 
              com nosso Encarregado de Proteção de Dados:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg text-muted-foreground">
              <p><strong>E-mail:</strong> privacidade@educonecta.org.br</p>
              <p><strong>Endereço:</strong> [Endereço da ONG]</p>
              <p className="mt-2 text-sm">
                Responderemos sua solicitação em até 15 dias úteis, conforme previsto na LGPD.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

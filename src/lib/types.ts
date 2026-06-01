export interface ProposalData {
  id?: string
  clientName: string
  companyName: string
  contractDuration: number
  installments?: number
  totalContractValue: number
  originalPrice?: number
  monthlyFee: number
  adBudget: number
  deliverables: string[]
  observations?: string
  date: string
  status?: 'draft' | 'sent'
  createdAt?: string
  updatedAt?: string
}

export const DEFAULT_DELIVERABLES = [
  'Campanhas de tráfego pago',
  'Campanhas ilimitadas',
  'Suporte direto com o gestor e estrategista da conta',
  'Grupo com todos os responsáveis do projeto',
  'Criação de landing page profissional',
  'Gestão e otimização do Google Meu Negócio',
  'Reuniões de alinhamento estratégico',
  'Relatórios semanais completos de performance',
]

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatCurrencyFull(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

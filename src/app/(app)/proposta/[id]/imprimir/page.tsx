import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProposalData } from '@/lib/types'
import PrintView from './PrintView'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ImprimirPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: proposal, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !proposal) notFound()

  const proposalData: ProposalData = {
    id: proposal.id,
    clientName: proposal.client_name,
    companyName: proposal.company_name ?? '',
    contractDuration: proposal.contract_duration ?? 6,
    totalContractValue: proposal.total_contract_value ?? 0,
    originalPrice: proposal.original_price ?? undefined,
    monthlyFee: proposal.monthly_fee ?? 0,
    adBudget: proposal.ad_budget ?? 0,
    deliverables: proposal.deliverables ?? [],
    observations: proposal.observations ?? '',
    date: proposal.date ?? '',
    status: proposal.status ?? 'draft',
  }

  return <PrintView data={proposalData} />
}

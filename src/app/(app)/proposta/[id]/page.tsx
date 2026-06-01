import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProposalForm from '@/components/forms/ProposalForm'
import { ProposalData } from '@/lib/types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProposalPage({ params }: Props) {
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
    installments: proposal.installments ?? undefined,
    totalContractValue: proposal.total_contract_value ?? 0,
    originalPrice: proposal.original_price ?? undefined,
    monthlyFee: proposal.monthly_fee ?? 0,
    adBudget: proposal.ad_budget ?? 0,
    deliverables: proposal.deliverables ?? [],
    observations: proposal.observations ?? '',
    date: proposal.date ?? '',
    status: proposal.status ?? 'draft',
    createdAt: proposal.created_at,
    updatedAt: proposal.updated_at,
  }

  return (
    <div className="h-screen flex flex-col">
      <ProposalForm initialData={proposalData} proposalId={id} />
    </div>
  )
}

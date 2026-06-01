'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProposalData, DEFAULT_DELIVERABLES, formatCurrency } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import ProposalPage1 from '@/components/proposal/ProposalPage1'
import ProposalPage2 from '@/components/proposal/ProposalPage2'
import ProposalPage3 from '@/components/proposal/ProposalPage3'
import ProposalPage4 from '@/components/proposal/ProposalPage4'
import ProposalPage5 from '@/components/proposal/ProposalPage5'
import { toast } from 'sonner'
import { Plus, X, Eye, Save, Printer } from 'lucide-react'

const emptyProposal: ProposalData = {
  clientName: '',
  companyName: '',
  contractDuration: 6,
  installments: undefined,
  totalContractValue: 0,
  originalPrice: undefined,
  monthlyFee: 0,
  adBudget: 0,
  deliverables: [...DEFAULT_DELIVERABLES],
  observations: '',
  date: new Date().toLocaleDateString('pt-BR'),
  status: 'draft',
}

interface Props {
  initialData?: Partial<ProposalData>
  proposalId?: string
}

export default function ProposalForm({ initialData, proposalId }: Props) {
  const [data, setData] = useState<ProposalData>({ ...emptyProposal, ...initialData })
  const [saving, setSaving] = useState(false)
  const [customDeliverable, setCustomDeliverable] = useState('')
  const [activePreviewPage, setActivePreviewPage] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  async function handlePrint() {
    let id = proposalId
    // Save first if not yet persisted
    if (!id) {
      if (!data.clientName) { toast.error('Salve a proposta antes de exportar'); return }
      setSaving(true)
      try {
        const payload = {
          user_id: null,
          client_name: data.clientName,
          company_name: data.companyName,
          contract_duration: data.contractDuration,
          installments: data.installments || null,
          total_contract_value: data.totalContractValue,
          original_price: data.originalPrice || null,
          monthly_fee: data.monthlyFee,
          ad_budget: data.adBudget,
          deliverables: data.deliverables,
          observations: data.observations,
          date: data.date,
          status: data.status || 'draft',
        }
        const { data: saved, error } = await supabase.from('proposals').insert(payload).select().single()
        if (error) throw error
        id = saved.id
        router.push(`/proposta/${saved.id}`)
      } catch {
        toast.error('Erro ao salvar proposta')
        setSaving(false)
        return
      }
      setSaving(false)
    }
    toast.loading('Gerando PDF...', { id: 'pdf' })
    window.location.href = `/api/pdf/${id}?name=${encodeURIComponent(data.clientName)}`
    setTimeout(() => toast.dismiss('pdf'), 3000)
  }

  function update<K extends keyof ProposalData>(key: K, value: ProposalData[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  function toggleDeliverable(item: string) {
    setData(prev => ({
      ...prev,
      deliverables: prev.deliverables.includes(item)
        ? prev.deliverables.filter(d => d !== item)
        : [...prev.deliverables, item],
    }))
  }

  function addCustomDeliverable() {
    const trimmed = customDeliverable.trim()
    if (!trimmed || data.deliverables.includes(trimmed)) return
    setData(prev => ({ ...prev, deliverables: [...prev.deliverables, trimmed] }))
    setCustomDeliverable('')
  }

  function removeDeliverable(item: string) {
    setData(prev => ({ ...prev, deliverables: prev.deliverables.filter(d => d !== item) }))
  }

  async function handleSave() {
    if (!data.clientName) { toast.error('Informe o nome do cliente'); return }
    setSaving(true)
    try {
      const payload = {
        user_id: null,
        client_name: data.clientName,
        company_name: data.companyName,
        contract_duration: data.contractDuration,
        installments: data.installments || null,
        total_contract_value: data.totalContractValue,
        original_price: data.originalPrice || null,
        monthly_fee: data.monthlyFee,
        ad_budget: data.adBudget,
        deliverables: data.deliverables,
        observations: data.observations,
        date: data.date,
        status: data.status || 'draft',
      }

      if (proposalId) {
        const { error } = await supabase.from('proposals').update(payload).eq('id', proposalId)
        if (error) throw error
        toast.success('Proposta atualizada!')
      } else {
        const { data: saved, error } = await supabase.from('proposals').insert(payload).select().single()
        if (error) throw error
        toast.success('Proposta salva!')
        router.push(`/proposta/${saved.id}`)
      }
    } catch (err: unknown) {
      const e = err as Record<string, unknown>
      console.error('Erro ao salvar:', e?.message ?? e?.details ?? JSON.stringify(e))
      toast.error('Erro ao salvar proposta')
    } finally {
      setSaving(false)
    }
  }

  const totalMonthly = (data.monthlyFee || 0) + (data.adBudget || 0)
  const previewPages = ['Capa', 'Sobre nós', 'Entregáveis', 'Investimento', 'Resumo']

  const previewComponents = [
    <ProposalPage1 key="p1" data={data} />,
    <ProposalPage2 key="p2" />,
    <ProposalPage3 key="p3" data={data} />,
    <ProposalPage4 key="p4" data={data} />,
    <ProposalPage5 key="p5" data={data} />,
  ]

  return (
    <div className="flex h-full">
      {/* Left: Form */}
      <div className="w-[440px] shrink-0 overflow-y-auto border-r border-white/8 bg-[#111111]">
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-white font-bold text-lg">
              {proposalId ? 'Editar Proposta' : 'Nova Proposta'}
            </h1>
            <p className="text-white/40 text-sm mt-1">Preencha os campos abaixo</p>
          </div>

          {/* Client info */}
          <section className="space-y-3">
            <h2 className="text-[#FF4500] text-xs font-semibold uppercase tracking-widest">Cliente</h2>
            <div className="space-y-3">
              <div>
                <Label className="text-white/60 text-xs mb-1 block">Nome do cliente *</Label>
                <Input
                  value={data.clientName}
                  onChange={e => update('clientName', e.target.value)}
                  placeholder="Ex: João Silva"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                />
              </div>
              <div>
                <Label className="text-white/60 text-xs mb-1 block">Empresa</Label>
                <Input
                  value={data.companyName}
                  onChange={e => update('companyName', e.target.value)}
                  placeholder="Ex: Tech Solutions Ltda"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                />
              </div>
              <div>
                <Label className="text-white/60 text-xs mb-1 block">Data da proposta</Label>
                <Input
                  value={data.date}
                  onChange={e => update('date', e.target.value)}
                  placeholder="Ex: 15/05/2025"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                />
              </div>
            </div>
          </section>

          {/* Financial */}
          <section className="space-y-3">
            <h2 className="text-[#FF4500] text-xs font-semibold uppercase tracking-widest">Investimento</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/60 text-xs mb-1 block">Honorários/mês (R$)</Label>
                <Input
                  type="number"
                  value={data.monthlyFee || ''}
                  onChange={e => update('monthlyFee', Number(e.target.value))}
                  placeholder="500"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                />
              </div>
              <div>
                <Label className="text-white/60 text-xs mb-1 block">Verba de anúncios (R$)</Label>
                <Input
                  type="number"
                  value={data.adBudget || ''}
                  onChange={e => update('adBudget', Number(e.target.value))}
                  placeholder="1200"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                />
              </div>
              <div>
                <Label className="text-white/60 text-xs mb-1 block">Prazo do contrato (meses)</Label>
                <Input
                  type="number"
                  value={data.contractDuration || ''}
                  onChange={e => update('contractDuration', Number(e.target.value))}
                  placeholder="6"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                />
              </div>
              <div>
                <Label className="text-white/60 text-xs mb-1 block">Parcelamento (nº parcelas)</Label>
                <Input
                  type="number"
                  value={data.installments || ''}
                  onChange={e => update('installments', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Ex: 12"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-white/60 text-xs mb-1 block">Valor total contrato (R$)</Label>
                <Input
                  type="number"
                  value={data.totalContractValue || ''}
                  onChange={e => update('totalContractValue', Number(e.target.value))}
                  placeholder="6000"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-white/60 text-xs mb-1 block">Preço riscado (R$) — opcional</Label>
                <Input
                  type="number"
                  value={data.originalPrice || ''}
                  onChange={e => update('originalPrice', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="7200"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25"
                />
              </div>
            </div>
            {totalMonthly > 0 && (
              <div className="bg-[#FF4500]/10 border border-[#FF4500]/20 rounded-lg px-4 py-3">
                <p className="text-white/50 text-xs">Total mensal calculado</p>
                <p className="text-white font-bold text-xl">{formatCurrency(totalMonthly)}/mês</p>
              </div>
            )}
          </section>

          {/* Deliverables */}
          <section className="space-y-3">
            <h2 className="text-[#FF4500] text-xs font-semibold uppercase tracking-widest">Entregáveis</h2>
            <div className="space-y-2">
              {DEFAULT_DELIVERABLES.map(item => (
                <label key={item} className="flex items-center gap-2.5 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => toggleDeliverable(item)}
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                      data.deliverables.includes(item)
                        ? 'bg-[#FF4500] border-[#FF4500]'
                        : 'border-white/20 bg-white/5'
                    }`}
                  >
                    {data.deliverables.includes(item) && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <span
                    onClick={() => toggleDeliverable(item)}
                    className={`text-sm transition-colors select-none ${data.deliverables.includes(item) ? 'text-white' : 'text-white/40'}`}
                  >
                    {item}
                  </span>
                </label>
              ))}
            </div>

            {/* Custom deliverables */}
            {data.deliverables.filter(d => !DEFAULT_DELIVERABLES.includes(d)).map(item => (
              <div key={item} className="flex items-center gap-2 bg-[#FF4500]/10 border border-[#FF4500]/20 rounded-lg px-3 py-2">
                <span className="text-white text-sm flex-1">{item}</span>
                <button onClick={() => removeDeliverable(item)} className="text-white/40 hover:text-white">
                  <X size={14} />
                </button>
              </div>
            ))}

            <div className="flex gap-2">
              <Input
                value={customDeliverable}
                onChange={e => setCustomDeliverable(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomDeliverable()}
                placeholder="Adicionar entregável personalizado..."
                className="bg-white/5 border-white/10 text-white placeholder:text-white/25 text-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addCustomDeliverable}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 shrink-0"
              >
                <Plus size={16} />
              </Button>
            </div>
          </section>

          {/* Observations */}
          <section className="space-y-3">
            <h2 className="text-[#FF4500] text-xs font-semibold uppercase tracking-widest">Observações</h2>
            <Textarea
              value={data.observations}
              onChange={e => update('observations', e.target.value)}
              placeholder="Condições especiais, validade da proposta, etc."
              rows={3}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/25 resize-none"
            />
          </section>

          {/* Actions */}
          <div className="flex gap-3 pb-4">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-[#FF4500] hover:bg-[#E03D00] text-white font-semibold"
            >
              <Save size={15} className="mr-2" />
              {saving ? 'Salvando...' : 'Salvar Proposta'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handlePrint}
              title="Exportar PDF"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <Printer size={15} />
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="flex-1 overflow-hidden flex flex-col bg-[#0A0A0A]">
        {/* Preview tabs */}
        <div className="flex items-center gap-1 px-6 py-3 border-b border-white/8 bg-[#111111]">
          <Eye size={14} className="text-white/40 mr-2" />
          {previewPages.map((label, i) => (
            <button
              key={i}
              onClick={() => setActivePreviewPage(i)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activePreviewPage === i
                  ? 'bg-[#FF4500]/15 text-[#FF4500]'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Scaled preview */}
        <div className="flex-1 overflow-auto flex items-start justify-center p-8">
          <div
            style={{
              transform: 'scale(0.52)',
              transformOrigin: 'top center',
              width: 'fit-content',
            }}
          >
            <div style={{ borderRadius: 8, boxShadow: '0 20px 60px rgba(0,0,0,0.8)', overflow: 'hidden' }}>
              {previewComponents[activePreviewPage]}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { formatCurrency } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Search, Plus, Trash2, Copy, Edit2, ExternalLink } from 'lucide-react'

interface Proposal {
  id: string
  client_name: string
  company_name: string | null
  monthly_fee: number | null
  ad_budget: number | null
  status: string
  created_at: string
  date: string | null
}

interface Props {
  proposals: Proposal[]
}

export default function DashboardClient({ proposals: initialProposals }: Props) {
  const [proposals, setProposals] = useState(initialProposals)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const filtered = proposals.filter(p => {
    const matchSearch =
      p.client_name.toLowerCase().includes(search.toLowerCase()) ||
      (p.company_name ?? '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  async function handleDelete(id: string) {
    if (!confirm('Excluir esta proposta? Esta ação não pode ser desfeita.')) return
    setDeletingId(id)
    const { error } = await supabase.from('proposals').delete().eq('id', id)
    if (error) {
      toast.error('Erro ao excluir proposta')
    } else {
      setProposals(prev => prev.filter(p => p.id !== id))
      toast.success('Proposta excluída')
    }
    setDeletingId(null)
  }

  async function handleDuplicate(id: string) {
    const { data: original } = await supabase.from('proposals').select('*').eq('id', id).single()
    if (!original) return
    const { id: _id, created_at, updated_at, ...rest } = original
    const { data: copy, error } = await supabase
      .from('proposals')
      .insert({ ...rest, client_name: `${rest.client_name} (cópia)`, status: 'draft' })
      .select()
      .single()
    if (error) { toast.error('Erro ao duplicar'); return }
    setProposals(prev => [copy, ...prev])
    toast.success('Proposta duplicada!')
    router.push(`/proposta/${copy.id}`)
  }

  function handleCopyLink(id: string) {
    const url = `${window.location.origin}/p/${id}`
    navigator.clipboard.writeText(url)
    toast.success('Link copiado!')
  }

  async function handleToggleStatus(id: string, current: string) {
    const next = current === 'sent' ? 'draft' : 'sent'
    const { error } = await supabase.from('proposals').update({ status: next }).eq('id', id)
    if (!error) {
      setProposals(prev => prev.map(p => p.id === id ? { ...p, status: next } : p))
    }
  }

  const totalProposals = proposals.length
  const sentProposals = proposals.filter(p => p.status === 'sent').length
  const totalValue = proposals.reduce((sum, p) => sum + ((p.monthly_fee ?? 0) + (p.ad_budget ?? 0)), 0)

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-2xl">Propostas</h1>
          <p className="text-white/40 text-sm mt-1">Gerencie todas as suas propostas comerciais</p>
        </div>
        <Link href="/nova">
          <Button className="bg-[#FF4500] hover:bg-[#E03D00] text-white font-semibold">
            <Plus size={16} className="mr-2" />
            Nova Proposta
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total de propostas', value: totalProposals },
          { label: 'Enviadas', value: sentProposals },
          { label: 'Valor médio/mês', value: totalProposals > 0 ? formatCurrency(totalValue / totalProposals) : 'R$ 0' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#1A1A1A] border border-white/8 rounded-xl p-5">
            <p className="text-white/40 text-xs uppercase tracking-wide">{stat.label}</p>
            <p className="text-white font-bold text-2xl mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por cliente ou empresa..."
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/25"
          />
        </div>
        {['all', 'draft', 'sent'].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === s
                ? 'bg-[#FF4500]/15 text-[#FF4500] border border-[#FF4500]/25'
                : 'text-white/40 hover:text-white border border-white/8 hover:border-white/15'
            }`}
          >
            {s === 'all' ? 'Todas' : s === 'draft' ? 'Rascunho' : 'Enviadas'}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/30 text-sm">
            {proposals.length === 0 ? 'Nenhuma proposta criada ainda.' : 'Nenhuma proposta encontrada.'}
          </p>
          {proposals.length === 0 && (
            <Link href="/nova">
              <Button className="mt-4 bg-[#FF4500] hover:bg-[#E03D00] text-white">
                Criar primeira proposta
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-[#1A1A1A] border border-white/8 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left px-5 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide">Cliente</th>
                <th className="text-left px-5 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide">Empresa</th>
                <th className="text-right px-5 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide">Total/mês</th>
                <th className="text-center px-5 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide">Status</th>
                <th className="text-right px-5 py-3 text-white/40 text-xs font-semibold uppercase tracking-wide">Data</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const total = (p.monthly_fee ?? 0) + (p.ad_budget ?? 0)
                return (
                  <tr key={p.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="px-5 py-4">
                      <span className="text-white font-medium text-sm">{p.client_name}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white/50 text-sm">{p.company_name || '—'}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-white font-semibold text-sm">{total > 0 ? formatCurrency(total) : '—'}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button onClick={() => handleToggleStatus(p.id, p.status)}>
                        <Badge
                          className={`text-xs cursor-pointer ${
                            p.status === 'sent'
                              ? 'bg-green-500/15 text-green-400 border-green-500/25 hover:bg-green-500/25'
                              : 'bg-white/8 text-white/50 border-white/10 hover:bg-white/15'
                          }`}
                          variant="outline"
                        >
                          {p.status === 'sent' ? 'Enviada' : 'Rascunho'}
                        </Badge>
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-white/40 text-xs">
                        {p.date || new Date(p.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/proposta/${p.id}`}>
                          <button className="p-1.5 text-white/30 hover:text-white transition-colors rounded" title="Editar">
                            <Edit2 size={14} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleCopyLink(p.id)}
                          className="p-1.5 text-white/30 hover:text-white transition-colors rounded"
                          title="Copiar link"
                        >
                          <Copy size={14} />
                        </button>
                        <a href={`/p/${p.id}`} target="_blank" rel="noopener noreferrer">
                          <button className="p-1.5 text-white/30 hover:text-white transition-colors rounded" title="Visualizar">
                            <ExternalLink size={14} />
                          </button>
                        </a>
                        <button
                          onClick={() => handleDuplicate(p.id)}
                          className="p-1.5 text-white/30 hover:text-white transition-colors rounded"
                          title="Duplicar"
                        >
                          <Copy size={14} className="rotate-12" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                          className="p-1.5 text-white/30 hover:text-red-400 transition-colors rounded disabled:opacity-40"
                          title="Excluir"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

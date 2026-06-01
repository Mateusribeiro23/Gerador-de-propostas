'use client'

import { ProposalData } from '@/lib/types'
import ProposalDocument from '@/components/proposal/ProposalDocument'
import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'

interface Props {
  data: ProposalData
}

export default function PublicProposalView({ data }: Props) {
  function handlePrint() {
    window.location.href = `/api/pdf/${data.id}?name=${encodeURIComponent(data.clientName)}`
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Top bar */}
      <div className="no-print sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-[#111111] border-b border-white/8">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#FF4500]" />
          <span className="text-white font-bold tracking-widest text-sm">
            DIGITAL <span className="text-[#FF4500]">RBS</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/40 text-sm">
            Proposta para <strong className="text-white">{data.clientName}</strong>
          </span>
          <Button
            onClick={handlePrint}
            className="bg-[#FF4500] hover:bg-[#E03D00] text-white font-semibold"
          >
            <Printer size={15} className="mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Proposal pages — scrollable preview */}
      <div className="py-12 space-y-8 flex flex-col items-center overflow-x-auto">
        <ProposalDocument data={data} />
      </div>
    </div>
  )
}

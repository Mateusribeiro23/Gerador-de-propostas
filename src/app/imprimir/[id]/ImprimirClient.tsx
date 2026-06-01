'use client'

import { useEffect } from 'react'
import { ProposalData } from '@/lib/types'
import ProposalPage1 from '@/components/proposal/ProposalPage1'
import ProposalPage2 from '@/components/proposal/ProposalPage2'
import ProposalPage3 from '@/components/proposal/ProposalPage3'
import ProposalPage4 from '@/components/proposal/ProposalPage4'
import ProposalPage5 from '@/components/proposal/ProposalPage5'

interface Props {
  data: ProposalData
}

export default function ImprimirClient({ data }: Props) {
  useEffect(() => {
    document.title = `Proposta - ${data.clientName || 'Digital RBS'}`
    const timer = setTimeout(() => window.print(), 2500)
    return () => clearTimeout(timer)
  }, [data.clientName])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @page {
          size: 297mm 210mm;
          margin: 0mm;
        }

        html {
          width: 297mm;
          background: #0D0D0D;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        body {
          display: block !important;
          min-height: auto !important;
          flex-direction: unset !important;
          width: 297mm;
          margin: 0;
          padding: 0;
          background: #0D0D0D;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
          font-family: Inter, -apple-system, sans-serif;
        }

        .proposal-page {
          width: 297mm !important;
          height: 210mm !important;
          min-height: 210mm !important;
          max-height: 210mm !important;
          overflow: hidden !important;
          position: relative !important;
          page-break-after: always !important;
          break-after: page !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }

        .proposal-page:last-of-type {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }

        @media print {
          .no-print { display: none !important; }

          html, body {
            width: 297mm !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}} />

      {/* Print button — hidden on print */}
      <div
        className="no-print"
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 9999,
          display: 'flex',
          gap: 8,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <button
          onClick={() => window.print()}
          style={{
            background: '#FF4500',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Exportar PDF
        </button>
        <button
          onClick={() => window.close()}
          style={{
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 8,
            padding: '10px 16px',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Fechar
        </button>
      </div>

      {/* 5 proposal pages at full A4 landscape size */}
      <ProposalPage1 data={data} />
      <ProposalPage2 />
      <ProposalPage3 data={data} />
      <ProposalPage4 data={data} />
      <ProposalPage5 data={data} />
    </>
  )
}

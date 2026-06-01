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

export default function PrintView({ data }: Props) {
  useEffect(() => {
    // Wait for fonts and images to load before printing
    const timer = setTimeout(() => {
      window.print()
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        @page {
          size: 297mm 210mm;
          margin: 0;
        }

        html, body {
          background: #0D0D0D;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        .proposal-page {
          width: 297mm;
          height: 210mm;
          overflow: hidden;
          display: block;
          position: relative;
          page-break-after: always;
          break-after: page;
        }

        .proposal-page:last-child {
          page-break-after: avoid;
          break-after: avoid;
        }

        /* Hide print button when printing */
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Manual print button (backup) */}
      <div
        className="no-print"
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 9999,
          display: 'flex',
          gap: 8,
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
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Exportar PDF
        </button>
        <button
          onClick={() => window.close()}
          style={{
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 8,
            padding: '10px 16px',
            fontSize: 14,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Fechar
        </button>
      </div>

      {/* Proposal pages — rendered at full A4 size */}
      <ProposalPage1 data={data} />
      <ProposalPage2 />
      <ProposalPage3 data={data} />
      <ProposalPage4 data={data} />
      <ProposalPage5 data={data} />
    </>
  )
}

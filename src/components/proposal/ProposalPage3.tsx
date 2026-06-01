import { ProposalData } from '@/lib/types'

interface Props {
  data: ProposalData
}

function DeliverableCard({ text }: { text: string }) {
  return (
    <div
      style={{
        background: '#1A1A1A',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '15px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
      }}
    >
      <div style={{
        width: 26, height: 26, borderRadius: 6, flexShrink: 0,
        background: 'rgba(255,69,0,0.15)', border: '1px solid rgba(255,69,0,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: 9, height: 9, background: '#FF4500', borderRadius: 2 }} />
      </div>
      <span style={{ color: '#fff', fontSize: 12.5, fontWeight: 400, lineHeight: 1.4 }}>{text}</span>
    </div>
  )
}

export default function ProposalPage3({ data }: Props) {
  const deliverables = data.deliverables.length > 0 ? data.deliverables : ['Entregáveis a definir']

  const half = Math.ceil(deliverables.length / 2)
  const col1 = deliverables.slice(0, half)
  const col2 = deliverables.slice(half)

  return (
    <div
      className="proposal-page"
      style={{
        width: '297mm',
        height: '210mm',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        background: '#0D0D0D',
        fontFamily: 'Inter, sans-serif',
        padding: '36px 56px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 66, flexShrink: 0 }}>
        <p style={{ color: '#FF4500', fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 10 }}>
          O que está incluído
        </p>
        <h2 style={{ color: '#fff', fontSize: 36, fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>
          Tudo que você <span style={{ color: '#FF4500' }}>recebe</span>
        </h2>
      </div>

      {/* Deliverables grid */}
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 50 }}>
          {col1.map((item, i) => (
            <DeliverableCard key={i} text={item} />
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 50 }}>
          {col2.map((item, i) => (
            <DeliverableCard key={i} text={item} />
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 18, right: 40, color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
        03 / 05
      </div>
    </div>
  )
}

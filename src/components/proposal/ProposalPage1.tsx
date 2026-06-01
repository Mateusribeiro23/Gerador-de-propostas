import { ProposalData } from '@/lib/types'

interface Props {
  data: ProposalData
}

export default function ProposalPage1({ data }: Props) {
  return (
    <div
      className="proposal-page"
      style={{
        width: '297mm',
        height: '210mm',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #0D0D0D 0%, #0D0D0D 50%, #2A1208 75%, #3D1A08 100%)',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <div style={{ padding: '28px 48px 0', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF4500', display: 'inline-block' }} />
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: '0.2em' }}>
            DIGITAL <span style={{ color: '#FF4500' }}>RBS</span>
          </span>
        </div>
      </div>

      {/* Main content — vertically centered */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px 36px' }}>
        <div style={{ marginBottom: 22 }}>
          <p style={{ color: '#FF4500', fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 8 }}>
            Proposta Comercial
          </p>
          <div style={{ width: 32, height: 2, background: '#FF4500' }} />
        </div>

        <h1 style={{ color: '#fff', fontSize: 58, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-1.5px', margin: '0 0 18px', maxWidth: 560 }}>
          Marketing digital<br />
          que gera <span style={{ color: '#FF4500' }}>resultado.</span>
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.65, marginBottom: 28, maxWidth: 440 }}>
          Assessoria de performance focada em geração de leads e vendas — sem achismo, sem desperdício.
        </p>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 999, padding: '10px 20px', width: 'fit-content',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF4500', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>
            Proposta exclusiva para{' '}
            <strong style={{ color: '#FF4500' }}>{data.clientName || 'você'}</strong>
          </span>
        </div>
      </div>

      {/* Right nav dots */}
      <div style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: i === 0 ? '#FF4500' : 'rgba(255,255,255,0.2)' }} />
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 20, right: 44, color: 'rgba(255,255,255,0.25)', fontSize: 11, letterSpacing: '0.1em' }}>
        01 / 05
      </div>
    </div>
  )
}

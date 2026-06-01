export default function ProposalPage2() {
  const stats = [
    { value: '140+', label: 'Clientes atendidos com resultados mensuráveis' },
    { value: '16+', label: 'Estados com presença ativa no Brasil' },
    { value: '100%', label: 'Foco em performance e retorno sobre investimento' },
  ]

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
        padding: '44px 56px 36px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 108, flexShrink: 0 }}>
        <p style={{ color: '#FF4500', fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 10 }}>
          Por que a Digital RBS
        </p>
        <h2 style={{ color: '#fff', fontSize: 40, fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>
          Resultados que <span style={{ color: '#FF4500' }}>falam</span> por si
        </h2>
      </div>

      {/* Stats cards — natural height, not stretch-filling */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 14, flexShrink: 0 }}>
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: '#1A1A1A',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              padding: '26px 22px',
            }}
          >
            <div style={{ color: '#FF4500', fontSize: 52, fontWeight: 900, lineHeight: 1, marginBottom: 14 }}>
              {stat.value}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.5 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Google Partner — natural height */}
      <div
        style={{
          flexShrink: 0,
          background: '#1E1614',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <div style={{
          background: '#fff', borderRadius: 8, padding: '8px 12px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80, flexShrink: 0,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
          </span>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>PARTNER</span>
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
            Empresa Parceira Oficial do Google
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.55 }}>
            Certificação que comprova excelência técnica e histórico consistente de resultados para os clientes.
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 18, right: 40, color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
        02 / 05
      </div>
    </div>
  )
}

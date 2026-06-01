import { ProposalData, formatCurrency } from '@/lib/types'

interface Props {
  data: ProposalData
}

export default function ProposalPage5({ data }: Props) {
  const { monthlyFee, adBudget, contractDuration, installments: installmentsData, observations } = data
  const total = (monthlyFee || 0) + (adBudget || 0)
  const perDay = total > 0 ? Math.round(total / 30) : 0
  const isSinglePayment = installmentsData === 1
  const numInstallments = installmentsData ?? (contractDuration || 12)

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
          Resumo do Investimento
        </p>
        <h2 style={{ color: '#fff', fontSize: 36, fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>
          Quanto você <span style={{ color: '#FF4500' }}>investe</span> por mês
        </h2>
      </div>

      {/* Top cards — fixed proportional height */}
      <div style={{ display: 'flex', gap: 14, flexShrink: 0, height: 200, marginBottom: 14 }}>

        {/* Honorários */}
        <div style={{
          flex: 1,
          background: '#1A1A1A',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <p style={{ flexShrink: 0, color: '#FF4500', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 0 }}>
            Honorários da Assessoria
          </p>
          <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 36, lineHeight: 1 }}>{formatCurrency(monthlyFee || 0)}</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>/mês</span>
            </div>
            {!isSinglePayment && (
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, lineHeight: 1.5 }}>
                {numInstallments} parcelas sem juros no cartão
              </p>
            )}
          </div>
        </div>

        {/* Verba */}
        <div style={{
          flex: 1,
          background: '#1A1A1A',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <p style={{ flexShrink: 0, color: '#FF4500', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 0 }}>
            Verba de Anúncios
          </p>
          <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 36, lineHeight: 1 }}>{formatCurrency(adBudget || 0)}</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>/mês</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, lineHeight: 1.5 }}>
              Investimento direto nas plataformas
            </p>
          </div>
        </div>
      </div>

      {/* Total card */}
      <div style={{
        flexShrink: 0,
        background: 'linear-gradient(135deg, #2A1208 0%, #3D1A08 100%)',
        border: '1px solid rgba(255,69,0,0.25)',
        borderRadius: 16,
        padding: '20px 26px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
            Total Mensal
          </p>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
            Máquina de geração de leads no ar
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.55, maxWidth: 380 }}>
            Anúncios gerenciados, landing page profissional, relatórios semanais,
            estratégias validadas e suporte direto — tudo isso por menos de R${perDay}/dia.
          </p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: 24 }}>
          <div style={{ color: '#fff', fontWeight: 900, fontSize: 42, lineHeight: 1 }}>
            {formatCurrency(total)}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4 }}>
            /mês no total
          </div>
          {perDay > 0 && (
            <div style={{ color: '#FF4500', fontSize: 12, marginTop: 4 }}>
              = R$ {perDay}/dia
            </div>
          )}
        </div>
      </div>

      {observations && (
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, lineHeight: 1.6, marginTop: 12, flexShrink: 0 }}>
          {observations}
        </p>
      )}

      <div style={{ position: 'absolute', bottom: 18, right: 40, color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
        05 / 05
      </div>
    </div>
  )
}

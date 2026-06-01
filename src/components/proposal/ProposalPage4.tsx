import { ProposalData, formatCurrency } from '@/lib/types'

interface Props {
  data: ProposalData
}

export default function ProposalPage4({ data }: Props) {
  const { totalContractValue, originalPrice, monthlyFee, adBudget, contractDuration, installments } = data
  const months = contractDuration || 6
  const isSinglePayment = installments === 1
  const numInstallments = installments ?? months
  const installmentValue = totalContractValue && numInstallments ? Math.round(totalContractValue / numInstallments) : 0

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
          Investimento
        </p>
        <h2 style={{ color: '#fff', fontSize: 36, fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>
          Simples, transparente <span style={{ color: '#FF4500' }}>e direto</span>
        </h2>
      </div>

      {/* Cards row — fixed proportional height, not fill-all */}
      <div style={{ display: 'flex', gap: 14, flexShrink: 0, height: 340 }}>

        {/* Left: main contract */}
        <div style={{
          flex: 1.25,
          background: '#1A1A1A',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '22px 24px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ flexShrink: 0, marginBottom: 'auto' }}>
            <p style={{ color: '#FF4500', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
              {isSinglePayment ? 'Assessoria Digital RBS · mensal' : `Assessoria Digital RBS · ${months} meses`}
            </p>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.3, marginBottom: 0 }}>
              Gestão Completa de<br />Marketing Digital
            </p>
          </div>

          <div style={{ marginTop: 'auto' }}>
            {!isSinglePayment && originalPrice && (
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, textDecoration: 'line-through', marginBottom: 2 }}>
                {formatCurrency(originalPrice)}
              </p>
            )}
            <p style={{ color: '#fff', fontWeight: 900, fontSize: 44, lineHeight: 1, marginBottom: 5 }}>
              {formatCurrency(isSinglePayment ? (monthlyFee || 0) : (totalContractValue || 0))}
            </p>
            {isSinglePayment ? (
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginBottom: 12 }}>
                {formatCurrency(monthlyFee || 0)} mensais
              </p>
            ) : (
              <>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginBottom: 3 }}>pelos {months} meses</p>
                {numInstallments > 1 && installmentValue > 0 && (
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginBottom: 12 }}>
                    em <strong style={{ color: '#fff' }}>{numInstallments}x de {formatCurrency(installmentValue)}</strong> sem juros no cartão
                  </p>
                )}
              </>
            )}
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, lineHeight: 1.55 }}>
              {isSinglePayment
                ? 'Assessoria em marketing digital, posicionamento e tráfego pago incluindo todos os serviços listados — pagamento mensal.'
                : `Assessoria em marketing digital, posicionamento e tráfego pago incluindo todos os serviços listados — contrato de ${months} meses.`}
            </p>
          </div>
        </div>

        {/* Right column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Implementation fee */}
          <div style={{
            flex: 1,
            background: '#1A1A1A',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ flexShrink: 0, marginBottom: 'auto' }}>
              <p style={{ color: '#FF4500', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
                Taxa de Implementação
              </p>
              <p style={{ color: '#fff', fontSize: 12.5, marginBottom: 0 }}>Setup, onboarding e configuração</p>
            </div>
            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 5 }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: 30, lineHeight: 1 }}>R$ 0</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textDecoration: 'line-through' }}>R$ 999</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, lineHeight: 1.5 }}>
                Isenção total na contratação desta proposta. Inclui setup de campanhas, pixels e landing page.
              </p>
            </div>
          </div>

          {/* Ad budget */}
          <div style={{
            flex: 1,
            background: '#1A1A1A',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ flexShrink: 0, marginBottom: 'auto' }}>
              <p style={{ color: '#FF4500', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
                Verba de Anúncios
              </p>
              <p style={{ color: '#fff', fontSize: 12.5, marginBottom: 0 }}>Investimento nas plataformas</p>
            </div>
            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 5 }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: 30, lineHeight: 1 }}>{formatCurrency(adBudget || 0)}</span>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>/mês</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, lineHeight: 1.5 }}>
                Mínimo recomendado para viabilidade de resultados. Pode ser aportado semanalmente conforme sua disponibilidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 18, right: 40, color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
        04 / 05
      </div>
    </div>
  )
}

import { ProposalData } from '@/lib/types'
import ProposalPage1 from './ProposalPage1'
import ProposalPage2 from './ProposalPage2'
import ProposalPage3 from './ProposalPage3'
import ProposalPage4 from './ProposalPage4'
import ProposalPage5 from './ProposalPage5'

interface Props {
  data: ProposalData
}

export default function ProposalDocument({ data }: Props) {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <ProposalPage1 data={data} />
      <ProposalPage2 />
      <ProposalPage3 data={data} />
      <ProposalPage4 data={data} />
      <ProposalPage5 data={data} />
    </div>
  )
}

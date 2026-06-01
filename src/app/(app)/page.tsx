import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: proposals } = await supabase
    .from('proposals')
    .select('id, client_name, company_name, monthly_fee, ad_budget, status, created_at, date')
    .order('created_at', { ascending: false })

  return <DashboardClient proposals={proposals ?? []} />
}

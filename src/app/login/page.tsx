'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error('Credenciais inválidas. Verifique e-mail e senha.')
      setLoading(false)
      return
    }
    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
      <div className="w-full max-w-sm space-y-8 px-4">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FF4500]" />
            <span className="text-white font-bold tracking-widest text-xl">
              DIGITAL <span className="text-[#FF4500]">RBS</span>
            </span>
          </div>
          <p className="text-white/40 text-sm tracking-widest uppercase text-xs">
            Gerador de Propostas
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="bg-[#1A1A1A] border border-white/8 rounded-xl p-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-white/70 text-xs tracking-wide uppercase">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FF4500] focus:ring-[#FF4500]/20"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-white/70 text-xs tracking-wide uppercase">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FF4500] focus:ring-[#FF4500]/20"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF4500] hover:bg-[#E03D00] text-white font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

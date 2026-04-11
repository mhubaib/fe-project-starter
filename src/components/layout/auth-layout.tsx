import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col h-full min-h-screen items-center justify-center gap-8 p-8 bg-slate-50">
      <Card className="p-0 w-full max-w-md overflow-hidden rounded-2xl shadow-xl">
        {children}
      </Card>

      <p className="text-center text-sm text-slate-400 mx-auto">
        Dengan mendaftar, Anda menyetujui{' '}
        <Link to="/register" className="underline hover:text-slate-700">
          Syarat
        </Link>{' '}
        dan{' '}
        <Link to="/register" className="underline hover:text-slate-700">
          Kebijakan Privasi
        </Link>
        .
      </p>
    </div>
  )
}

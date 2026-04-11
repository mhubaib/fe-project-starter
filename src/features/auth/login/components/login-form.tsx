import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoginForm } from '../hooks/use-login-form'
import { Loader2 } from 'lucide-react'

export function LoginForm() {
  const { form, onSubmit, isLoading } = useLoginForm()
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="mx-auto flex w-full flex-col overflow-y-auto justify-center space-y-6 p-8 relative">
      <div className="flex flex-col space-y-2 text-center md:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Selamat Datang Kembali
        </h1>
        <p className="text-sm text-slate-500">Masuk ke akun Anda</p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="email@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                className="focus-visible:ring-teal-500 h-9"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs font-medium text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-teal-600 hover:text-teal-700 underline-offset-4 hover:underline"
                >
                  Lupa password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="********"
                disabled={isLoading}
                className="focus-visible:ring-teal-500 h-9"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-xs font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              disabled={isLoading}
              className="mt-2 w-full h-10 bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500">
              Atau lanjutkan dengan
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" className="hover:bg-slate-50">
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current text-slate-700"
            >
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
            <span className="sr-only">Apple</span>
          </Button>
          <Button variant="outline" type="button" className="hover:bg-slate-50">
            <svg role="img" viewBox="0 0 24 24" className="h-4 w-4">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
              />
              <path
                fill="#34A853"
                d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 01-6.723-4.823l-4.04 3.067A11.965 11.965 0 0012 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
              />
              <path
                fill="#4A90E2"
                d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.63h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
              />
              <path
                fill="#FBBC05"
                d="M5.277 14.268A7.12 7.12 0 014.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 000 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
              />
            </svg>
            <span className="sr-only">Google</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 pt-4 border-t border-slate-100">
        <p className="text-center text-sm text-slate-500">
          Belum punya akun?{' '}
          <Link
            to="/register"
            className="font-medium text-teal-600 hover:text-teal-700 underline underline-offset-4"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  )
}

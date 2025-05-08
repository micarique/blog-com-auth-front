'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/services/api'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      const { token } = response.data
      localStorage.setItem('token', token)
      router.push('/dashboard') // redirecionar para a área protegida
    } catch (err) {
      console.error('Erro ao fazer login:', err)
      setError('E-mail ou senha inválidos.')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Acessar Painel</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="E-mail"
          className="w-full border border-zinc-300 rounded-lg px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border border-zinc-300 rounded-lg px-4 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-zinc-900 text-white py-2 rounded-lg hover:bg-zinc-800 transition"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
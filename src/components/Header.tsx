'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-semibold text-zinc-900">
        Blog 
      </Link>
      <div className="space-x-4">
        <Link
          href="/login"
          className="text-zinc-700 hover:text-zinc-900 transition font-medium"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
        >
          Cadastrar
        </Link>
      </div>
    </header>
  )
}
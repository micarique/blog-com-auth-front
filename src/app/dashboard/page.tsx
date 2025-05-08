'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/services/api'
import { Post } from '@/types/Post'

export default function DashboardPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  // Verifica token e busca posts do usuário autenticado
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const fetchUserPosts = async () => {
      try {
        const res = await api.get('/posts/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setPosts(res.data)
      } catch (err) {
        console.error('Erro ao buscar posts do usuário:', err)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUserPosts()
  }, [router])

  if (loading) return <p className="text-center mt-10">Carregando...</p>

  return (
    <main className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Meus Posts</h1>
          <button
            onClick={() => router.push('/dashboard/new')}
            className="bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
          >
            Novo Post
          </button>
        </header>

        {posts.length === 0 ? (
          <p className="text-zinc-500">Você ainda não criou nenhum post.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-start"
              >
                <div>
                  <h2 className="text-lg font-semibold">{post.titulo}</h2>
                  <p className="text-zinc-600">{post.conteudo}</p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Criado em: {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => router.push(`/dashboard/edit/${post.id}`)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )

  async function handleDelete(id: number) {
    const confirm = window.confirm('Tem certeza que deseja excluir este post?')
    if (!confirm) return

    try {
      const token = localStorage.getItem('token')
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPosts(posts.filter((p) => p.id !== id))
    } catch (err) {
      console.error('Erro ao deletar post:', err)
      alert('Erro ao excluir. Tente novamente.')
    }
  }
}
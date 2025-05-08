'use client'

import { useEffect, useState } from 'react'
import api from '@/services/api'
import { Post } from '@/types/Post'
import PostCard from '@/components/PostCard'
import Header from '@/components/Header'
export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Erro ao buscar posts:', err))
  }, [])

  return (
    <main className="min-h-screen bg-white text-zinc-900 p-4 md:p-8">
        <Header />
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4 mx-auto text-center">Bem-vindo ao Blog Autêntico</h1>
        <p className="text-zinc-600 text-lg text-center">
          Explore publicações inspiradoras feitas por autores autênticos.
        </p>
      </section>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  )
}
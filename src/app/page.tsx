'use client'

import { useEffect, useState } from 'react'
import api from '@/services/api'
import { Post } from '@/types/Post'
import PostCard from '@/components/PostCard'

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Erro ao buscar posts:', err))
  }, [])

  return (
    <main className="min-h-screen bg-white text-zinc-900 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Blog</h1>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  )
}
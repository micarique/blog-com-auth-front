'use client'

import { useEffect, useState } from 'react'
import api from '@/services/api'
import Header from '@/components/Header'
import { Post } from '@/types/Post'
import PostCard from '@/components/PostCard'
import AlertModal from '@/components/AlertModal'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      } catch (error) {
        setShowModal(true)
      }
    }

    fetchPosts()
  }, [])

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8">
      <Header />

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <AlertModal
        show={showModal}
        setShow={setShowModal}
        message="Erro ao buscar publicações. Tente novamente mais tarde."
      />
    </main>
  )
}
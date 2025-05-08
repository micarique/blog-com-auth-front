import { Post } from '@/types/Post'

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200 shadow-sm p-6 hover:shadow-md transition duration-200 bg-white">
      <h2 className="text-xl font-semibold mb-2">{post.titulo}</h2>
      <p className="text-sm text-zinc-600 line-clamp-3 mb-4">{post.conteudo}</p>
      <div className="text-xs text-zinc-400">
        Publicado por <strong>{post.autor}</strong><br />
        em {new Date(post.createdAt).toLocaleDateString('pt-BR')}
      </div>
    </div>
  )
}
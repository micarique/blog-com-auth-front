export interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  createdAt: string;
  autor: {
    id: number;
    name: string;
    email: string;
  };
}
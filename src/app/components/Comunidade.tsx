"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Search, PlusSquare, Home, Compass, User, Play } from "lucide-react"

export default function Comunidade() {
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({})
  const [saved, setSaved] = useState<{ [key: number]: boolean }>({})
  const [comentarios, setComentarios] = useState<{ [key: number]: string }>({})

  // Posts de exemplo da comunidade
  const posts = [
    {
      id: 1,
      usuario: "Carlos Silva",
      username: "@carlosfit",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
      imagem: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop",
      likes: 234,
      comentarios: 18,
      descricao: "Treino de pernas finalizado! 💪 Agachamento 120kg x 8 reps. Foco e determinação sempre! #LegDay #Fitness",
      tempo: "2h"
    },
    {
      id: 2,
      usuario: "Marina Costa",
      username: "@marinafit",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      imagem: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=600&fit=crop",
      likes: 456,
      comentarios: 32,
      descricao: "Refeição pós-treino perfeita! 🥗 Frango grelhado, batata doce e salada. Alimentação é 70% do resultado! #HealthyFood #FitLife",
      tempo: "5h"
    },
    {
      id: 3,
      usuario: "Rafael Santos",
      username: "@rafastrong",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      imagem: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop",
      likes: 189,
      comentarios: 12,
      descricao: "Supino reto batendo 100kg! 🔥 Evolução constante. Quem treina peito hoje? #ChestDay #Motivation",
      tempo: "8h"
    },
    {
      id: 4,
      usuario: "Julia Mendes",
      username: "@juliafitness",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      imagem: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=600&fit=crop",
      likes: 567,
      comentarios: 45,
      descricao: "Yoga matinal para começar o dia com energia! 🧘‍♀️ Equilíbrio entre corpo e mente. #Yoga #Wellness #MorningRoutine",
      tempo: "12h"
    },
    {
      id: 5,
      usuario: "Pedro Oliveira",
      username: "@pedrofit",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      imagem: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop",
      likes: 312,
      comentarios: 24,
      descricao: "Cardio na esteira! 🏃‍♂️ 10km em 45 minutos. Preparação para a meia maratona. #Running #Cardio #Marathon",
      tempo: "1d"
    },
    {
      id: 6,
      usuario: "Amanda Ferreira",
      username: "@amandastrong",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
      likes: 423,
      comentarios: 28,
      descricao: "Treino de costas completo! 💪 Remada, barra fixa e puxada. Construindo as asas! #BackDay #GymLife",
      tempo: "1d"
    }
  ]

  const toggleLike = (postId: number) => {
    setLiked({ ...liked, [postId]: !liked[postId] })
  }

  const toggleSave = (postId: number) => {
    setSaved({ ...saved, [postId]: !saved[postId] })
  }

  const handleComentario = (postId: number, texto: string) => {
    setComentarios({ ...comentarios, [postId]: texto })
  }

  const publicarComentario = (postId: number) => {
    if (comentarios[postId]?.trim()) {
      // Aqui você implementaria a lógica de enviar o comentário
      alert(`Comentário publicado: ${comentarios[postId]}`)
      setComentarios({ ...comentarios, [postId]: "" })
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-zinc-950 border-zinc-800 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Comunidade GymPro</h2>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="text-zinc-400 hover:bg-zinc-900 hover:text-white">
              <PlusSquare className="w-6 h-6" />
            </Button>
            <Button size="icon" variant="ghost" className="text-zinc-400 hover:bg-zinc-900 hover:text-white">
              <Search className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Stories */}
      <Card className="bg-zinc-950 border-zinc-800 p-4">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {/* Your Story */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 p-0.5">
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                  <PlusSquare className="w-6 h-6 text-zinc-400" />
                </div>
              </div>
            </div>
            <span className="text-xs text-zinc-400">Seu Story</span>
          </div>

          {/* Other Stories */}
          {posts.slice(0, 6).map((post) => (
            <div key={post.id} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-zinc-400 p-0.5 cursor-pointer hover:scale-105 transition-transform">
                <Avatar className="w-full h-full border-2 border-zinc-950">
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback>{post.usuario[0]}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs text-zinc-400 max-w-[64px] truncate">{post.usuario.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="bg-zinc-950 border-zinc-800 overflow-hidden">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback>{post.usuario[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-semibold text-sm cursor-pointer hover:text-zinc-300">{post.usuario}</p>
                  <p className="text-zinc-500 text-xs">{post.tempo}</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="text-zinc-400 hover:bg-zinc-900 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>

            {/* Post Image */}
            <div className="relative aspect-square bg-zinc-900">
              <img 
                src={post.imagem} 
                alt={post.descricao}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Actions */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className={`${liked[post.id] ? "text-red-500" : "text-white"} hover:bg-zinc-900 hover:text-red-500 transition-colors`}
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart className={`w-6 h-6 ${liked[post.id] ? "fill-current" : ""}`} />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-white hover:bg-zinc-900 hover:text-zinc-300">
                    <MessageCircle className="w-6 h-6" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-white hover:bg-zinc-900 hover:text-zinc-300">
                    <Send className="w-6 h-6" />
                  </Button>
                </div>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className={`${saved[post.id] ? "text-white" : "text-white"} hover:bg-zinc-900`}
                  onClick={() => toggleSave(post.id)}
                >
                  <Bookmark className={`w-6 h-6 ${saved[post.id] ? "fill-current" : ""}`} />
                </Button>
              </div>

              {/* Likes Count */}
              <p className="text-white font-semibold text-sm">
                {post.likes + (liked[post.id] ? 1 : 0)} curtidas
              </p>

              {/* Description */}
              <div>
                <p className="text-white text-sm">
                  <span className="font-semibold cursor-pointer hover:text-zinc-300">{post.usuario}</span>{" "}
                  <span className="text-zinc-300">{post.descricao}</span>
                </p>
              </div>

              {/* Comments */}
              <button className="text-zinc-500 text-sm hover:text-zinc-400 transition-colors">
                Ver todos os {post.comentarios} comentários
              </button>

              {/* Add Comment */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                <Input 
                  value={comentarios[post.id] || ""}
                  onChange={(e) => handleComentario(post.id, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      publicarComentario(post.id)
                    }
                  }}
                  placeholder="Adicione um comentário..."
                  className="bg-transparent border-none text-white placeholder:text-zinc-600 focus-visible:ring-0 px-0"
                />
                <Button 
                  variant="ghost" 
                  className="text-zinc-400 hover:text-white hover:bg-transparent px-2"
                  onClick={() => publicarComentario(post.id)}
                  disabled={!comentarios[post.id]?.trim()}
                >
                  Publicar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation (Mobile) */}
      <Card className="bg-zinc-950 border-zinc-800 p-3 sticky bottom-4 md:hidden">
        <div className="flex items-center justify-around">
          <Button size="icon" variant="ghost" className="text-white hover:bg-zinc-900">
            <Home className="w-6 h-6" />
          </Button>
          <Button size="icon" variant="ghost" className="text-zinc-400 hover:bg-zinc-900 hover:text-white">
            <Search className="w-6 h-6" />
          </Button>
          <Button size="icon" variant="ghost" className="text-zinc-400 hover:bg-zinc-900 hover:text-white">
            <PlusSquare className="w-6 h-6" />
          </Button>
          <Button size="icon" variant="ghost" className="text-zinc-400 hover:bg-zinc-900 hover:text-white">
            <Play className="w-6 h-6" />
          </Button>
          <Button size="icon" variant="ghost" className="text-zinc-400 hover:bg-zinc-900 hover:text-white">
            <User className="w-6 h-6" />
          </Button>
        </div>
      </Card>
    </div>
  )
}

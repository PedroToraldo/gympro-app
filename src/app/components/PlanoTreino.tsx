"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell, Clock, Target, CheckCircle2, Home, Info, Timer, Circle, Play } from "lucide-react"
import { useState } from "react"

interface PlanoTreinoProps {
  userProfile: any
  exerciciosCompletos: {[key: string]: boolean}
  onExercicioCompleto: (exercicioId: string) => void
}

export default function PlanoTreino({ userProfile, exerciciosCompletos, onExercicioCompleto }: PlanoTreinoProps) {
  const [diaAtivo, setDiaAtivo] = useState(0)
  const [exercicioExpandido, setExercicioExpandido] = useState<number | null>(null)

  if (!userProfile) {
    return (
      <Card className="bg-zinc-950 border-zinc-800 p-8 text-center">
        <Dumbbell className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Complete sua avaliação primeiro</h3>
        <p className="text-zinc-400">Precisamos conhecer você para criar seu plano de treino personalizado</p>
      </Card>
    )
  }

  // Função para gerar ID único do exercício
  const getExercicioId = (diaIndex: number, exercicioIndex: number) => {
    return `dia-${diaIndex}-ex-${exercicioIndex}`
  }

  // Função para gerar plano personalizado baseado no perfil
  const gerarPlanoPersonalizado = () => {
    const nivel = userProfile.nivelExperiencia || 'intermediario'
    const objetivo = userProfile.objetivo || 'Lifestyle'
    const diasDisponiveis = userProfile.diasDisponiveis || '3 dias'
    const maquinas = userProfile.maquinas || []
    const preferencias = userProfile.preferenciasExercicios || []
    const lesoes = userProfile.lesoes || ''

    // Lógica para determinar frequência baseada nos dias disponíveis
    const diasPorSemana = diasDisponiveis.toLowerCase().includes('segunda') && 
                         diasDisponiveis.toLowerCase().includes('quarta') && 
                         diasDisponiveis.toLowerCase().includes('sexta') ? 3 : 4

    // Ajustar intensidade baseada no nível
    const intensidade = {
      iniciante: { series: '3x12', descanso: '60s' },
      intermediario: { series: '4x10', descanso: '90s' },
      avancado: { series: '5x8', descanso: '120s' }
    }[nivel] || { series: '4x10', descanso: '90s' }

    // Exercícios base com vídeos (URLs do YouTube)
    const exerciciosBase = {
      peito: [
        { 
          nome: "Supino Reto", 
          series: intensidade.series, 
          descanso: intensidade.descanso,
          musculos: ["Peitoral", "Tríceps", "Ombros"],
          videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg",
          adaptacaoCasa: "Flexão de braço no chão",
          dica: "Desça a barra até tocar o peito"
        },
        { 
          nome: "Supino Inclinado", 
          series: intensidade.series, 
          descanso: intensidade.descanso,
          musculos: ["Peitoral Superior", "Ombros"],
          videoUrl: "https://www.youtube.com/embed/8iPEnn-ltC8",
          adaptacaoCasa: "Flexão inclinada com pés elevados",
          dica: "Banco a 30-45 graus"
        }
      ],
      costas: [
        { 
          nome: "Remada Curvada", 
          series: intensidade.series, 
          descanso: intensidade.descanso,
          musculos: ["Costas", "Bíceps", "Trapézio"],
          videoUrl: "https://www.youtube.com/embed/FWJR5Ve8bnQ",
          adaptacaoCasa: "Remada com galões de água ou elástico",
          dica: "Mantenha as costas retas durante o movimento"
        },
        { 
          nome: "Puxada Frontal", 
          series: intensidade.series, 
          descanso: intensidade.descanso,
          musculos: ["Costas", "Bíceps"],
          videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc",
          adaptacaoCasa: "Barra fixa ou elástico preso na porta",
          dica: "Puxe até a altura do peito"
        }
      ],
      pernas: [
        { 
          nome: "Agachamento Livre", 
          series: intensidade.series, 
          descanso: intensidade.descanso,
          musculos: ["Quadríceps", "Glúteos", "Core"],
          videoUrl: "https://www.youtube.com/embed/Dy28eq2PjcM",
          adaptacaoCasa: "Agachamento sem peso ou com mochila pesada",
          dica: "Mantenha os joelhos alinhados com os pés"
        },
        { 
          nome: "Leg Press 45°", 
          series: intensidade.series, 
          descanso: intensidade.descanso,
          musculos: ["Quadríceps", "Glúteos"],
          videoUrl: "https://www.youtube.com/embed/GwLzBJYoWlI",
          adaptacaoCasa: "Agachamento búlgaro com cadeira",
          dica: "Não estenda completamente os joelhos"
        }
      ],
      ombros: [
        { 
          nome: "Desenvolvimento com Halteres", 
          series: intensidade.series, 
          descanso: intensidade.descanso,
          musculos: ["Ombros", "Tríceps"],
          videoUrl: "https://www.youtube.com/embed/B-aVuyhvLHU",
          adaptacaoCasa: "Desenvolvimento com garrafas pet cheias",
          dica: "Não tranque os cotovelos no topo"
        },
        { 
          nome: "Elevação Lateral", 
          series: intensidade.series, 
          descanso: intensidade.descanso,
          musculos: ["Ombros Laterais"],
          videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo",
          adaptacaoCasa: "Elevação com garrafas pet",
          dica: "Cotovelos levemente flexionados"
        }
      ],
      bracos: [
        { 
          nome: "Rosca Direta", 
          series: intensidade.series, 
          descanso: intensidade.descanso,
          musculos: ["Bíceps"],
          videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
          adaptacaoCasa: "Rosca com mochila pesada ou galões",
          dica: "Evite balançar o corpo"
        },
        { 
          nome: "Tríceps Pulley", 
          series: intensidade.series, 
          descanso: intensidade.descanso,
          musculos: ["Tríceps"],
          videoUrl: "https://www.youtube.com/embed/6Fzep104f0s",
          adaptacaoCasa: "Tríceps banco ou mergulho em cadeira",
          dica: "Mantenha os cotovelos fixos"
        }
      ]
    }

    // Gerar plano baseado na frequência e preferências
    const plano = []
    
    if (diasPorSemana >= 3) {
      if (preferencias.includes('Força')) {
        plano.push({
          dia: "Segunda - Peito e Tríceps",
          exercicios: [...exerciciosBase.peito, ...exerciciosBase.bracos.slice(1)]
        })
        plano.push({
          dia: "Quarta - Costas e Bíceps", 
          exercicios: [...exerciciosBase.costas, ...exerciciosBase.bracos.slice(0, 1)]
        })
        plano.push({
          dia: "Sexta - Pernas e Ombros",
          exercicios: [...exerciciosBase.pernas, ...exerciciosBase.ombros]
        })
      } else {
        // Plano full body para iniciante ou preferência geral
        plano.push({
          dia: "Segunda - Corpo Todo A",
          exercicios: [exerciciosBase.peito[0], exerciciosBase.costas[0], exerciciosBase.ombros[0], exerciciosBase.bracos[0]]
        })
        plano.push({
          dia: "Quarta - Corpo Todo B",
          exercicios: [exerciciosBase.pernas[0], exerciciosBase.peito[1], exerciciosBase.costas[1], exerciciosBase.bracos[1]]
        })
        plano.push({
          dia: "Sexta - Corpo Todo C",
          exercicios: [exerciciosBase.pernas[1], exerciciosBase.ombros[1], exerciciosBase.peito[0], exerciciosBase.costas[0]]
        })
      }
    }

    return plano
  }

  const planoAtual = gerarPlanoPersonalizado()

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-zinc-950 border-zinc-800 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-zinc-900 p-4 rounded-xl">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Seu Plano de Treino</h2>
              <p className="text-zinc-400">Personalizado para: {userProfile.objetivo}</p>
              <p className="text-zinc-500 text-sm">Nível: {userProfile.nivelExperiencia} | {userProfile.diasDisponiveis}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-zinc-900 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-white" />
                <span className="text-zinc-300 text-sm">{userProfile.objetivo}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Days Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {planoAtual.map((treino, index) => (
          <Button
            key={index}
            onClick={() => setDiaAtivo(index)}
            className={`flex-shrink-0 ${
              diaAtivo === index
                ? "bg-white text-black"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {treino.dia.split(" - ")[0]}
          </Button>
        ))}
      </div>

      {/* Workout Details */}
      <Card className="bg-zinc-950 border-zinc-800 p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{planoAtual[diaAtivo]?.dia}</h3>
          <div className="flex items-center gap-4 text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">~60 min</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">{planoAtual[diaAtivo]?.exercicios.length} exercícios</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {planoAtual[diaAtivo]?.exercicios.map((exercicio, index) => {
            const exercicioId = getExercicioId(diaAtivo, index)
            const isCompleto = exerciciosCompletos[exercicioId]
            
            return (
              <Card key={index} className={`border-2 transition-all ${
                isCompleto 
                  ? "bg-green-500/10 border-green-500/50" 
                  : "bg-zinc-900 border-zinc-800"
              }`}>
                <div className="p-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExercicioExpandido(exercicioExpandido === index ? null : index)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Vídeo do exercício */}
                      <div className="bg-zinc-950 w-24 h-16 rounded-lg overflow-hidden flex items-center justify-center relative">
                        <iframe
                          width="96"
                          height="64"
                          src={exercicio.videoUrl}
                          title={exercicio.nome}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg"
                        ></iframe>
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${isCompleto ? "text-green-400" : "text-white"}`}>
                          {exercicio.nome}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-zinc-400 text-sm">{exercicio.series}</span>
                          <span className="text-zinc-600">•</span>
                          <div className="flex items-center gap-1">
                            <Timer className="w-3 h-3 text-zinc-400" />
                            <span className="text-zinc-400 text-sm">{exercicio.descanso}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Botão de completar exercício */}
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onExercicioCompleto(exercicioId)
                        }}
                        className={`transition-all ${
                          isCompleto
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                        }`}
                      >
                        {isCompleto ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </Button>
                      <Info className="w-5 h-5 text-zinc-500" />
                    </div>
                  </div>

                  {exercicioExpandido === index && (
                    <div className="mt-4 pt-4 border-t border-zinc-800 space-y-4">
                      {/* Músculos trabalhados */}
                      <div>
                        <p className="text-zinc-400 text-xs mb-2">Músculos trabalhados</p>
                        <div className="flex flex-wrap gap-2">
                          {exercicio.musculos.map((musculo, i) => (
                            <span key={i} className="bg-zinc-950 px-2 py-1 rounded text-xs text-white">
                              {musculo}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Adaptação para casa */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Home className="w-4 h-4 text-zinc-400" />
                          <p className="text-zinc-400 text-xs">Adaptação para casa</p>
                        </div>
                        <p className="text-white text-sm bg-zinc-950 p-2 rounded">
                          {exercicio.adaptacaoCasa}
                        </p>
                      </div>

                      {/* Dica de execução */}
                      <div>
                        <p className="text-zinc-400 text-xs mb-2">💡 Dica de execução</p>
                        <p className="text-zinc-300 text-sm">
                          {exercicio.dica}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </Card>

      {/* Tips */}
      <Card className="bg-zinc-950 border-zinc-800 p-6">
        <h3 className="text-lg font-bold text-white mb-3">💡 Dicas Importantes</h3>
        <ul className="space-y-2 text-zinc-400">
          <li>• Faça aquecimento de 5-10 minutos antes de começar</li>
          <li>• Mantenha a forma correta em todos os exercícios</li>
          <li>• Hidrate-se durante o treino</li>
          <li>• Respeite os tempos de descanso</li>
          <li>• Aumente a carga progressivamente</li>
        </ul>
      </Card>
    </div>
  )
}
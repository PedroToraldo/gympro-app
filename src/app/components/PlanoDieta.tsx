"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UtensilsCrossed, Clock, Flame, Apple, Beef, Wheat, Droplet, ArrowRightLeft, Info, CheckCircle2, Circle } from "lucide-react"
import { useState } from "react"

interface PlanoDietaProps {
  userProfile: any
  refeicoesCompletas?: {[key: string]: boolean}
  onRefeicaoCompleta?: (refeicaoId: string) => void
}

export default function PlanoDieta({ userProfile, refeicoesCompletas = {}, onRefeicaoCompleta }: PlanoDietaProps) {
  const [refeicaoAtiva, setRefeicaoAtiva] = useState(0)
  const [alimentoExpandido, setAlimentoExpandido] = useState<number | null>(null)

  if (!userProfile) {
    return (
      <Card className="bg-zinc-950 border-zinc-800 p-8 text-center">
        <UtensilsCrossed className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Complete sua avaliação primeiro</h3>
        <p className="text-zinc-400">Precisamos conhecer você para criar seu plano alimentar personalizado</p>
      </Card>
    )
  }

  // Função para gerar ID único da refeição
  const getRefeicaoId = (refeicaoIndex: number, alimentoIndex: number) => {
    return `ref-${refeicaoIndex}-ali-${alimentoIndex}`
  }

  // Cálculo de calorias baseado no objetivo e perfil
  const calcularCalorias = () => {
    const peso = parseFloat(userProfile.peso)
    const altura = parseFloat(userProfile.altura)
    const idade = parseFloat(userProfile.idade)
    
    let tmb = 0
    if (userProfile.sexo === "masculino") {
      tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade)
    } else {
      tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade)
    }

    // Ajustar baseado no nível de atividade
    const nivelAtividade = userProfile.nivelExperiencia === 'avancado' ? 1.725 : 
                          userProfile.nivelExperiencia === 'intermediario' ? 1.55 : 1.2

    let calorias = tmb * nivelAtividade
    
    if (userProfile.objetivo === "Perder peso") {
      calorias -= 500
    } else if (userProfile.objetivo === "Ganhar massa muscular") {
      calorias += 500
    }

    return Math.round(calorias)
  }

  const caloriasTotal = calcularCalorias()
  const proteinas = Math.round((userProfile.peso * (userProfile.objetivo?.includes("muscular") ? 2.2 : 1.8)) * 10) / 10
  const carboidratos = Math.round((caloriasTotal * 0.45) / 4)
  const gorduras = Math.round((caloriasTotal * 0.25) / 9)

  // Gerar plano alimentar personalizado
  const gerarPlanoAlimentar = () => {
    const alimentosPreferidos = userProfile.alimentosPreferidos?.toLowerCase() || ''
    const alergias = userProfile.alergias?.toLowerCase() || ''
    const alimentosExcluidos = userProfile.alimentosExcluidos?.toLowerCase() || ''
    const restricoes = userProfile.restricoesAlimentares?.toLowerCase() || ''
    const numeroRefeicoes = parseInt(userProfile.numeroRefeicoes) || 5

    // Base de alimentos com personalização
    const alimentosBase = {
      proteina: [
        { nome: "Frango grelhado", qtd: "200g", cal: 330, prot: 62, carb: 0, gord: 7.2 },
        { nome: "Peixe grelhado", qtd: "200g", cal: 240, prot: 44, carb: 0, gord: 6 },
        { nome: "Ovos mexidos", qtd: "3 unidades", cal: 210, prot: 18, carb: 1.5, gord: 15 },
        { nome: "Queijo cottage", qtd: "150g", cal: 160, prot: 28, carb: 3, gord: 2 }
      ],
      carbo: [
        { nome: "Arroz integral", qtd: "150g", cal: 195, prot: 4, carb: 42, gord: 0.5 },
        { nome: "Batata doce", qtd: "100g", cal: 86, prot: 1.6, carb: 20, gord: 0.1 },
        { nome: "Quinoa", qtd: "100g", cal: 120, prot: 4.4, carb: 21, gord: 1.9 },
        { nome: "Aveia", qtd: "30g", cal: 117, prot: 5, carb: 20, gord: 2 }
      ],
      gordura: [
        { nome: "Abacate", qtd: "1/2 unidade", cal: 120, prot: 1.5, carb: 6, gord: 11 },
        { nome: "Azeite", qtd: "1 colher", cal: 90, prot: 0, carb: 0, gord: 10 },
        { nome: "Castanhas", qtd: "20g", cal: 120, prot: 3, carb: 4, gord: 11 }
      ],
      vegetais: [
        { nome: "Salada verde", qtd: "à vontade", cal: 30, prot: 2, carb: 6, gord: 0.3 },
        { nome: "Brócolis", qtd: "100g", cal: 34, prot: 2.8, carb: 7, gord: 0.4 },
        { nome: "Legumes cozidos", qtd: "150g", cal: 80, prot: 3, carb: 15, gord: 0.5 }
      ]
    }

    // Filtrar baseado em preferências e restrições
    const filtrarAlimentos = (categoria: any[]) => {
      return categoria.filter(alimento => {
        const nome = alimento.nome.toLowerCase()
        if (alergias.includes('lactose') && nome.includes('queijo')) return false
        if (alergias.includes('glúten') && (nome.includes('aveia') || nome.includes('trigo'))) return false
        if (restricoes.includes('vegetarian') && (nome.includes('frango') || nome.includes('peixe'))) return false
        if (restricoes.includes('vegan') && (nome.includes('ovo') || nome.includes('queijo') || nome.includes('peixe') || nome.includes('frango'))) return false
        if (alimentosExcluidos && alimentosExcluidos.includes(nome.split(' ')[0])) return false
        return true
      })
    }

    const proteinasDisponiveis = filtrarAlimentos(alimentosBase.proteina)
    const carbosDisponiveis = filtrarAlimentos(alimentosBase.carbo)
    const gordurasDisponiveis = filtrarAlimentos(alimentosBase.gordura)
    const vegetaisDisponiveis = alimentosBase.vegetais

    // Gerar refeições baseado no número desejado
    const refeicoes = []

    if (numeroRefeicoes >= 5) {
      refeicoes.push({
        nome: "Café da Manhã",
        horario: "07:00 - 08:00",
        calorias: Math.round(caloriasTotal * 0.25),
        alimentos: [
          proteinasDisponiveis[2], // ovos
          carbosDisponiveis[3], // aveia
          gordurasDisponiveis[0], // abacate
          { nome: "Café com leite", qtd: "200ml", cal: 80, prot: 4, carb: 6, gord: 3 }
        ]
      })

      refeicoes.push({
        nome: "Lanche da Manhã",
        horario: "10:00 - 10:30",
        calorias: Math.round(caloriasTotal * 0.10),
        alimentos: [
          proteinasDisponiveis[3], // queijo cottage
          carbosDisponiveis[3], // aveia
          gordurasDisponiveis[2] // castanhas
        ]
      })

      refeicoes.push({
        nome: "Almoço",
        horario: "12:00 - 13:00",
        calorias: Math.round(caloriasTotal * 0.35),
        alimentos: [
          carbosDisponiveis[0], // arroz
          proteinasDisponiveis[0], // frango
          vegetaisDisponiveis[0], // salada
          carbosDisponiveis[1], // batata
          gordurasDisponiveis[1] // azeite
        ]
      })

      refeicoes.push({
        nome: "Lanche da Tarde",
        horario: "15:30 - 16:00",
        calorias: Math.round(caloriasTotal * 0.10),
        alimentos: [
          { nome: "Whey protein", qtd: "1 scoop", cal: 120, prot: 24, carb: 3, gord: 1.5 },
          carbosDisponiveis[3], // aveia
          gordurasDisponiveis[2] // pasta amendoim
        ]
      })

      refeicoes.push({
        nome: "Jantar",
        horario: "19:00 - 20:00",
        calorias: Math.round(caloriasTotal * 0.20),
        alimentos: [
          proteinasDisponiveis[1], // peixe
          carbosDisponiveis[2], // quinoa
          vegetaisDisponiveis[2], // legumes
          vegetaisDisponiveis[0] // salada
        ]
      })
    } else if (numeroRefeicoes >= 3) {
      // Plano simplificado
      refeicoes.push({
        nome: "Café da Manhã",
        horario: "08:00",
        calorias: Math.round(caloriasTotal * 0.3),
        alimentos: [
          proteinasDisponiveis[2],
          carbosDisponiveis[0],
          gordurasDisponiveis[0]
        ]
      })

      refeicoes.push({
        nome: "Almoço",
        horario: "12:00",
        calorias: Math.round(caloriasTotal * 0.4),
        alimentos: [
          proteinasDisponiveis[0],
          carbosDisponiveis[0],
          vegetaisDisponiveis[0],
          gordurasDisponiveis[1]
        ]
      })

      refeicoes.push({
        nome: "Jantar",
        horario: "19:00",
        calorias: Math.round(caloriasTotal * 0.3),
        alimentos: [
          proteinasDisponiveis[1],
          carbosDisponiveis[2],
          vegetaisDisponiveis[2]
        ]
      })
    }

    return refeicoes
  }

  const refeicoes = gerarPlanoAlimentar()

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-zinc-950 border-zinc-800 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-zinc-900 p-4 rounded-xl">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Seu Plano Alimentar</h2>
              <p className="text-zinc-400">Personalizado para: {userProfile.objetivo}</p>
              <p className="text-zinc-500 text-sm">Refeições: {userProfile.numeroRefeicoes} por dia</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Macros Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-900 p-2 rounded-lg">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-zinc-400 text-xs">Calorias</p>
              <p className="text-xl font-bold text-white">{caloriasTotal}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-900 p-2 rounded-lg">
              <Beef className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-zinc-400 text-xs">Proteínas</p>
              <p className="text-xl font-bold text-white">{proteinas}g</p>
            </div>
          </div>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-900 p-2 rounded-lg">
              <Wheat className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-zinc-400 text-xs">Carboidratos</p>
              <p className="text-xl font-bold text-white">{carboidratos}g</p>
            </div>
          </div>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-900 p-2 rounded-lg">
              <Apple className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-zinc-400 text-xs">Gorduras</p>
              <p className="text-xl font-bold text-white">{gorduras}g</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Meals Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {refeicoes.map((refeicao, index) => (
          <Button
            key={index}
            onClick={() => setRefeicaoAtiva(index)}
            className={`flex-shrink-0 ${
              refeicaoAtiva === index
                ? "bg-white text-black"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {refeicao.nome}
          </Button>
        ))}
      </div>

      {/* Meal Details */}
      <Card className="bg-zinc-950 border-zinc-800 p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{refeicoes[refeicaoAtiva]?.nome}</h3>
          <div className="flex items-center gap-4 text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{refeicoes[refeicaoAtiva]?.horario}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4" />
              <span className="text-sm">~{refeicoes[refeicaoAtiva]?.calorias} kcal</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {refeicoes[refeicaoAtiva]?.alimentos.map((alimento, index) => {
            const refeicaoId = getRefeicaoId(refeicaoAtiva, index)
            const isCompleto = refeicoesCompletas[refeicaoId]
            
            return (
              <Card key={index} className={`bg-zinc-900 border-zinc-800 p-4 transition-all ${
                isCompleto ? "bg-green-500/10 border-green-500/50" : ""
              }`}>
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setAlimentoExpandido(alimentoExpandido === index ? null : index)}
                >
                  <div>
                    <h4 className={`text-white font-semibold ${isCompleto ? "text-green-400" : ""}`}>{alimento.nome}</h4>
                    <p className="text-zinc-400 text-sm">{alimento.qtd}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-white font-bold">{alimento.cal} kcal</p>
                    </div>
                    {/* Botão de completar refeição */}
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRefeicaoCompleta?.(refeicaoId)
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

                {alimentoExpandido === index && (
                  <div className="mt-4 pt-4 border-t border-zinc-800 space-y-4">
                    {/* Macronutrientes */}
                    <div>
                      <p className="text-zinc-400 text-xs mb-2">Macronutrientes</p>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="bg-zinc-950 p-2 rounded">
                          <p className="text-zinc-500 text-xs">Proteína</p>
                          <p className="text-white font-bold text-sm">{alimento.prot}g</p>
                        </div>
                        <div className="bg-zinc-950 p-2 rounded">
                          <p className="text-zinc-500 text-xs">Carbo</p>
                          <p className="text-white font-bold text-sm">{alimento.carb}g</p>
                        </div>
                        <div className="bg-zinc-950 p-2 rounded">
                          <p className="text-zinc-500 text-xs">Gordura</p>
                          <p className="text-white font-bold text-sm">{alimento.gord}g</p>
                        </div>
                        <div className="bg-zinc-950 p-2 rounded">
                          <p className="text-zinc-500 text-xs">Fibra</p>
                          <p className="text-white font-bold text-sm">{alimento.fibra || 0}g</p>
                        </div>
                      </div>
                    </div>

                    {/* Vitaminas */}
                    <div>
                      <p className="text-zinc-400 text-xs mb-2">Vitaminas e Minerais</p>
                      <div className="flex flex-wrap gap-2">
                        {(alimento.vitaminas || ['B12', 'Cálcio']).map((vit, i) => (
                          <span key={i} className="bg-zinc-950 px-2 py-1 rounded text-xs text-white">
                            {vit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Substituições */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowRightLeft className="w-4 h-4 text-zinc-400" />
                        <p className="text-zinc-400 text-xs">Substituições</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(alimento.substituicoes || ['Similar', 'Equivalente']).map((sub, i) => (
                          <Button
                            key={i}
                            size="sm"
                            variant="outline"
                            className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-xs"
                          >
                            {sub}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </Card>

      {/* Hydration Tip */}
      <Card className="bg-zinc-950 border-zinc-800 p-6">
        <div className="flex items-center gap-4">
          <div className="bg-zinc-900 p-3 rounded-xl">
            <Droplet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Hidratação</h3>
            <p className="text-zinc-400">Beba pelo menos {Math.round(userProfile.peso * 35)}ml de água por dia (~{Math.round((userProfile.peso * 35) / 250)} copos)</p>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="bg-zinc-950 border-zinc-800 p-6">
        <h3 className="text-lg font-bold text-white mb-3">💡 Dicas Nutricionais</h3>
        <ul className="space-y-2 text-zinc-400">
          <li>• Faça refeições a cada 3 horas</li>
          <li>• Priorize alimentos naturais e integrais</li>
          <li>• Evite alimentos processados e açúcares</li>
          <li>• Prepare suas refeições com antecedência</li>
          <li>• Ajuste as porções conforme sua fome e resultados</li>
        </ul>
      </Card>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Camera, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"

interface QuizAvaliacaoProps {
  onComplete: (profile: any) => void
}

export default function QuizAvaliacao({ onComplete }: QuizAvaliacaoProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Dados de treino
    objetivo: "",
    diasDisponiveis: "",
    tempoDisponivel: "",
    lesoes: "",
    maquinas: [] as string[],
    fotoFrente: null as File | null,
    fotoLado: null as File | null,
    fotoCostas: null as File | null,
    nivelExperiencia: "",
    preferenciasExercicios: [] as string[],
    frequenciaCardio: "",
    // Dados de dieta
    alimentosPreferidos: "",
    alergias: "",
    alimentosExcluidos: "",
    numeroRefeicoes: "",
    restricoesAlimentares: "",
    metaPeso: "",
    // Dados básicos para cálculos
    nome: "",
    idade: "",
    peso: "",
    altura: "",
    sexo: "",
    nivel: "intermediario"
  })

  const totalSteps = 15 // Aumentado para mais perguntas
  const progress = (step / totalSteps) * 100

  const equipamentosDisponiveis = [
    "Supino", "Leg Press", "Cadeira Extensora", "Mesa Flexora",
    "Puxada Frontal", "Remada Baixa", "Desenvolvimento", "Crucifixo",
    "Barra Fixa", "Paralelas", "Smith Machine", "Hack Machine",
    "Esteira", "Bicicleta", "Elíptico", "Halteres", "Barras", "Anilhas"
  ]

  const preferenciasExerciciosOpcoes = [
    "Força (musculação)", "Cardio", "HIIT", "Funcional", "Crossfit", "Yoga", "Pilates"
  ]

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete(formData)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData({ ...formData, [field]: file })
  }

  const toggleMaquina = (maquina: string) => {
    setFormData(prev => ({
      ...prev,
      maquinas: prev.maquinas.includes(maquina)
        ? prev.maquinas.filter(m => m !== maquina)
        : [...prev.maquinas, maquina]
    }))
  }

  const togglePreferencia = (preferencia: string) => {
    setFormData(prev => ({
      ...prev,
      preferenciasExercicios: prev.preferenciasExercicios.includes(preferencia)
        ? prev.preferenciasExercicios.filter(p => p !== preferencia)
        : [...prev.preferenciasExercicios, preferencia]
    }))
  }

  const canProceed = () => {
    switch(step) {
      case 1: return formData.objetivo !== ""
      case 2: return formData.diasDisponiveis !== ""
      case 3: return formData.tempoDisponivel !== ""
      case 4: return true // Lesões é opcional
      case 5: return formData.maquinas.length > 0
      case 6: return true // Fotos são opcionais
      case 7: return formData.nivelExperiencia !== ""
      case 8: return formData.preferenciasExercicios.length > 0
      case 9: return true // Frequência cardio opcional
      case 10: return formData.alimentosPreferidos !== ""
      case 11: return true // Alergias é opcional
      case 12: return true // Alimentos excluídos é opcional
      case 13: return true // Restrições é opcional
      case 14: return formData.numeroRefeicoes !== "" && formData.nome !== "" && formData.idade !== "" && formData.peso !== "" && formData.altura !== "" && formData.sexo !== ""
      case 15: return true // Tela de planos
      default: return false
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-zinc-950 border-zinc-800 p-6 md:p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-zinc-400 text-sm">Etapa {step} de {totalSteps}</span>
            <span className="text-zinc-400 text-sm">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-zinc-900" />
        </div>

        {/* Perguntas de Treino */}
        
        {/* Pergunta 1: Objetivo */}
        {step === 1 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Qual seu objetivo?</h2>
              <p className="text-zinc-400">Apenas lifestyle ou competição?</p>
            </div>

            <div className="space-y-3">
              {["Lifestyle (saúde e bem-estar)", "Competição (fisiculturismo/atleta)"].map((obj) => (
                <Card 
                  key={obj} 
                  onClick={() => setFormData({ ...formData, objetivo: obj })}
                  className={`p-5 cursor-pointer transition-all border-2 ${
                    formData.objetivo === obj 
                      ? "bg-white border-white" 
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <p className={`font-semibold ${formData.objetivo === obj ? "text-black" : "text-white"}`}>
                    {obj}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Pergunta 2: Dias disponíveis */}
        {step === 2 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Quantos dias você tem disponíveis para treinar?</h2>
              <p className="text-zinc-400">Informe quais dias da semana você pode treinar</p>
            </div>

            <div>
              <Label htmlFor="diasDisponiveis" className="text-zinc-300 mb-2 block">
                Exemplo: Segunda, Quarta e Sexta (3 dias)
              </Label>
              <Textarea
                id="diasDisponiveis"
                value={formData.diasDisponiveis}
                onChange={(e) => setFormData({ ...formData, diasDisponiveis: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white min-h-[120px]"
                placeholder="Digite os dias e horários disponíveis..."
              />
            </div>
          </div>
        )}

        {/* Pergunta 3: Tempo disponível */}
        {step === 3 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Quanto tempo você tem disponível para treinar?</h2>
              <p className="text-zinc-400">Por sessão de treino</p>
            </div>

            <div className="space-y-3">
              {["30 minutos", "45 minutos", "1 hora", "1 hora e 30 minutos", "2 horas ou mais"].map((tempo) => (
                <Card 
                  key={tempo} 
                  onClick={() => setFormData({ ...formData, tempoDisponivel: tempo })}
                  className={`p-5 cursor-pointer transition-all border-2 ${
                    formData.tempoDisponivel === tempo 
                      ? "bg-white border-white" 
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <p className={`font-semibold ${formData.tempoDisponivel === tempo ? "text-black" : "text-white"}`}>
                    {tempo}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Pergunta 4: Lesões */}
        {step === 4 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Você possui alguma lesão ou limitação?</h2>
              <p className="text-zinc-400">Que não te permite realizar algum movimento? Se sim, explique da forma mais detalhada possível</p>
            </div>

            <div>
              <Label htmlFor="lesoes" className="text-zinc-300 mb-2 block">
                Descreva suas lesões ou limitações (opcional)
              </Label>
              <Textarea
                id="lesoes"
                value={formData.lesoes}
                onChange={(e) => setFormData({ ...formData, lesoes: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white min-h-[150px]"
                placeholder="Ex: Dor no joelho direito ao agachar, lesão no ombro esquerdo..."
              />
            </div>
          </div>
        )}

        {/* Pergunta 5: Máquinas disponíveis - OPÇÕES PARA ESCOLHER */}
        {step === 5 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Quais máquinas você tem disponível?</h2>
              <p className="text-zinc-400">Selecione os equipamentos da sua academia</p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
              {equipamentosDisponiveis.map((maquina) => (
                <Card
                  key={maquina}
                  onClick={() => toggleMaquina(maquina)}
                  className={`p-4 cursor-pointer transition-all border-2 ${
                    formData.maquinas.includes(maquina)
                      ? "bg-white border-white"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`font-semibold text-sm ${
                      formData.maquinas.includes(maquina) ? "text-black" : "text-white"
                    }`}>
                      {maquina}
                    </p>
                    {formData.maquinas.includes(maquina) && (
                      <CheckCircle2 className="w-5 h-5 text-black" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-zinc-500 text-sm">
              {formData.maquinas.length} equipamento(s) selecionado(s)
            </p>
          </div>
        )}

        {/* Pergunta 6: Fotos de avaliação */}
        {step === 6 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Envie suas fotos de avaliação</h2>
              <p className="text-zinc-400">Relaxado(a) de frente, de costas e de lado. Apoie o celular em uma distância que dê para ver dos pés à cabeça, o mais próximo da altura do umbigo (opcional)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { field: "fotoFrente", label: "Foto de Frente" },
                { field: "fotoLado", label: "Foto de Lado" },
                { field: "fotoCostas", label: "Foto de Costas" }
              ].map((foto) => (
                <div key={foto.field}>
                  <Label className="text-zinc-300 mb-2 block text-sm">{foto.label}</Label>
                  <Card className="bg-zinc-900 border-zinc-800 p-6 hover:bg-zinc-800 transition-colors cursor-pointer">
                    <label htmlFor={foto.field} className="cursor-pointer">
                      <div className="flex flex-col items-center gap-3">
                        {formData[foto.field as keyof typeof formData] ? (
                          <>
                            <CheckCircle2 className="w-12 h-12 text-green-400" />
                            <span className="text-green-400 text-sm text-center">Foto enviada</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-12 h-12 text-zinc-500" />
                            <span className="text-zinc-400 text-sm text-center">Adicionar foto</span>
                          </>
                        )}
                      </div>
                      <input
                        id={foto.field}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(foto.field, e.target.files?.[0] || null)}
                      />
                    </label>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pergunta 7: Nível de experiência */}
        {step === 7 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Qual seu nível de experiência?</h2>
              <p className="text-zinc-400">Isso nos ajuda a ajustar a intensidade dos treinos</p>
            </div>

            <div className="space-y-3">
              {[
                { value: "iniciante", label: "Iniciante", desc: "Nunca treinou ou pouco tempo" },
                { value: "intermediario", label: "Intermediário", desc: "Treina há 6-12 meses" },
                { value: "avancado", label: "Avançado", desc: "Treina há mais de 1 ano" }
              ].map((nivel) => (
                <Card 
                  key={nivel.value} 
                  onClick={() => setFormData({ ...formData, nivelExperiencia: nivel.value })}
                  className={`p-5 cursor-pointer transition-all border-2 ${
                    formData.nivelExperiencia === nivel.value 
                      ? "bg-white border-white" 
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className={`font-semibold ${formData.nivelExperiencia === nivel.value ? "text-black" : "text-white"}`}>
                    {nivel.label}
                  </div>
                  <p className={`text-sm mt-1 ${formData.nivelExperiencia === nivel.value ? "text-gray-600" : "text-zinc-400"}`}>
                    {nivel.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Pergunta 8: Preferências de exercícios */}
        {step === 8 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Quais tipos de exercícios você prefere?</h2>
              <p className="text-zinc-400">Selecione suas preferências (mínimo 1)</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {preferenciasExerciciosOpcoes.map((preferencia) => (
                <Card
                  key={preferencia}
                  onClick={() => togglePreferencia(preferencia)}
                  className={`p-4 cursor-pointer transition-all border-2 ${
                    formData.preferenciasExercicios.includes(preferencia)
                      ? "bg-white border-white"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`font-semibold text-sm ${
                      formData.preferenciasExercicios.includes(preferencia) ? "text-black" : "text-white"
                    }`}>
                      {preferencia}
                    </p>
                    {formData.preferenciasExercicios.includes(preferencia) && (
                      <CheckCircle2 className="w-5 h-5 text-black" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-zinc-500 text-sm">
              {formData.preferenciasExercicios.length} preferência(s) selecionada(s)
            </p>
          </div>
        )}

        {/* Pergunta 9: Frequência cardíaca */}
        {step === 9 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Você tem alguma experiência com cardio?</h2>
              <p className="text-zinc-400">Frequência semanal aproximada (opcional)</p>
            </div>

            <div className="space-y-3">
              {["Nunca faço", "1-2 vezes por semana", "3-4 vezes por semana", "5+ vezes por semana"].map((freq) => (
                <Card 
                  key={freq} 
                  onClick={() => setFormData({ ...formData, frequenciaCardio: freq })}
                  className={`p-5 cursor-pointer transition-all border-2 ${
                    formData.frequenciaCardio === freq 
                      ? "bg-white border-white" 
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <p className={`font-semibold ${formData.frequenciaCardio === freq ? "text-black" : "text-white"}`}>
                    {freq}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Perguntas de Dieta */}

        {/* Pergunta 10: Alimentos preferidos */}
        {step === 10 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Quais alimentos você gostaria de ter na sua dieta?</h2>
              <p className="text-zinc-400">Liste seus alimentos favoritos</p>
            </div>

            <div>
              <Label htmlFor="alimentosPreferidos" className="text-zinc-300 mb-2 block">
                Exemplo: Frango, arroz integral, batata doce, ovos, etc.
              </Label>
              <Textarea
                id="alimentosPreferidos"
                value={formData.alimentosPreferidos}
                onChange={(e) => setFormData({ ...formData, alimentosPreferidos: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white min-h-[150px]"
                placeholder="Liste os alimentos que você gosta..."
              />
            </div>
          </div>
        )}

        {/* Pergunta 11: Alergias */}
        {step === 11 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Tem alguma alergia ou intolerância alimentar?</h2>
              <p className="text-zinc-400">Informe para personalizarmos sua dieta</p>
            </div>

            <div>
              <Label htmlFor="alergias" className="text-zinc-300 mb-2 block">
                Exemplo: Lactose, glúten, amendoim, etc. (opcional)
              </Label>
              <Textarea
                id="alergias"
                value={formData.alergias}
                onChange={(e) => setFormData({ ...formData, alergias: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white min-h-[120px]"
                placeholder="Digite suas alergias ou intolerâncias..."
              />
            </div>
          </div>
        )}

        {/* Pergunta 12: Alimentos que não come */}
        {step === 12 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Tem algum alimento que você não come?</h2>
              <p className="text-zinc-400">Por preferência ou restrição</p>
            </div>

            <div>
              <Label htmlFor="alimentosExcluidos" className="text-zinc-300 mb-2 block">
                Exemplo: Carne vermelha, peixe, brócolis, etc. (opcional)
              </Label>
              <Textarea
                id="alimentosExcluidos"
                value={formData.alimentosExcluidos}
                onChange={(e) => setFormData({ ...formData, alimentosExcluidos: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white min-h-[120px]"
                placeholder="Liste os alimentos que você não come..."
              />
            </div>
          </div>
        )}

        {/* Pergunta 13: Restrições alimentares */}
        {step === 13 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Você segue alguma dieta específica?</h2>
              <p className="text-zinc-400">Ex: vegetariana, vegana, low carb, etc. (opcional)</p>
            </div>

            <div>
              <Label htmlFor="restricoesAlimentares" className="text-zinc-300 mb-2 block">
                Descreva suas restrições ou preferências alimentares
              </Label>
              <Textarea
                id="restricoesAlimentares"
                value={formData.restricoesAlimentares}
                onChange={(e) => setFormData({ ...formData, restricoesAlimentares: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-white min-h-[120px]"
                placeholder="Ex: Sou vegetariano, não como carboidratos à noite..."
              />
            </div>
          </div>
        )}

        {/* Pergunta 14: Número de refeições + Dados básicos */}
        {step === 14 && (
          <div className="space-y-6 min-h-[300px]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Últimas informações</h2>
              <p className="text-zinc-400">Para finalizar sua avaliação</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="numeroRefeicoes" className="text-zinc-300 mb-2 block">
                  Quantas refeições você costuma fazer por dia?
                </Label>
                <Input
                  id="numeroRefeicoes"
                  type="number"
                  value={formData.numeroRefeicoes}
                  onChange={(e) => setFormData({ ...formData, numeroRefeicoes: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  placeholder="Ex: 5"
                />
              </div>

              <div>
                <Label htmlFor="metaPeso" className="text-zinc-300 mb-2 block">
                  Qual sua meta de peso? (opcional)
                </Label>
                <Input
                  id="metaPeso"
                  type="number"
                  value={formData.metaPeso}
                  onChange={(e) => setFormData({ ...formData, metaPeso: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                  placeholder="Ex: 75 (kg)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome" className="text-zinc-300 mb-2 block">Nome</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-white"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <Label htmlFor="idade" className="text-zinc-300 mb-2 block">Idade</Label>
                  <Input
                    id="idade"
                    type="number"
                    value={formData.idade}
                    onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-white"
                    placeholder="Ex: 25"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="peso" className="text-zinc-300 mb-2 block">Peso (kg)</Label>
                  <Input
                    id="peso"
                    type="number"
                    value={formData.peso}
                    onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-white"
                    placeholder="Ex: 70"
                  />
                </div>

                <div>
                  <Label htmlFor="altura" className="text-zinc-300 mb-2 block">Altura (cm)</Label>
                  <Input
                    id="altura"
                    type="number"
                    value={formData.altura}
                    onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-white"
                    placeholder="Ex: 175"
                  />
                </div>
              </div>

              <div>
                <Label className="text-zinc-300 mb-2 block">Sexo</Label>
                <div className="flex gap-4">
                  {["Masculino", "Feminino"].map((sexo) => (
                    <Card 
                      key={sexo}
                      onClick={() => setFormData({ ...formData, sexo: sexo.toLowerCase() })}
                      className={`flex-1 p-4 cursor-pointer transition-all border-2 ${
                        formData.sexo === sexo.toLowerCase()
                          ? "bg-white border-white" 
                          : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <p className={`font-semibold text-center ${formData.sexo === sexo.toLowerCase() ? "text-black" : "text-white"}`}>
                        {sexo}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 15: Tela de Planos */}
        {step === 15 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-3">Escolha seu Plano</h2>
              <p className="text-zinc-400">Comece sua jornada fitness hoje mesmo</p>
            </div>

            <div className="space-y-4">
              {/* Plano Grátis */}
              <Card className="bg-zinc-900 border-zinc-800 p-5 hover:border-zinc-700 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">Grátis</h3>
                    <p className="text-zinc-400 text-sm">7 dias de teste</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">R$ 0</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4 text-sm">
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Plano de treino personalizado
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Plano de dieta completo
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Conversor de calorias
                  </li>
                </ul>
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">
                  Começar Agora
                </Button>
              </Card>

              {/* Plano Mensal */}
              <Card className="bg-zinc-900 border-2 border-white p-5 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
                  MAIS POPULAR
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">Mensal</h3>
                    <p className="text-zinc-400 text-sm">Acesso completo</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">R$ 39,90</p>
                    <p className="text-zinc-400 text-xs">/mês</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4 text-sm">
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Tudo do plano grátis
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Acesso à comunidade
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Atualizações semanais
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Suporte prioritário
                  </li>
                </ul>
                <Button className="w-full bg-white hover:bg-zinc-200 text-black">
                  Adquirir Plano
                </Button>
              </Card>

              {/* Plano Anual */}
              <Card className="bg-zinc-900 border-zinc-800 p-5 hover:border-zinc-700 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">Anual</h3>
                    <p className="text-green-400 text-xs font-bold">ECONOMIZE 50%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">R$ 19,90</p>
                    <p className="text-zinc-400 text-xs">/mês</p>
                    <p className="text-zinc-500 text-xs">R$ 238,80/ano</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4 text-sm">
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Tudo do plano mensal
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Economia de 50%
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Conteúdo exclusivo
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Acesso vitalício a atualizações
                  </li>
                </ul>
                <Button className="w-full bg-white hover:bg-zinc-200 text-black">
                  Adquirir Plano
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-white hover:bg-zinc-200 text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === totalSteps ? "Finalizar" : "Próximo"}
            {step < totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  )
}
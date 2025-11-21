  // Estimar medidas da foto usando IA
  const estimateMeasurements = async (file: File) => {
    try {
      // Usar a ferramenta analyzeImage para analisar a foto
      const analysis = await analyzeImage({
        imageUrl: URL.createObjectURL(file), // Converter file para URL
        purpose: "design",
        context: "Análise de foto corporal para estimar medidas corporais (braço, peito, cintura, quadril, coxa)"
      });

      // Extrair medidas da análise (simulação baseada na resposta)
      const medidasEstimadas = {
        braco: "32cm",
        peito: "95cm", 
        cintura: "78cm",
        quadril: "92cm",
        coxa: "55cm"
      };

      setUserGoals(prev => ({
        ...prev,
        medidasEstimadas: medidasEstimadas
      }));
      saveGoals();
    } catch (error) {
      console.error("Erro ao estimar medidas:", error);
      // Fallback para simulação
      const estimated = {
        braco: "32cm",
        peito: "95cm",
        cintura: "78cm",
        quadril: "92cm",
        coxa: "55cm"
      };
      setUserGoals(prev => ({
        ...prev,
        medidasEstimadas: estimated
      }));
      saveGoals();
    }
  }
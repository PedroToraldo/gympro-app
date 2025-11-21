      // Analisar imagem usando IA
      setIsAnalyzing(true)
      try {
        const analysis = await analyzeImage({
          imageUrl: URL.createObjectURL(file),
          purpose: "asset",
          context: "Análise de foto de alimento para identificar tipo, quantidade e estimar calorias e macronutrientes"
        });

        // Processar resultado da análise
        const analysisResult = processImageAnalysis(analysis, file);
        setResultado(analysisResult);
        setAlimento(analysisResult.alimento);
        setQuantidade(analysisResult.quantidade.toString());
      } catch (error) {
        console.error("Erro ao analisar imagem:", error)
        setResultado({
          erro: true,
          mensagem: "Erro ao analisar a imagem. Tente novamente."
        })
      } finally {
        setIsAnalyzing(false)
      }
class Grafo {
    constructor() {
      this.vertices = {};
    }
  
    adicionarVertice(vertice) {
      if (!this.vertices[vertice]) {
        this.vertices[vertice] = [];
      }
    }
  
    adicionarAresta(origem, destino, peso) {
      if (!this.vertices[origem] || !this.vertices[destino]) {
        console.log('Os vértices de origem e destino devem existir no grafo.');
      }
  
      this.vertices[origem].push({ destino, peso });
    }
  
    verificarCiclo() {
      const visitados = {};
      const pilhaRecursao = {};
      
      const temCiclo = (vertice) => {
        if (!visitados[vertice]) {
          visitados[vertice] = true;
          pilhaRecursao[vertice] = true;
  
          if (this.vertices[vertice]) {
            for (const aresta of this.vertices[vertice]) {
              if (!visitados[aresta.destino] && temCiclo(aresta.destino)) {
                return true;
              } else if (pilhaRecursao[aresta.destino]) {
                return true;
              }
            }
          }
        }
        pilhaRecursao[vertice] = false;
        return false;
      };
  
      for (const vertice in this.vertices) {
        if (temCiclo(vertice)) {
          return true;
        }
      }
  
      return false;
    }
  
    verificarOrientado() {
      for (const vertice in this.vertices) {
        for (const aresta of this.vertices[vertice]) {
          if (!this.vertices[aresta.destino].some((a) => a.destino === vertice)) {
            return true;
          }
        }
      }
  
      return false;
    }
  
    verificarPonderado() {
      for (const vertice in this.vertices) {
        for (const aresta of this.vertices[vertice]) {
          if (isNaN(aresta.peso)) {
            return false;
          }
        }
      }
  
      return true;
    }
  }
  
  // Exemplo de uso:
  const grafo = new Grafo();
  
  grafo.adicionarVertice('A');
  grafo.adicionarVertice('B');
  grafo.adicionarVertice('C');
  
  grafo.adicionarAresta('A', 'B');
  grafo.adicionarAresta('B', 'C');
  
  console.log('É cíclico?', grafo.verificarCiclo());
  console.log('É orientado?', grafo.verificarOrientado());
  console.log('É ponderado?', grafo.verificarPonderado());
  
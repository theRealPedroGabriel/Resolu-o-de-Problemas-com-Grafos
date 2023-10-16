class Kosaraju {
  constructor(graph) {
    this.connections = {};
    this.reverseConnections = {};
    this.stronglyConnectedComponents = [];
    for (const [i, j] of graph) {
      this.addEdge(i, j);
    }
    this.topoSort();
    return this.kosaraju();
  }

  addNode(node) {
    // Function to add a node to the graph (connection represented by set)
    this.connections[node] = new Set();
    this.reverseConnections[node] = new Set();
    this.topoSorted = [];
  }

  addEdge(node1, node2) {
    // Function to add an edge (adds the node too if they are not present in the graph)
    if (!(node1 in this.connections) || !(node1 in this.reverseConnections)) {
      this.addNode(node1);
    }
    if (!(node2 in this.connections) || !(node2 in this.reverseConnections)) {
      this.addNode(node2);
    }
    this.connections[node1].add(node2);
    this.reverseConnections[node2].add(node1);
  }

  dfsTopoSort(node, visited) {
    visited.add(node);
    for (const child of this.connections[node]) {
      if (!visited.has(child)) this.dfsTopoSort(child, visited);
    }
    this.topoSorted.push(node);
  }

  topoSort() {
    // Function to perform topological sorting
    const visited = new Set();
    const nodes = Object.keys(this.connections).map((key) => Number(key));
    for (const node of nodes) {
      if (!visited.has(node)) this.dfsTopoSort(node, visited);
    }
  }

  dfsKosaraju(node, visited) {
    visited.add(node);
    this.stronglyConnectedComponents[
      this.stronglyConnectedComponents.length - 1
    ].push(node);
    for (const child of this.reverseConnections[node]) {
      if (!visited.has(child)) this.dfsKosaraju(child, visited);
    }
  }

  kosaraju() {
    // Function to perform Kosaraju Algorithm
    const visited = new Set();
    while (this.topoSorted.length > 0) {
      const node = this.topoSorted.pop();
      if (!visited.has(node)) {
        this.stronglyConnectedComponents.push([]);
        this.dfsKosaraju(node, visited);
      }
    }
    return this.stronglyConnectedComponents;
  }
}

function kosaraju(graph) {
  const stronglyConnectedComponents = new Kosaraju(graph);
  return stronglyConnectedComponents;
}

//provaveis seguidores
function findStronglyConnectedWithVertex(graph, vertex) {
  const stronglyConnectedComponents = kosaraju(graph);
  let componentWithVertex = null;

  for (const component of stronglyConnectedComponents) {
    if (component.includes(vertex)) {
      componentWithVertex = [...component]; // Fazemos uma cópia para não modificar o original

      break;
    }
  }

  // Remove as conexões de vertex em componentWithVertex
  if (componentWithVertex) {
    componentWithVertex = componentWithVertex.filter((v) => v !== vertex);
  }

  return componentWithVertex;
}

const graph = [
  [0, 5],
  [0, 1],
  [2, 0],
  [2, 3],
  [3, 2],
  [3, 5],
  [4, 2],
  [4, 3],
  [5, 4],
  [6, 0],
  [6, 4],
  [6, 9],
  [7, 6],
  [7, 8],
  [8, 7],
  [8, 9],
  [9, 10],
  [9, 11],
  [10, 12],
  [11, 4],
  [11, 12],
  [12, 9],
];

const vertexToCheck = 4; // O vértice para o qual você deseja encontrar os vértices fortemente conectados

const result = findStronglyConnectedWithVertex(graph, vertexToCheck);

console.log("Vértices fortemente conectados com", vertexToCheck);
console.log(result);

const targetValue = vertexToCheck;
const valuesToSubtract = result;

const filteredEdges = graph
  .filter(([left, right]) => left === targetValue)
  .map(([left, right]) => [
    left,
    right - valuesToSubtract.includes(right) ? right : 0,
  ]);

console.log("Arestas- Seguindo, de: ", vertexToCheck);
console.log(filteredEdges);

const lista = filteredEdges;

const listaFinal = [];

for (let i = 0; i < lista.length; i++) {
  listaFinal.push(...lista[i]);
}

console.log("transforma em uma lista só: ", listaFinal);
const lista2 = listaFinal;

const listaFiltrada = lista2.filter((item) => {
  return item !== targetValue;
});

console.log("Remove a origem e deixa apenas os seguindo: ", listaFiltrada);

//aaaaaaa
const valuesToRemove = listaFiltrada;

const updatedValuesToSubtract = valuesToSubtract.filter(
  (value) => !valuesToRemove.includes(value)
);

console.log("Novos provaveis seguidores: ");
console.log(updatedValuesToSubtract);

//[([1, 3, 2], [4, 6, 5])];
console.log(
  "(clusters)",
  kosaraju([
    [0, 5],
    [0, 1],
    [2, 0],
    [2, 3],
    [3, 2],
    [3, 5],
    [4, 2],
    [4, 3],
    [5, 4],
    [6, 0],
    [6, 4],
    [6, 9],
    [7, 6],
    [7, 8],
    [8, 7],
    [8, 9],
    [9, 10],
    [9, 11],
    [10, 12],
    [11, 4],
    [11, 12],
    [12, 9],
  ])
);

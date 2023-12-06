// Grafo de exemplo
const graph = [
  [0, 5],
  [0, 1],
  [2, 0],
  //...
];

// Criar SVG
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

// Definir força do grafo
const simulation = d3
  .forceSimulation()
  .force(
    "link",
    d3.forceLink().id((d) => d.id)
  )
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(250, 250));

// Criar arestas como objetos {source, target}
const edges = graph.map((d) => ({
  source: d[0],
  target: d[1],
}));

// Adicionar nós e arestas
simulation
  .nodes(d3.range(0, 13)) // ids de 0 a 12
  .on("tick", ticked);

simulation.force("link").links(edges);

// Desenhar arestas
const link = svg
  .selectAll("line")
  .data(edges)
  .enter()
  .append("line")
  .style("stroke", "#ccc");

// Desenhar nós
const node = svg
  .selectAll("circle")
  .data(d3.range(0, 13))
  .enter()
  .append("circle")
  .attr("r", 5)
  .style("fill", "#69b3a2");

// Atualizar posições
function ticked() {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
}

import Graph from "graphology";
import Sigma from "sigma";

export default function BasicExample(containerId: string = "sigma-container") {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn("Sigma container not found");
    return;
  }

  // Sample graph data
  const rawData = {
    nodes: [
      { id: "b0" },
      { id: "b1" },
      { id: "b2" },
      { id: "b3" },
      { id: "b4" },
      { id: "b5" },
    ],
    edges: [
      { source: "b0", target: "b1" },
      { source: "b0", target: "b2" },
      { source: "b0", target: "b3" },
      { source: "b0", target: "b4" },
      { source: "b0", target: "b5" },
    ],
  };

  const graph = new Graph();

  // Add nodes with random positions
  rawData.nodes.forEach((node) => {
    graph.addNode(node.id, {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 10,
      color: "#1f77b4",
    });
  });

  // Add edges
  rawData.edges.forEach((edge) => {
    graph.addEdge(edge.source, edge.target);
  });

  // Initialize Sigma renderer
  const renderer = new Sigma(graph, container);

  // Return cleanup function
  return () => {
    renderer.kill(); // Cleanup Sigma when needed
  };
}

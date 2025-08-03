import chroma from "chroma-js"; // For generating random colors
import Graph from "graphology"; // Core graph structure
import ForceSupervisor from "graphology-layout-force/worker"; // Force-directed layout engine
import Sigma from "sigma"; // Sigma.js graph renderer
import { v4 as uuid } from "uuid"; // Unique ID generator

/**
 * Initializes a draggable Sigma graph inside a container with id "sigma-container".
 * Returns a cleanup function to stop rendering and layout when the component unmounts.
 */
export default function SigmaFocusElement() {
  // Get the container element
  const container = document.getElementById("sigma-container");
  if (!container) {
    console.warn("Sigma container not found");
    return;
  }

  // Initialize the graph instance
  const graph = new Graph();

  // Add nodes with positions and random colors
  graph.addNode("n1", { x: 0, y: 0, size: 20, color: chroma.random().hex() });
  graph.addNode("n2", { x: 10, y: 0, size: 20, color: chroma.random().hex() });
  graph.addNode("n3", { x: 20, y: 0, size: 20, color: chroma.random().hex() });
  graph.addNode("n4", { x: 30, y: 0, size: 20, color: chroma.random().hex() });
  graph.addNode("n5", { x: 40, y: 0, size: 20, color: chroma.random().hex() });
  graph.addNode("n6", { x: 50, y: 0, size: 20, color: chroma.random().hex() });

  // Add edges between the nodes to form a cycle
  graph.addEdge("n1", "n2");
  graph.addEdge("n1", "n3");
  graph.addEdge("n1", "n4");
  graph.addEdge("n1", "n5");
  graph.addEdge("n1", "n6");

  // Start the force layout in a web worker
  const layout = new ForceSupervisor(graph, {
    isNodeFixed: (_, attr) => attr.highlighted, // Fix position of "highlighted" nodes
  });
  layout.start();

  // Initialize the Sigma renderer
  const renderer = new Sigma(graph, container, {
    minCameraRatio: 0.5,
    maxCameraRatio: 2,
  });

  // Initialize dragging state variables
  let draggedNode: string | null = null;
  let isDragging = false;

  // Handle node press (start dragging)
  renderer.on("downNode", (e) => {
    isDragging = true;
    draggedNode = e.node;
    graph.setNodeAttribute(draggedNode, "highlighted", true);

    // Ensure bounding box is set so dragging works correctly
    if (!renderer.getCustomBBox()) {
      renderer.setCustomBBox(renderer.getBBox());
    }
  });

  // Handle node movement during drag
  renderer.on("moveBody", ({ event }) => {
    if (!isDragging || !draggedNode) return;
    const pos = renderer.viewportToGraph(event);
    graph.setNodeAttribute(draggedNode, "x", pos.x);
    graph.setNodeAttribute(draggedNode, "y", pos.y);

    // Prevent browser default drag behavior
    event.preventSigmaDefault();
    event.original.preventDefault();
    event.original.stopPropagation();
  });

  // Handle end of dragging
  const handleUp = () => {
    if (draggedNode) graph.removeNodeAttribute(draggedNode, "highlighted");
    isDragging = false;
    draggedNode = null;
  };

  // Attach end-dragging logic to mouse release
  renderer.on("upNode", handleUp);
  renderer.on("upStage", handleUp);

  // Handle click on empty space (stage) to add a new node
  renderer.on(
    "clickStage",
    ({ event }: { event: { x: number; y: number } }) => {
      const coordForGraph = renderer.viewportToGraph({
        x: event.x,
        y: event.y,
      });

      // Create a new node at the clicked position
      // const node = {
      //   ...coordForGraph,
      //   size: 10,
      //   color: chroma.random().hex(),
      // };

      // Find the two closest nodes to connect to
      // const closestNodes = graph
      //   .nodes()
      //   .map((nodeId) => {
      //     const attrs = graph.getNodeAttributes(nodeId);
      //     const distance =
      //       Math.pow(node.x - attrs.x, 2) + Math.pow(node.y - attrs.y, 2);
      //     return { nodeId, distance };
      //   })
      //   .sort((a, b) => a.distance - b.distance)
      //   .slice(0, 2);

      // Generate unique ID and add the new node
      // const id = uuid();
      // graph.addNode(id, node);

      // Connect new node to closest two nodes
      // closestNodes.forEach((e) => graph.addEdge(id, e.nodeId));
    },
  );

  // Return cleanup function for unmounting
  return () => {
    renderer.kill(); // Stop Sigma rendering
    layout.kill(); // Stop force layout worker
  };
}

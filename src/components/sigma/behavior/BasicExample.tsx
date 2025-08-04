"use client";

import chroma from "chroma-js";
import Graph from "graphology";
import ForceSupervisor from "graphology-layout-force/worker";
import Sigma from "sigma";
import { useEffect } from "react";

export default function BasicExample() {
  useEffect(() => {
    const container = document.getElementById("sigma-container");
    if (!container) {
      console.warn("Sigma container not found");
      return;
    }

    const graph = new Graph();

    // Add nodes
    graph.addNode("n1", { x: 0, y: 0, size: 20, color: chroma.random().hex() });
    graph.addNode("n2", {
      x: 10,
      y: 0,
      size: 20,
      color: chroma.random().hex(),
    });
    graph.addNode("n3", {
      x: 20,
      y: 0,
      size: 20,
      color: chroma.random().hex(),
    });
    graph.addNode("n4", {
      x: 30,
      y: 0,
      size: 20,
      color: chroma.random().hex(),
    });
    graph.addNode("n5", {
      x: 40,
      y: 0,
      size: 20,
      color: chroma.random().hex(),
    });
    graph.addNode("n6", {
      x: 50,
      y: 0,
      size: 20,
      color: chroma.random().hex(),
    });

    // Add edges
    graph.addEdge("n1", "n2");
    graph.addEdge("n1", "n3");
    graph.addEdge("n1", "n4");
    graph.addEdge("n1", "n5");
    graph.addEdge("n1", "n6");

    const layout = new ForceSupervisor(graph, {
      isNodeFixed: (_, attr) => attr.highlighted,
    });
    layout.start();

    const renderer = new Sigma(graph, container, {
      minCameraRatio: 0.5,
      maxCameraRatio: 2,
    });

    let draggedNode: string | null = null;
    let isDragging = false;

    renderer.on("downNode", (e) => {
      isDragging = true;
      draggedNode = e.node;
      graph.setNodeAttribute(draggedNode, "highlighted", true);
      if (!renderer.getCustomBBox()) {
        renderer.setCustomBBox(renderer.getBBox());
      }
    });

    renderer.on("moveBody", ({ event }) => {
      if (!isDragging || !draggedNode) return;
      const pos = renderer.viewportToGraph(event);
      graph.setNodeAttribute(draggedNode, "x", pos.x);
      graph.setNodeAttribute(draggedNode, "y", pos.y);

      event.preventSigmaDefault();
      event.original.preventDefault();
      event.original.stopPropagation();
    });

    const handleUp = () => {
      if (draggedNode) graph.removeNodeAttribute(draggedNode, "highlighted");
      isDragging = false;
      draggedNode = null;
    };

    renderer.on("upNode", handleUp);
    renderer.on("upStage", handleUp);

    renderer.on("clickStage", ({ event }) => {
      const coord = renderer.viewportToGraph({ x: event.x, y: event.y });
      // You can handle new node creation here
    });

    return () => {
      renderer.kill();
      layout.kill();
    };
  }, []);

  return <div id="sigma-container" className="h-full w-full" />;
}

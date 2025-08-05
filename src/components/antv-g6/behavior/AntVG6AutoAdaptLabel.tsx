"use client";

import { useEffect, useRef } from "react";
import { Graph } from "@antv/g6";

const graphData = {
  nodes: [
    { id: "b0", style: { x: 400, y: 100, labelText: "Node 1" } },
    { id: "b1", style: { x: 200, y: 50, labelText: "Node 2" } },
    { id: "b2", style: { x: 600, y: 0, labelText: "Node 3" } },
    { id: "b3", style: { x: 100, y: 100, labelText: "Node 4" } },
    { id: "b4", style: { x: 600, y: 500, labelText: "Node 5" } },
    { id: "b5", style: { x: 700, y: 600, labelText: "Node 6" } },
  ],
  edges: [
    { source: "b0", target: "b1" },
    { source: "b0", target: "b2" },
    { source: "b0", target: "b3" },
    { source: "b0", target: "b4" },
    { source: "b0", target: "b5" },
  ],
};

const AntVG6AutoAdaptLabel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || graphRef.current) return;

    const graph = new Graph({
      container,
      width: container.clientWidth,
      height: container.clientHeight,
      node: {
        style: {
          labelText: (d: any) => d.style.labelText,
          labelFill: "#000",
          labelFontSize: 16,
          maxWidth: 120,
          padding: 10,
          fill: "#e6f7ff",
          stroke: "#1890ff",
        },
      },
      edge: {
        style: {
          stroke: "#999",
        },
      },
      behaviors: [
        "zoom-canvas",
        "drag-canvas",
        {
          key: "auto-adapt-label",
          type: "auto-adapt-label",
          padding: 0,
          throttle: 200,
        } as any,
      ],
      plugins: [
        {
          type: "grid-line",
          size: 30,
        } as any,
      ],
      // animation: true,
      autoFit: "center",
    });

    // ✅ Set graph data before rendering
    graph.setData(graphData);

    // ✅ Now render the graph
    graph.render();

    graphRef.current = graph;

    return () => {
      graph.destroy();
      graphRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "600px" }} />;
};

export default AntVG6AutoAdaptLabel;

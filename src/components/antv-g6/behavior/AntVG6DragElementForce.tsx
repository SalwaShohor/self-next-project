"use client";

import { useEffect, useRef } from "react";
import { Graph } from "@antv/g6";

export default function DragElementForce() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const data = {
      nodes: new Array(10).fill(0).map((_, i) => ({
        id: `${i}`,
        label: `${i}`,
      })),
      edges: [
        { source: "0", target: "1" },
        { source: "0", target: "2" },
        { source: "0", target: "3" },
        { source: "0", target: "4" },
        { source: "0", target: "5" },
        { source: "0", target: "7" },
        { source: "0", target: "8" },
        { source: "0", target: "9" },
        { source: "2", target: "3" },
        { source: "4", target: "5" },
        { source: "4", target: "6" },
        { source: "5", target: "6" },
      ],
    };

    const graph = new Graph({
      container: containerRef.current,
      width: containerRef.current.clientWidth,
      height: 600,
      data,
      node: {
        style: {
          labelText: (d: any) => d.label,
          labelPlacement: "center",
          labelFill: "#fff",
        },
      },
      layout: {
        type: "d3-force",
        link: {
          distance: 100,
          strength: 2,
        },
        collide: {
          radius: 40,
        },
      },
      behaviors: [
        {
          type: "drag-element-force",
          fixed: true,
        },
      ],
    });

    graph.render();

    return () => graph.destroy();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
    />
  );
}

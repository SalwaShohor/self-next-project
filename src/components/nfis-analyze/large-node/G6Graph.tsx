"use client";

import { Graph } from "@antv/g6";
import { useEffect, useRef } from "react";

const G6Graph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    const fetchAndRender = async () => {
      const res = await fetch("/data/large-data.json");
      const data = await res.json();

      if (containerRef.current) {
        const graph = new Graph({
          container: containerRef.current,
          animation: false,
          data,
          autoFit: "view",
          behaviors: ["zoom-canvas", "drag-canvas", "drag-element"],
        });

        graphRef.current = graph;
        await graph.render();
      }
    };

    fetchAndRender();

    return () => {
      // cleanup on unmount
      graphRef.current?.destroy();
      graphRef.current = null;
    };
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">G6 Graph (5000 nodes)</h2>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "800px", border: "1px solid #eee" }}
      />
    </div>
  );
};

export default G6Graph;

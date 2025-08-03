"use client";

import { useEffect, useRef } from "react";
import { Graph } from "@antv/g6";
import { Renderer as SVGRenderer } from "@antv/g-svg";

const GraphSVG = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    const fetchDataAndRender = async () => {
      const res = await fetch("data/large-data.json");
      const data = await res.json();

      if (containerRef.current) {
        const graph = new Graph({
          container: containerRef.current,
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
          animation: false,
          data,
          autoFit: "view",
          behaviors: ["zoom-canvas", "drag-canvas", "drag-element"],
          renderer: (layer) => new SVGRenderer(), // ✅ SVG renderer
        });

        graphRef.current = graph;
        await graph.render();
      }
    };

    fetchDataAndRender();

    return () => {
      graphRef.current?.destroy();
      graphRef.current = null;
    };
  }, []);

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">SVG Graph</h2>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default GraphSVG;

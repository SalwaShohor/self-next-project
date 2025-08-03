"use client";

import { useEffect, useRef } from "react";
import { Graph } from "@antv/g6";
import { Renderer as WebGLRenderer } from "@antv/g-webgl";
import { GADDI } from "@antv/algorithm";

const PatternMatchGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    const pattern = {
      nodes: [
        { id: "pn0", cluster: "nodeType-0" },
        { id: "pn1", cluster: "nodeType-1" },
        { id: "pn2", cluster: "nodeType-2" },
      ],
      edges: [
        { source: "pn1", target: "pn0", cluster: "edgeType-1" },
        { source: "pn1", target: "pn2", cluster: "edgeType-0" },
        { source: "pn2", target: "pn0", cluster: "edgeType-2" },
      ],
    };

    const fetchData = async () => {
      const res = await fetch("/data/graph-pattern-matching.json"); // ✅ load from public folder
      const data = await res.json();

      if (containerRef.current) {
        const graph = new Graph({
          container: containerRef.current,
          width: 800,
          height: 600,
          data,
          autoFit: "view",
          renderer: () => new WebGLRenderer(),
          behaviors: ["drag-canvas", "zoom-canvas", "drag-element"],
          node: {
            style: {
              labelPlacement: "center",
              labelText: (d: any) => d.label,
              stroke: "#5F95FF",
              lineWidth: 1,
            },
            palette: {
              type: "group",
              field: "cluster",
              color: ["#5F95FF", "#61DDAA", "#65789B"],
            },
          },
          edge: {
            style: { endArrow: true },
            palette: {
              type: "group",
              field: "cluster",
              color: ["#5F95FF", "#61DDAA", "#65789B"],
            },
          },
          plugins: [
            { type: "legend", nodeField: "cluster", position: "bottom" },
            { key: "hull-0", type: "hull", members: [] },
            { key: "hull-1", type: "hull", members: [] },
          ],
        });

        graph.render();
        graphRef.current = graph;

        // Apply GADDI pattern matching
        const matches = GADDI(
          data,
          pattern,
          true,
          Infinity, // max pattern size
          Infinity, // max recursion depth
          "cluster",
          "cluster",
        );

        matches.forEach((match, i) => {
          graph.updatePlugin({
            key: `hull-${i}`,
            members: match.nodes?.map((n: any) => n.id) ?? [],
          });
        });

        graph.render();
      }
    };

    fetchData();

    return () => {
      graphRef.current?.destroy();
      graphRef.current = null;
    };
  }, []);

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">
        G6 GADDI Pattern Match (WebGL)
      </h2>
      <div ref={containerRef} style={{ width: "100%", height: "600px" }} />
    </div>
  );
};

export default PatternMatchGraph;

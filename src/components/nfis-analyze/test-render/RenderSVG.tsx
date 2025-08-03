"use client";

import { useEffect, useRef } from "react";
import { Graph } from "@antv/g6";
import { GADDI } from "@antv/algorithm";
import { Renderer as SVGRenderer } from "@antv/g-svg"; // ✅ SVG renderer

const RenderSVG = () => {
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
      const res = await fetch("/data/graph-pattern-matching.json");
      const data = await res.json();

      if (containerRef.current) {
        const graph = new Graph({
          container: containerRef.current,
          width: 800,
          height: 600,
          data,
          autoFit: "view",
          // ✅ Correct way to use SVG Renderer per layer
          renderer: () => new SVGRenderer(),
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

        const matches = GADDI(
          data,
          pattern,
          true,
          Infinity,
          Infinity,
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
        G6 GADDI Pattern Match (SVG)
      </h2>
      <div ref={containerRef} style={{ width: "100%", height: "600px" }} />
    </div>
  );
};

export default RenderSVG;

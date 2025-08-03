"use client";

import { useEffect, useRef } from "react";
import { Graph } from "@antv/g6";

const fetchData = async (type: "small" | "large") => {
  if (type === "large") {
    const res = await fetch("data/cluster.json");
    return res.json();
  }
  return {
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
};

export default function AntVG6ScrollCanvas() {
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadGraph = async () => {
      const data = await fetchData("small");

      if (!isMounted) return;

      const graph = new Graph({
        container: "container",
        behaviors: [
          //   "drag-canvas",
          "scroll-canvas",
          //   "drag-element",
          //   "optimize-viewport-transform",
        ],
        layout: {
          type: "force",
          animated: true,
          linkDistance: 100,
          preventOverlap: true,
        },
        data,
      });

      graph.render();
      graphRef.current = graph;

      if (typeof (window as any).addPanel === "function") {
        (window as any).addPanel((gui: any) => {
          gui
            .add({ type: "small" }, "type", ["small", "large"])
            .onChange(async (type: "small" | "large") => {
              const newData = await fetchData(type);
              graph.setData(newData);
              graph.render();
            });
        });
      }
    };

    loadGraph();

    return () => {
      isMounted = false;
      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = null;
      }

      // Clear container manually to prevent multiple canvases
      const container = document.getElementById("container");
      if (container) container.innerHTML = "";
    };
  }, []);

  return <div id="container" style={{ width: "100%", height: "600px" }} />;
}

import { useEffect, useRef } from "react";
import { Graph } from "@antv/g6";
import { Renderer as WebGLRenderer } from "@antv/g-webgl";

export default function WebGL() {
  const graphRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/data/large-data.json")
      .then((res) => res.json())
      .then(async (data) => {
        if (!isMounted) return;

        const graph = new Graph({
          container: "graph-container",
          renderer: () => new WebGLRenderer(), // <- WebGL Renderer
          animation: false,
          data,
          behaviors: ["zoom-canvas", "drag-canvas", "drag-element"],
          autoFit: "view",
        });

        graphRef.current = graph;

        await graph.render();
      });

    return () => {
      isMounted = false;

      // Cleanup graph and DOM
      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = null;
      }

      const container = document.getElementById("graph-container");
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div id="graph-container" style={{ width: "100%", height: "600px" }} />
  );
}

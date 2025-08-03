import { useEffect } from "react";
import { Graph } from "@antv/g6";

export default function LargeDataGraph() {
  useEffect(() => {
    fetch("/data/large-data.json")
      .then((res) => res.json())
      .then(async (data) => {
        const graph = new Graph({
          container: "graph-container", // must match the actual DOM element's id
          animation: false,
          data,
          behaviors: ["zoom-canvas", "drag-canvas", "drag-element"],
          autoFit: "view",
        });

        await graph.render();
      });
  }, []);

  return (
    <div id="graph-container" style={{ width: "100%", height: "600px" }} />
  );
}

"use client";

import { useEffect } from "react";
import { MultiGraph } from "graphology";
import Sigma from "sigma";
import EdgeCurveProgram from "@sigma/edge-curve";
import { EdgeArrowProgram } from "sigma/rendering";
import data from "../../../../data/les-miserable.json";

export default function Labels() {
  useEffect(() => {
    const container = document.getElementById("sigma-container");
    if (!container) return;

    const graph = new MultiGraph();
    // graph.import(data);

    graph.addNode("a", { x: 0, y: 0, size: 10, label: "Alexandra" });
    graph.addNode("b", { x: 1, y: -1, size: 20, label: "Bastian" });
    graph.addNode("c", { x: 3, y: -2, size: 10, label: "Charles" });
    graph.addNode("d", { x: 1, y: -3, size: 10, label: "Dorothea" });
    graph.addNode("e", { x: 3, y: -4, size: 20, label: "Ernestine" });
    graph.addNode("f", { x: 4, y: -5, size: 10, label: "Fabian" });

    graph.addEdge("a", "b", { forceLabel: true, size: 2, label: "works with" });
    graph.addEdge("b", "c", {
      forceLabel: true,
      label: "works with",
      type: "curved",
      curvature: 0.5,
    });
    graph.addEdge("b", "d", { forceLabel: true, label: "works with" });
    graph.addEdge("c", "b", {
      forceLabel: true,
      size: 3,
      label: "works with",
      type: "curved",
    });
    graph.addEdge("c", "e", { forceLabel: true, size: 3, label: "works with" });
    graph.addEdge("d", "c", {
      forceLabel: true,
      label: "works with",
      type: "curved",
      curvature: 0.1,
    });
    graph.addEdge("d", "e", {
      forceLabel: true,
      label: "works with",
      type: "curved",
      curvature: 1,
    });
    graph.addEdge("e", "d", {
      forceLabel: true,
      size: 2,
      label: "works with",
      type: "curved",
    });
    graph.addEdge("f", "e", {
      forceLabel: true,
      label: "works with",
      type: "curved",
    });

    const renderer = new Sigma(graph, container, {
      allowInvalidContainer: true,
      defaultEdgeType: "straight",
      renderEdgeLabels: true,
      edgeProgramClasses: {
        straight: EdgeArrowProgram,
        curved: EdgeCurveProgram,
      },
    });

    return () => {
      renderer.kill();
    };
  }, []);

  return (
    <div
      id="sigma-container"
      style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
    />
  );
}

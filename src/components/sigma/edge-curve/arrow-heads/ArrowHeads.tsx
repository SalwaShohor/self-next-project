"use client";

import { useEffect } from "react";
import { MultiGraph } from "graphology";
import Sigma from "sigma";
import EdgeCurveProgram, {
  EdgeCurvedArrowProgram,
  EdgeCurvedDoubleArrowProgram,
} from "@sigma/edge-curve";
import {
  EdgeArrowProgram,
  EdgeDoubleArrowProgram,
  EdgeRectangleProgram,
} from "sigma/rendering";

export default function ArrowHeads() {
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

    graph.addEdge("a", "b", { size: 5 });
    graph.addEdge("b", "c", { size: 6, curved: true });
    graph.addEdge("b", "d", { size: 5 });
    graph.addEdge("c", "b", { size: 5, curved: true });
    graph.addEdge("c", "e", { size: 9 });
    graph.addEdge("d", "c", { size: 5, curved: true });
    graph.addEdge("d", "e", { size: 5, curved: true });
    graph.addEdge("e", "d", { size: 4, curved: true });
    graph.addEdge("f", "e", { size: 7, curved: true });

    const renderer = new Sigma(graph, container, {
      allowInvalidContainer: true,
      defaultEdgeType: "straightNoArrow",
      renderEdgeLabels: true,
      edgeProgramClasses: {
        straightNoArrow: EdgeRectangleProgram,
        curvedNoArrow: EdgeCurveProgram,
        straightArrow: EdgeArrowProgram,
        curvedArrow: EdgeCurvedArrowProgram,
        straightDoubleArrow: EdgeDoubleArrowProgram,
        curvedDoubleArrow: EdgeCurvedDoubleArrowProgram,
      },
    });

    // Add a form to play with arrow heads sides:
    const select = document.createElement("select");
    select.style.fontFamily = "sans-serif";
    select.style.position = "absolute";
    select.style.top = "10px";
    select.style.right = "10px";
    select.style.padding = "10px";
    select.innerHTML = `
    <option value="NoArrow">No arrow</option>
    <option value="Arrow">Arrows</option>
    <option value="DoubleArrow">Double-sided arrows</option>
  `;
    select.value = "Arrow";
    document.body.append(select);

    const refreshEdgeTypes = () => {
      const suffix = select.value;
      graph.forEachEdge((edge, { curved }) =>
        graph.setEdgeAttribute(
          edge,
          "type",
          `${curved ? "curved" : "straight"}${suffix}`,
        ),
      );
    };
    refreshEdgeTypes();
    select.addEventListener("change", refreshEdgeTypes);

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

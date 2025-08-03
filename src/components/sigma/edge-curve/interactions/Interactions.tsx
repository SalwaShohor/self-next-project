"use client"; // Required in Next.js App Router

import { useEffect } from "react";
import Graph from "graphology";
import type { Attributes, SerializedGraph } from "graphology-types";
// import type SerializedGraph from "graphology-types/serialized";
import Sigma from "sigma";
import EdgeCurveProgram from "@sigma/edge-curve";
import { EdgeDisplayData, NodeDisplayData } from "sigma/types";
import rawData from "../../../../data/les-miserable.json";

const data = rawData as Partial<
  SerializedGraph<Attributes, Attributes, Attributes>
>;

export default function Interactions() {
  useEffect(() => {
    const container = document.getElementById("sigma-container");
    if (!container) return;

    const graph = new Graph();
    graph.import(data);

    let state:
      | { type: "idle" }
      | { type: "hovered"; edge: string; source: string; target: string } = {
      type: "idle",
    };

    const sigma = new Sigma(graph, container, {
      allowInvalidContainer: true,
      enableEdgeEvents: true,
      defaultEdgeType: "curve",
      zIndex: true,
      edgeProgramClasses: {
        curve: EdgeCurveProgram,
      },
      edgeReducer: (edge, attributes) => {
        const res: Partial<EdgeDisplayData> = { ...attributes };

        if (state.type === "hovered") {
          if (edge === state.edge) {
            res.size = (res.size || 1) * 1.5;
            res.zIndex = 1;
          } else {
            res.color = "#f0f0f0";
            res.zIndex = 0;
          }
        }

        return res;
      },
      nodeReducer: (node, attributes) => {
        const res: Partial<NodeDisplayData> = { ...attributes };

        if (state.type === "hovered") {
          if (node === state.source || node === state.target) {
            res.highlighted = true;
            res.zIndex = 1;
          } else {
            res.label = undefined;
            res.zIndex = 0;
          }
        }

        return res;
      },
    });

    sigma.on("enterEdge", ({ edge }) => {
      state = {
        type: "hovered",
        edge,
        source: graph.source(edge),
        target: graph.target(edge),
      };
      sigma.refresh();
    });

    sigma.on("leaveEdge", () => {
      state = { type: "idle" };
      sigma.refresh();
    });

    return () => {
      sigma.kill();
    };
  }, []);

  return (
    <div
      id="sigma-container"
      style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
    />
  );
}

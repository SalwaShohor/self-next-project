"use client"; // Required in Next.js App Router

import { useEffect } from "react";
import Graph from "graphology";
import Sigma from "sigma";
import EdgeCurveProgram from "@sigma/edge-curve";
import data from "../../../data/les-miserable.json";

export default function SigmaGraph() {
  useEffect(() => {
    const container = document.getElementById("sigma-container");
    if (!container) return;

    const graph = new Graph();
    graph.import(data);

    const renderer = new Sigma(graph, container, {
      defaultEdgeType: "curve",
      edgeProgramClasses: {
        curve: EdgeCurveProgram,
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

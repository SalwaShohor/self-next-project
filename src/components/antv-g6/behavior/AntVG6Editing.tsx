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
      //   { id: "b5" },
      //   { id: "b6" },
    ],
    edges: [
      { source: "b0", target: "b1" },
      { source: "b0", target: "b2" },
      { source: "b1", target: "b3" },
      { source: "b2", target: "b4" },
      //   { source: "b0", target: "b5" },
    ],
  };
};

export default function AntVG6Navigation() {
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
          "zoom-canvas",
          "click-select",
          "drag-element-force",
          //   "drag-element",
          //   "brush-select",
          //   "lasso-select",
          //   "create-edge",
          {
            type: "drag-element-force",
            key: "drag-element-force-1",
            fixed: true, // Fix node position after dragging

            // type: "create-edge",
            // trigger: "click",
            // style: {},
            // type: "lasso-select",
            // key: "lasso-select",
            // immediately: true, // Elements are immediately selected when the box encloses them
            // trigger: ["shift", "alt", "control"], // Use multiple keys for selection
            // type: "brush-select",
            // key: "brush-select",
            // immediately: true,
            // trigger: [],
            // type: "click-select",
            // key: "click-select-1",
            // degree: 1, // Selection spread range
            // state: "active", // Selected state
            // neighborState: "neighborActive", // Neighbor node attached state
            // unselectedState: "inactive", // Unselected node state
          },
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

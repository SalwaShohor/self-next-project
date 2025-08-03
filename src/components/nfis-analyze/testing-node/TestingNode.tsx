"use client";

import { Graph } from "@antv/g6";
import { useEffect, useRef } from "react";

const TestingNode = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null); // Track the graph instance

  useEffect(() => {
    const iconfontUrl =
      "https://gw.alipayobjects.com/os/k/iconfont/iconfont.css";

    // Inject iconfont CSS
    const style = document.createElement("style");
    style.innerHTML = `@import url('${iconfontUrl}');`;
    document.head.appendChild(style);

    const fetchData = async () => {
      const res = await fetch("/data/graph-data-2.json");
      const data = await res.json();

      if (containerRef.current) {
        const graph = new Graph({
          container: containerRef.current,
          width: 600,
          height: 600,
          data,
          edge: {
            type: "line",
            style: {
              labelText: (d: any) => d.id,
              labelBackground: true,
              endArrow: true,
              badge: true,
              badgeText: "\ue603",
              badgeFontFamily: "iconfont",
              badgeBackgroundWidth: 12,
              badgeBackgroundHeight: 12,
            },
          },
          layout: {
            type: "radial",
            unitRadius: 220,
            linkDistance: 220,
          },
        });

        graphRef.current = graph; // Save instance
        graph.render();
      }
    };

    fetchData();

    return () => {
      // ✅ Proper cleanup
      graphRef.current?.destroy();
      graphRef.current = null;
    };
  }, []);

  return (
    <div>
      <h2 className="mb-2 text-lg font-bold">Radial Graph with G6</h2>
      <div ref={containerRef} style={{ width: "600px", height: "600px" }} />
    </div>
  );
};

export default TestingNode;

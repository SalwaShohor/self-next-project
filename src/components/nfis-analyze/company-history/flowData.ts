// flowData.ts

import type { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Start" },
    position: { x: 0, y: 100 },
  },
  {
    id: "2",
    data: { label: "Middle" },
    position: { x: 250, y: 100 },
  },
  {
    id: "3",
    data: { label: "End" },
    position: { x: 500, y: 100 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
  },
];

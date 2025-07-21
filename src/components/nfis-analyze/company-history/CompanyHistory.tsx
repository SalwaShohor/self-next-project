"use client";

import React, { useCallback } from "react";
import {
  Background,
  ReactFlow,
  Connection,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Position,
  MiniMap,
  Controls,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";
import "@/css/xy-theme.css";

import { initialNodes, initialEdges } from "./initialElements";

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB",
): { nodes: Node[]; edges: Edge[] } => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      draggable: false, // ✅ Disable node dragging
      selectable: false, // ✅ Disable selection
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

const CompanyHistory = () => {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges,
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onLayout = useCallback(
    (direction: "TB" | "LR") => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={() => {}} // ✅ Block node changes
      onEdgesChange={() => {}} // ✅ Block edge changes
      onConnect={() => {}} // ✅ Block new connections
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      nodesDraggable={false} // ✅ Disable drag globally
      nodesConnectable={false} // ✅ Prevent edge creation
      elementsSelectable={false} // ✅ Disable click selection
      zoomOnScroll={true} // Optional: allow zoom
      panOnScroll={true} // Optional: allow pan
    >
      <Panel position="top-right">
        <button className="xy-theme__button" onClick={() => onLayout("TB")}>
          vertical layout
        </button>
        <button className="xy-theme__button" onClick={() => onLayout("LR")}>
          horizontal layout
        </button>
      </Panel>
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

export default CompanyHistory;

"use client";

import React, { useCallback } from "react";
import {
  Background,
  ReactFlow,
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
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 200, // horizontal gap between nodes
    ranksep: 80, // vertical gap between layers
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    let offsetX = 0;
    let offsetY = 0;

    // If node is a spouse, align its Y with the source (child)
    if (
      typeof node.data.label === "string" &&
      node.data.label.includes("Spouse")
    ) {
      const spouseEdge = edges.find((e) => e.target === node.id);
      if (spouseEdge) {
        const childNode = nodes.find((n) => n.id === spouseEdge.source);
        if (childNode) {
          const childPos = dagreGraph.node(childNode.id);
          offsetY = childPos.y - nodeWithPosition.y;
          offsetX = 100; // move spouse to the right
        }
      }
    }

    return {
      ...node,
      draggable: false,
      selectable: false,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2 + offsetX,
        y: nodeWithPosition.y - nodeHeight / 2 + offsetY,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

const FamilyTree = () => {
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
      onNodesChange={() => {}}
      onEdgesChange={() => {}}
      onConnect={() => {}}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnScroll={true}
      panOnScroll={true}
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

export default FamilyTree;

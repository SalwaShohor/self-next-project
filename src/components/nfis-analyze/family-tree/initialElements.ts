import { Node, Edge } from "@xyflow/react";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

export const initialNodes: Node[] = [
  // Parents
  {
    id: "father",
    type: "input",
    data: { label: "Father" },
    position: { x: 250, y: 0 },
  },
  {
    id: "mother",
    type: "input",
    data: { label: "Mother" },
    position: { x: 450, y: 0 },
  },

  // Children of parents
  { id: "child1", data: { label: "Alice" }, position: { x: 100, y: 150 } },
  { id: "child2", data: { label: "Bob" }, position: { x: 300, y: 150 } },
  { id: "child3", data: { label: "Cathy" }, position: { x: 500, y: 150 } },
  { id: "child4", data: { label: "David" }, position: { x: 700, y: 150 } },

  // Spouses
  {
    id: "spouse1",
    data: { label: "Alice's Spouse" },
    position,
  },
  {
    id: "spouse2",
    data: { label: "Bob's Spouse" },
    position: { x: 300, y: 220 },
  },
  {
    id: "spouse3",
    data: { label: "Cathy's Spouse" },
    position: { x: 500, y: 220 },
  },
  {
    id: "spouse4",
    data: { label: "David's Spouse" },
    position: { x: 700, y: 220 },
  },

  // Children of each couple
  { id: "child1a", data: { label: "Child 1A" }, position: { x: 50, y: 320 } },
  // { id: "child1b", data: { label: "Child 1B" }, position: { x: 150, y: 320 } },

  { id: "child2a", data: { label: "Child 2A" }, position: { x: 270, y: 320 } },

  { id: "child3a", data: { label: "Child 3A" }, position: { x: 470, y: 320 } },
  { id: "child3b", data: { label: "Child 3B" }, position: { x: 530, y: 320 } },
  { id: "child3c", data: { label: "Child 3C" }, position: { x: 590, y: 320 } },

  { id: "child4a", data: { label: "Child 4A" }, position: { x: 700, y: 320 } },
];

export const initialEdges: Edge[] = [
  // Parents -> Children
  {
    id: "e1",
    source: "father",
    target: "child1",
    type: edgeType,
    animated: true,
  },
  {
    id: "e2",
    source: "mother",
    target: "child1",
    type: edgeType,
    animated: true,
  },
  {
    id: "e3",
    source: "father",
    target: "child2",
    type: edgeType,
    animated: true,
  },
  {
    id: "e4",
    source: "mother",
    target: "child2",
    type: edgeType,
    animated: true,
  },
  {
    id: "e5",
    source: "father",
    target: "child3",
    type: edgeType,
    animated: true,
  },
  {
    id: "e6",
    source: "mother",
    target: "child3",
    type: edgeType,
    animated: true,
  },
  {
    id: "e7",
    source: "father",
    target: "child4",
    type: edgeType,
    animated: true,
  },
  {
    id: "e8",
    source: "mother",
    target: "child4",
    type: edgeType,
    animated: true,
  },

  // Children <-> Spouses
  {
    id: "e9",
    source: "child1",
    target: "spouse1",
    style: { opacity: 0 },
    animated: false,
  },
  {
    id: "e10",
    source: "child2",
    target: "spouse2",
    style: { opacity: 0 },
    animated: false,
  },
  {
    id: "e11",
    source: "child3",
    target: "spouse3",
    style: { opacity: 0 },
    animated: false,
  },
  {
    id: "e12",
    source: "child4",
    target: "spouse4",
    style: { opacity: 0 },
    animated: false,
  },

  // Children of couples
  { id: "e13", source: "child1", target: "child1a", type: edgeType },
  { id: "e14", source: "spouse1", target: "child1a", type: edgeType },
  // { id: "e15", source: "child1", target: "child1b", type: edgeType },
  // { id: "e16", source: "spouse1", target: "child1b", type: edgeType },

  { id: "e17", source: "child2", target: "child2a", type: edgeType },
  { id: "e18", source: "spouse2", target: "child2a", type: edgeType },

  { id: "e19", source: "child3", target: "child3a", type: edgeType },
  { id: "e20", source: "spouse3", target: "child3a", type: edgeType },
  { id: "e21", source: "child3", target: "child3b", type: edgeType },
  { id: "e22", source: "spouse3", target: "child3b", type: edgeType },
  { id: "e23", source: "child3", target: "child3c", type: edgeType },
  { id: "e24", source: "spouse3", target: "child3c", type: edgeType },

  { id: "e25", source: "child4", target: "child4a", type: edgeType },
  { id: "e26", source: "spouse4", target: "child4a", type: edgeType },
];

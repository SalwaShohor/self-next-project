import Graph from "graphology";
import clusters from "graphology-generators/random/clusters";
import forceAtlas2 from "graphology-layout-forceatlas2";
import FA2Layout from "graphology-layout-forceatlas2/worker";
import circlepack from "graphology-layout/circlepack";
import seedrandom from "seedrandom";
import Sigma from "sigma";
import { EdgeLineProgram, EdgeRectangleProgram } from "sigma/rendering";

const DEFAULT_ARGS = {
  order: 5000,
  size: 1000,
  clusters: 3,
  edgesRenderer: "edges-default",
};

export default function initClusterGraph() {
  const rng = seedrandom("sigma");

  const state = {
    ...DEFAULT_ARGS,
  };

  // Generate the graph
  const graph = clusters(Graph, { ...state, rng });
  circlepack.assign(graph, {
    hierarchyAttributes: ["cluster"],
  });

  const colors: Record<string, string> = {};
  for (let i = 0; i < state.clusters; i++) {
    colors[i] = "#" + Math.floor(rng() * 16777215).toString(16);
  }

  let i = 0;
  graph.forEachNode((node, { cluster }) => {
    graph.mergeNodeAttributes(node, {
      size: graph.degree(node) / 3,
      label: `Node n°${++i}, in cluster n°${cluster}`,
      color: colors[cluster + ""],
    });
  });

  // Render the graph
  const container = document.getElementById("sigma-container");
  if (!container) return;

  const renderer = new Sigma(graph, container, {
    defaultEdgeColor: "#e6e6e6",
    defaultEdgeType: state.edgesRenderer,
    edgeProgramClasses: {
      "edges-default": EdgeRectangleProgram,
      "edges-fast": EdgeLineProgram,
    },
  });

  // ForceAtlas2 layout controls
  const fa2Button = document.getElementById("fa2") as HTMLButtonElement;
  const sensibleSettings = forceAtlas2.inferSettings(graph);
  const fa2Layout = new FA2Layout(graph, {
    settings: sensibleSettings,
  });

  function toggleFA2Layout() {
    if (fa2Layout.isRunning()) {
      fa2Layout.stop();
      fa2Button.innerHTML = `Start layout ▶`;
    } else {
      fa2Layout.start();
      fa2Button.innerHTML = `Stop layout ⏸`;
    }
  }

  fa2Button?.addEventListener("click", toggleFA2Layout);

  // Tilt camera a bit
  renderer.getCamera().setState({
    angle: 0.2,
  });

  return () => {
    fa2Layout.kill();
    renderer.kill();
  };
}

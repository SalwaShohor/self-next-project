// "use client";

// import React, { useEffect } from "react";
// import GISDK from "@antv/gi-sdk";
// import localforage from "localforage";

// import * as GI_ASSETS_BASIC from "@antv/gi-assets-basic";
// import * as GI_ASSETS_SCENE from "@antv/gi-assets-scene";
// import { services as GI_ASSETS_ADVANCE_SERVER } from "@antv/gi-assets-advance";
// import { services as GI_ASSETS_BASIC_SERVER } from "@antv/gi-assets-basic";
// import {
//   GI_PROJECT_CONFIG,
//   SERVER_ENGINE_CONTEXT,
//   THEME_VALUE,
//   GI_LOCAL_DATA,
//   GI_SCHEMA_DATA,
// } from "./GI_EXPORT_FILES";
// import ThemeSwitch from "@antv/gi-theme-antd";

// const {
//   ZoomIn,
//   ZoomOut,
//   FitCenterView,
//   LassoSelect,
//   PropertiesPanel,
//   ActivateRelations,
//   CanvasSetting,
//   NodeLegend,
//   Placeholder,
//   FilterPanel,
//   ContextMenu,
//   ToggleClusterWithMenu,
//   NeighborsQuery,
//   Copyright,
//   Loading,
//   PinNodeWithMenu,
//   ForceSimulation,
//   Initializer,
//   PropertyGraphInitializer,
//   LayoutSwitch,
//   Toolbar,
//   Export,
//   SegmentedLayout,
// } = GI_ASSETS_BASIC.components;
// const { LargeGraph, MapMode } = GI_ASSETS_SCENE.components;
// const { SimpleEdge, SimpleNode } = GI_ASSETS_BASIC.elements;
// const {
//   Circular,
//   ClusteringDagre,
//   Concentric,
//   Dagre,
//   Force2,
//   FundForce,
//   GraphinForce,
//   Grid,
//   Radial,
// } = GI_ASSETS_BASIC.layouts;

// const ASSETS = {
//   components: {
//     ZoomIn,
//     ZoomOut,
//     FitCenterView,
//     LassoSelect,
//     PropertiesPanel,
//     ActivateRelations,
//     CanvasSetting,
//     NodeLegend,
//     Placeholder,
//     FilterPanel,
//     LargeGraph,
//     MapMode,
//     ContextMenu,
//     ToggleClusterWithMenu,
//     NeighborsQuery,
//     Copyright,
//     Loading,
//     PinNodeWithMenu,
//     ForceSimulation,
//     Initializer,
//     PropertyGraphInitializer,
//     LayoutSwitch,
//     Toolbar,
//     Export,
//     SegmentedLayout,
//   },
//   elements: { SimpleNode, SimpleEdge },
//   layouts: { Force2, Concentric, Dagre, FundForce, GraphinForce },
// };

// const SERVER = [GI_ASSETS_ADVANCE_SERVER, GI_ASSETS_BASIC_SERVER];
// const { getCombineServices } = utils;
// const services = getCombineServices(SERVER);

// const MyGraphApp = () => {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const { GI_SITE_PROJECT_ID } = SERVER_ENGINE_CONTEXT;
//       window.localStorage.setItem(
//         "SERVER_ENGINE_CONTEXT",
//         JSON.stringify(SERVER_ENGINE_CONTEXT),
//       );
//       window.localStorage.setItem("@theme", THEME_VALUE);
//       (window as any).localforage = localforage;
//       localforage.setItem(GI_SITE_PROJECT_ID, {
//         data: { transData: GI_LOCAL_DATA },
//         schemaData: GI_SCHEMA_DATA,
//       });
//     }
//   }, []);

//   return (
//     <div style={{ height: "100vh" }}>
//       <ThemeSwitch style={{ visibility: "hidden" }} />
//       {/* @ts-ignore */}
//       <GISDK config={GI_PROJECT_CONFIG} assets={ASSETS} services={services} />
//     </div>
//   );
// };

// export default MyGraphApp;

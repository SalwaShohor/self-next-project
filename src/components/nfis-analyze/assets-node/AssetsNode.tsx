// "use client";

// import React from "react";
// import { GraphCanvas, GraphNode } from "reagraph";
// // import { simpleEdges, simpleNodes } from "@/assets/demo";

// type ContextMenuProps = {
//   data: GraphNode;
//   onClose: () => void;
// };

// const AssetsNode = () => {
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         overflow: "hidden", // 🔒 Prevent scrollbars / overflow
//         position: "relative", // 🔧 Important for canvas positioning
//       }}
//     >
//       <GraphCanvas
//         nodes={simpleNodes}
//         edges={simpleEdges}
//         contextMenu={({ data, onClose }: ContextMenuProps) => (
//           <div
//             style={{
//               background: "white",
//               width: 150,
//               border: "solid 1px blue",
//               borderRadius: 2,
//               padding: 5,
//               textAlign: "center",
//             }}
//           >
//             <h1>{data.label}</h1>
//             <button onClick={onClose}>Close Menu</button>
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default AssetsNode;

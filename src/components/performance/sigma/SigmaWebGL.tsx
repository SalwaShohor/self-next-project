"use client";
import { useEffect } from "react";
import initClusterGraph from "@/lib/initClusterGraph";

export default function SigmaWebGL() {
  useEffect(() => {
    const cleanup = initClusterGraph();
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div id="sigma-container" className="h-full w-full" />
      <button
        id="fa2"
        className="absolute right-4 top-4 z-10 rounded bg-blue-600 px-3 py-1 text-white shadow"
      >
        Start layout ▶
      </button>
    </div>
  );
}

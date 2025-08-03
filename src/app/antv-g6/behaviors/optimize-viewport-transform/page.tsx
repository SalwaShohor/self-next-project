"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import OptimizeViewportTransform from "@/components/antv-g6/behavior/AntVG6Navigation";

// Dynamically import the JS module (Next.js won't SSR this)
const loadGraph = async () => {
  const module = await import("@/components/antv-g6/behavior/AntVG6Navigation");
  module.default(); // calls GraphSwitcher('container')
};

export default function Page() {
  useEffect(() => {
    loadGraph();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Alerts" />

      <div className="space-y-7.5 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 xl:p-9">
        <div className="flex w-full items-center justify-center p-4 font-sans sm:p-6">
          <div className="w-full overflow-hidden rounded-lg bg-white">
            <h1>Graph Visualizer</h1>
            <div id="container" style={{ width: "100%", height: "600px" }} />
          </div>
        </div>
      </div>
    </>
  );
}

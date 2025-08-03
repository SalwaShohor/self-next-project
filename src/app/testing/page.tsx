"use client";
import { Alert } from "@/components/ui-elements/alert";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import type { Metadata } from "next";
import React, { useState } from "react";
import Image from "next/image";
import TestingNode from "@/components/nfis-analyze/testing-node/TestingNode";
import G6Graph from "@/components/nfis-analyze/large-node/G6Graph";
import GraphWebGL from "@/components/nfis-analyze/large-node/GraphWebGL";
import GraphSVG from "@/components/nfis-analyze/large-node/GraphSVG";
import LargeDataGraph from "@/components/nfis-analyze/testing-javascript/LargeDataGraph";
import TestingSigma from "@/components/nfis-analyze/testing-javascript/TestingSigma";
import RenderWebGL from "@/components/nfis-analyze/test-render/RenderWebGL";
import RenderCanvas from "@/components/nfis-analyze/test-render/RenderCanvas";
import RenderSVG from "@/components/nfis-analyze/test-render/RenderSVG";
// import AssetsNode from "@/components/nfis-analyze/assets-node/AssetsNode";
import CompanyHistory from "@/components/nfis-analyze/company-history/CompanyHistory";

// export const metadata: Metadata = {
//   title: "Alerts",
//   // other metadata
// };

export default function Page() {
  return (
    <>
      <Breadcrumb pageName="Alerts" />

      <div className="space-y-7.5 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 xl:p-9">
        <div className="flex w-full items-center justify-center p-4 font-sans sm:p-6">
          <div className="w-full overflow-hidden rounded-lg bg-white">
            <TestingSigma />
          </div>
        </div>
      </div>
    </>
  );
}

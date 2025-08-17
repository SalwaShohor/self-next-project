"use client";

import dynamic from "next/dynamic";

const SigmaAutoAdaptLabel = dynamic(
  () => import("@/components/sigma/behavior/SigmaAutoAdaptLabel"),
  {
    ssr: false,
  },
);

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AntVG6AutoAdaptLabel from "@/components/antv-g6/behavior/AntVG6AutoAdaptLabel";
// import SigmaAutoAdaptLabel from "@/components/sigma/behavior/SigmaAutoAdaptLabel";
import { AutoAdaptLabelTable } from "@/components/Tables/features-table/AutoAdaptLabelTable";

export default function Page() {
  const [activeTab, setActiveTab] = useState("antv-g6");

  useEffect(() => {
    let sigmaCleanup: (() => void) | undefined;

    if (activeTab === "sigma") {
      <SigmaAutoAdaptLabel />;
    }

    return () => {
      if (sigmaCleanup) sigmaCleanup(); // cleanup only sigma layout
    };
  }, [activeTab]);

  const renderTabContent = () => {
    if (activeTab === "antv-g6") {
      return (
        <div className="rounded-b-lg bg-white p-6 shadow-md">
          <div className="h-[500px] w-full pt-7">
            <AntVG6AutoAdaptLabel />
          </div>
        </div>
      );
    }

    if (activeTab === "sigma") {
      return (
        <div className="rounded-b-lg bg-white p-6 shadow-md">
          <div className="h-[500px] w-full pt-7">
            <SigmaAutoAdaptLabel />;
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Breadcrumb pageName="Behavior: Auto Adapt Label" />

      <div className="space-y-7.5 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 xl:p-9">
        <div className="flex w-full items-center justify-center p-4 font-sans sm:p-6">
          <div className="w-full overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="rounded-t-lg bg-blue-700 p-6 text-white">
              <div className="mb-4 flex w-full place-items-center justify-center">
                <AutoAdaptLabelTable />
              </div>
            </div>

            <div className="flex border-b border-gray-200 bg-gray-50">
              <button
                className={`px-6 py-3 text-lg font-medium transition-all duration-300 ease-in-out ${
                  activeTab === "antv-g6"
                    ? "rounded-tl-lg border-b-4 border-blue-600 bg-white text-blue-600"
                    : "rounded-tl-lg text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                } flex-1 focus:outline-none`}
                onClick={() => setActiveTab("antv-g6")}
              >
                ANTV-G6
              </button>

              <button
                className={`px-6 py-3 text-lg font-medium transition-all duration-300 ease-in-out ${
                  activeTab === "sigma"
                    ? "border-b-4 border-blue-600 bg-white text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                } flex-1 focus:outline-none`}
                onClick={() => setActiveTab("sigma")}
              >
                Sigma
              </button>
            </div>

            <div className="tab-content">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import dynamic from "next/dynamic";

const SigmaWebGL = dynamic(
  () => import("@/components/performance/sigma/SigmaWebGL"),
  {
    ssr: false,
  },
);

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useState } from "react";
import LargeDataGraph from "@/components/nfis-analyze/testing-javascript/LargeDataGraph";
// import SigmaWebGL from "@/components/performance/sigma/SigmaWebGL";
import WebGL from "@/components/performance/antv-g6/WebGL";
import SVG from "@/components/performance/antv-g6/SVG";

export default function Page() {
  // State to keep track of the currently active tab
  const [activeTab, setActiveTab] = useState("canvas"); // Default to 'canvas'

  // Function to render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "canvas":
        return (
          <div className="rounded-b-lg bg-white p-6 shadow-md" key="canvas-tab">
            <div className="h-[800px] w-full pt-7">
              <h2> Sigma v2 not support Canvas.</h2>
            </div>
          </div>
        );

      case "webgl":
        return (
          <div className="rounded-b-lg bg-white p-6 shadow-md">
            <div className="h-[800px] w-full pt-7">
              <SigmaWebGL />
              {/* <GraphWebGL /> */}
              {/* <WebGL /> */}
              {/* <G6Graph /> */}
              {/* <MyGraphApp /> */}
            </div>
          </div>
        );
      case "svg":
        return (
          <div className="rounded-b-lg bg-white p-6 shadow-md">
            <div className="h-[800px] w-full pt-7">
              <h2> Sigma v2 not support SVG.</h2>
              {/* <RenderWebGL /> */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Breadcrumb pageName="Alerts" />

      <div className="space-y-7.5 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 xl:p-9">
        <div className="flex w-full items-center justify-center p-4 font-sans sm:p-6">
          <div className="w-full overflow-hidden rounded-lg bg-white shadow-xl">
            {/* Personal Info Section */}
            <div className="rounded-t-lg bg-blue-700 p-6 text-white">
              <div className="mb-4 flex items-center">
                <div>
                  <h1 className="text-3xl font-bold">
                    More than 5000 elements
                  </h1>
                  {/* <p className="text-blue-200">More than 5000 elements</p> */}
                </div>
              </div>
              {/* <div className="grid grid-cols-1 gap-2 text-sm text-blue-100 md:grid-cols-2">
                <p>
                  <strong>Date of Birth:</strong> January 1, 1980
                </p>
                <p>
                  <strong>Location:</strong> San Francisco, CA
                </p>
                <p>
                  <strong>Email:</strong> john.doe@example.com
                </p>
                <p>
                  <strong>Phone:</strong> (123) 456-7890
                </p>
              </div> */}
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              {/* Family Tree Tab Button */}
              <button
                className={`px-6 py-3 text-lg font-medium transition-all duration-300 ease-in-out ${
                  activeTab === "canvas"
                    ? "rounded-tl-lg border-b-4 border-blue-600 bg-white text-blue-600"
                    : "rounded-tl-lg text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                } flex-1 focus:outline-none`}
                onClick={() => setActiveTab("canvas")}
              >
                Canvas
              </button>

              {/* Assets Tab Button */}
              <button
                className={`px-6 py-3 text-lg font-medium transition-all duration-300 ease-in-out ${
                  activeTab === "webgl"
                    ? "border-b-4 border-blue-600 bg-white text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                } flex-1 focus:outline-none`}
                onClick={() => setActiveTab("webgl")}
              >
                WebGL
              </button>

              {/* Company History Tab Button */}
              <button
                className={`px-6 py-3 text-lg font-medium transition-all duration-300 ease-in-out ${
                  activeTab === "svg"
                    ? "rounded-tr-lg border-b-4 border-blue-600 bg-white text-blue-600"
                    : "rounded-tr-lg text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                } flex-1 focus:outline-none`}
                onClick={() => setActiveTab("svg")}
              >
                SVG
              </button>
            </div>

            {/* Tab Content Area */}
            <div className="tab-content">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

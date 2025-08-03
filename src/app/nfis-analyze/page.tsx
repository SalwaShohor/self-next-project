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
  // State to keep track of the currently active tab
  const [activeTab, setActiveTab] = useState("familyTree"); // Default to 'familyTree'

  // Function to render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "familyTree":
        return (
          <div className="rounded-b-lg bg-white p-6 shadow-md">
            {/* <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Family Tree
            </h2>
            <p className="leading-relaxed text-gray-700">
              This section displays the historical lineage and relationships
              within the family. It can include generations, key individuals,
              and significant milestones. Imagine a visual representation,
              connecting ancestors to descendants, highlighting unions and
              branches. This could be populated from a database or a static data
              structure.
            </p>
            <ul className="mt-4 list-inside list-disc text-gray-600">
              <li>John Doe (1900-1970) & Jane Smith (1905-1980)</li>
              <li>Children: Michael Doe (1930-2000), Emily Doe (1935-)</li>
              <li>Grandchildren: Sarah Doe (1960-), David Doe (1965-)</li>
            </ul> */}
            {/* <Image
              src="https://placehold.co/600x300/F0F4F8/6B7280?text=Family+Tree+Diagram"
              alt="Family Tree Diagram Placeholder"
              width={80}
              height={80}
              className="mt-6 h-auto w-full rounded-lg shadow-sm"
              // onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x300/F0F4F8/6B7280?text=Image+Load+Error"; }}
            /> */}
            <div className="h-[800px] w-full pt-7">
              <TestingNode />
              {/* <MyGraphApp /> */}
            </div>
          </div>
        );
      case "assets":
        return (
          <div className="rounded-b-lg bg-white p-6 shadow-md">
            {/* <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Assets
            </h2>
            <p className="leading-relaxed text-gray-700">
              Here you&apos;ll find a comprehensive overview of the
              family&apos;s assets, both tangible and intangible. This might
              include real estate, investments, valuable collections, and
              intellectual property. Each asset could have details like
              acquisition date, current value, and responsible parties.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full rounded-lg border border-gray-200 bg-white">
                <thead>
                  <tr className="border-b bg-gray-100">
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                      Asset Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                      Value
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-600">
                      Acquisition Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-gray-700">Main Residence</td>
                    <td className="px-4 py-3 text-gray-700">Real Estate</td>
                    <td className="px-4 py-3 text-gray-700">$1,200,000</td>
                    <td className="px-4 py-3 text-gray-700">2005-03-15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-gray-700">
                      Investment Portfolio
                    </td>
                    <td className="px-4 py-3 text-gray-700">Stocks & Bonds</td>
                    <td className="px-4 py-3 text-gray-700">$750,000</td>
                    <td className="px-4 py-3 text-gray-700">2010-01-01</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">
                      Vintage Car Collection
                    </td>
                    <td className="px-4 py-3 text-gray-700">Collectibles</td>
                    <td className="px-4 py-3 text-gray-700">$300,000</td>
                    <td className="px-4 py-3 text-gray-700">Various</td>
                  </tr>
                </tbody>
              </table>
              <div
                className="pt-7"
                style={{
                  width: "100%", // You can also try "600px" or "70vw"
                  height: "500px", // Or "60vh", depending on layout
                  overflow: "hidden", // 🔒 Prevent canvas from spilling
                  position: "relative",
                }}
              >
                {/* <AssetsNode /> */}
            {/* </div>
            </div> */}
            <div className="h-[800px] w-full pt-7">
              {/* <GraphWebGL /> */}
              <LargeDataGraph />
              {/* <G6Graph /> */}
              {/* <MyGraphApp /> */}
            </div>
          </div>
        );
      case "companyHistory":
        return (
          <div className="rounded-b-lg bg-white p-6 shadow-md">
            {/* <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Company History
            </h2>
            <p className="leading-relaxed text-gray-700">
              This tab provides a chronological journey through the
              company&apos;s establishment, growth, and significant
              achievements. It can detail founding members, key business
              decisions, product launches, and major milestones that shaped its
              trajectory.
            </p>
            <ul className="mt-4 list-inside list-disc text-gray-600">
              <li>
                <strong>1985:</strong> Company Founded by [Founder Name]
              </li>
              <li>
                <strong>1992:</strong> First Major Product Launch
              </li>
              <li>
                <strong>2001:</strong> Expansion into International Markets
              </li>
              <li>
                <strong>2015:</strong> Acquisition of [Acquired Company]
              </li>
              <li>
                <strong>2023:</strong> Achieved [Significant Milestone/Revenue]
              </li>
            </ul> */}
            {/* <Image
              src="https://placehold.co/600x300/F0F4F8/6B7280?text=Company+Timeline"
              alt="Company Timeline Placeholder"
              width={80}
              height={80}
              className="mt-6 h-auto w-full rounded-lg shadow-sm"
              // onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x300/F0F4F8/6B7280?text=Image+Load+Error"; }}
            /> */}
            <div className="h-[800px] w-full pt-7">
              <RenderSVG />
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
                {/* <Image
                  src="https://placehold.co/80x80/FFFFFF/2563EB?text=JD"
                  alt="Profile Picture"
                  width={80}
                  height={80}
                  className="mr-4 h-20 w-20 rounded-full border-4 border-blue-300"
                  // onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/FFFFFF/2563EB?text=ERR"; }}
                /> */}
                <div>
                  <h1 className="text-3xl font-bold">John Doe</h1>
                  <p className="text-blue-200">
                    Software Engineer | Entrepreneur
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm text-blue-100 md:grid-cols-2">
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
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              {/* Family Tree Tab Button */}
              <button
                className={`px-6 py-3 text-lg font-medium transition-all duration-300 ease-in-out ${
                  activeTab === "familyTree"
                    ? "rounded-tl-lg border-b-4 border-blue-600 bg-white text-blue-600"
                    : "rounded-tl-lg text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                } flex-1 focus:outline-none`}
                onClick={() => setActiveTab("familyTree")}
              >
                Basic Node
              </button>

              {/* Assets Tab Button */}
              <button
                className={`px-6 py-3 text-lg font-medium transition-all duration-300 ease-in-out ${
                  activeTab === "assets"
                    ? "border-b-4 border-blue-600 bg-white text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                } flex-1 focus:outline-none`}
                onClick={() => setActiveTab("assets")}
              >
                Large Data
              </button>

              {/* Company History Tab Button */}
              <button
                className={`px-6 py-3 text-lg font-medium transition-all duration-300 ease-in-out ${
                  activeTab === "companyHistory"
                    ? "rounded-tr-lg border-b-4 border-blue-600 bg-white text-blue-600"
                    : "rounded-tr-lg text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                } flex-1 focus:outline-none`}
                onClick={() => setActiveTab("companyHistory")}
              >
                Other
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

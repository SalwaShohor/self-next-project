"use client";

import dynamic from "next/dynamic";

const Labels = dynamic(
  () => import("@/components/sigma/edge-curve/labels/Labels"),
  {
    ssr: false,
  },
);

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useState } from "react";
// import Labels from "@/components/sigma/edge-curve/labels/Labels";

export default function Page() {
  return (
    <>
      <Breadcrumb pageName="Alerts" />

      <div className="space-y-7.5 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 xl:p-9">
        <div className="flex w-full items-center justify-center p-4 font-sans sm:p-6">
          <div className="w-full overflow-hidden rounded-lg bg-white">
            <Labels />
          </div>
        </div>
      </div>
    </>
  );
}

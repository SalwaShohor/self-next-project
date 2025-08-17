"use client";
import type { Target } from "@/context/TargetContext";
import { useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TargetTable from "@/components/Tables/target-table";

export default function Page() {
  return (
    <>
      <Breadcrumb pageName="Target List" />

      <div className="space-y-7.5 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 xl:p-9">
        <div className="flex w-full items-center justify-center p-4 font-sans sm:p-6">
          <div className="flex w-full flex-col">
            <TargetTable />
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import type { Target } from "@/context/TargetContext";
import { useState } from "react";
import axios from "axios";

export default function Page() {
  const [icNumber, setIcNumber] = useState("");
  const [target, setTarget] = useState<Target | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    console.log("handleSearch called with icNumber:", icNumber);

    if (!icNumber) {
      console.warn("IC Number is empty!");
      setError("Please enter IC Number");
      return;
    }

    try {
      console.log(
        "Sending request to API:",
        `${process.env.NEXT_PUBLIC_API_URL}/api/target/search/${icNumber}`,
      );
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/target/search/${icNumber}`,
      );
      console.log("Response received from API:", res.data);
      setTarget(res.data);
      setError("");
    } catch (err: any) {
      console.error("Error occurred during search:", err);

      if (err.response) {
        console.log("Server responded with status:", err.response.status);
        console.log("Server response data:", err.response.data);
      } else if (err.request) {
        console.log("No response received. Request made:", err.request);
      } else {
        console.log("Error setting up request:", err.message);
      }

      setTarget(null);
      setError("Target not found or server error.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Search Target</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter IC Number"
          value={icNumber}
          onChange={(e) => {
            console.log("IC Number input changed:", e.target.value);
            setIcNumber(e.target.value);
          }}
          className="mr-2 rounded border p-2"
        />
        <button
          onClick={handleSearch}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Search Target
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {target && (
        <div className="mt-4 rounded border bg-gray-50 p-4">
          <p>
            <strong>Full Name:</strong> {target.fullName}
          </p>
          <p>
            <strong>IC Number:</strong> {target.icNumber}
          </p>
          <p>
            <strong>Age:</strong> {target.age}
          </p>
          <p>
            <strong>Birth Date:</strong> {target.birthDate}
          </p>
          <p>
            <strong>Current Address:</strong> {target.currentAddress}
          </p>
        </div>
      )}
    </div>
  );
}

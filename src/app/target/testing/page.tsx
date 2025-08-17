"use client";
import type { Target } from "@/context/TargetContext";
import { useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SuccessModal from "@/components/popup/SuccessModal";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [icNumber, setIcNumber] = useState("");
  const [target, setTarget] = useState<Target | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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

  const handleAddTarget = async () => {
    if (!target) {
      setMessage("❌ No target data to add.");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/target/new-target`, // API Gateway endpoint
        {
          icNumber: target.icNumber,
          fullName: target.fullName,
          age: target.age,
          birthDate: target.birthDate,
          currentAddress: target.currentAddress,
        },
      );

      setMessage("✅ Target added successfully!");
      setModalMessage("Target added successfully!"); // For modal
      setIsModalOpen(true); // Open modal
      console.log("Add Target Response:", res.data);
    } catch (err: any) {
      console.error("Error adding target:", err);
      setMessage("❌ Failed to add target.");
    }
  };

  //---gemini------------//

  // DatePickerOne Component
  interface DatePickerOneProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  }

  const DatePickerOne = ({
    label,
    id,
    value,
    onChange,
    disabled,
  }: DatePickerOneProps) => {
    return (
      <div className="flex flex-col space-y-2 pt-4">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          id={id}
          type="date"
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    );
  };

  // ShowcaseSection Component
  interface ShowcaseSectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
  }

  const ShowcaseSection = ({
    title,
    children,
    className,
  }: ShowcaseSectionProps) => (
    <div className={` ${className}`}>
      <h3 className="rounded-t-xl border-b border-gray-200 p-4 text-xl font-semibold text-gray-800">
        {title}
      </h3>
      <div className="">{children}</div>
    </div>
  );

  const inputClasses = `
    w-full p-3 border rounded-lg focus:outline-none transition-all duration-200
  `;
  const disabledInputClasses = `
    bg-gray-100 text-gray-500 cursor-not-allowed
  `;
  const defaultInputClasses = `
    bg-white text-gray-800 border-gray-300
  `;

  //---gemini------------//

  return (
    <>
      <Breadcrumb pageName="Add New Target" />

      <div className="space-y-7.5 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 xl:p-9">
        <div className="flex w-full items-center justify-center p-4 font-sans sm:p-6">
          {/* <div className="flex w-full flex-col p-8">
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
          </div> */}
          <div className="flex w-full flex-col">
            <div className="flex flex-col gap-9">
              <ShowcaseSection
                title="Target Information"
                className="space-y-5.5 !p-6.5"
              >
                <div className="flex flex-col space-y-2 pt-4">
                  <label
                    htmlFor="ic-number"
                    className="text-sm font-medium text-gray-700"
                  >
                    IC Number
                  </label>
                  <div className="flex items-end space-x-2">
                    <input
                      id="ic-number"
                      type="text"
                      placeholder="e.g., 900101-14-5678"
                      className={`${inputClasses} ${defaultInputClasses}`}
                      value={icNumber}
                      onChange={(e) => {
                        console.log("IC Number input changed:", e.target.value);
                        setIcNumber(e.target.value);
                      }}
                    />
                    <button
                      onClick={handleSearch}
                      className="w-40 rounded-lg bg-blue-500 px-4 py-3 text-white transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      Search Target
                    </button>
                  </div>
                  {error && <p className="text-red-600">{error}</p>}
                </div>

                <div className="flex flex-col space-y-2 pt-4">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g., John Doe"
                    className={`${inputClasses} ${disabledInputClasses}`}
                    value={target?.fullName}
                    // onChange={(e) => setFullName(e.target.value)}
                    disabled={true}
                  />
                </div>

                <div className="flex flex-col space-y-2 pt-4">
                  <label
                    htmlFor="age"
                    className="text-sm font-medium text-gray-700"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    placeholder="e.g., 30"
                    className={`${inputClasses} ${disabledInputClasses}`}
                    value={target?.age}
                    // onChange={(e) => setAge(e.target.value)}
                    disabled={true}
                  />
                </div>

                <div className="flex flex-col space-y-2 pt-4">
                  <label
                    htmlFor="birth-date"
                    className="text-sm font-medium text-gray-700"
                  >
                    Birth Date
                  </label>
                  <input
                    id="birth-date"
                    type="number"
                    placeholder="01/01/2000"
                    className={`${inputClasses} ${disabledInputClasses}`}
                    value={target?.birthDate}
                    // onChange={(e) => setAge(e.target.value)}
                    disabled={true}
                  />
                </div>

                {/* <DatePickerOne
                  label="Birth Date"
                  id="birth-date"
                   value={target?.birthDate}
                  onChange={(e) => e.target.value}
                  disabled={true}
                /> */}

                <div className="flex flex-col space-y-2 pt-4">
                  <label
                    htmlFor="current-address"
                    className="text-sm font-medium text-gray-700"
                  >
                    Current Address
                  </label>
                  <input
                    id="current-address"
                    type="text"
                    placeholder="e.g., 123 Main Street, City, State, Zip"
                    className={`${inputClasses} ${disabledInputClasses}`}
                    value={target?.currentAddress}
                    // onChange={(e) => setCurrentAddress(e.target.value)}
                    disabled={true}
                  />
                </div>

                <div className="flex justify-center pt-30">
                  <button
                    onClick={handleAddTarget}
                    className="rounded-lg bg-green-500 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                  >
                    Add Target
                  </button>
                </div>
              </ShowcaseSection>
              <SuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={modalMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

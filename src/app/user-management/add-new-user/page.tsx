"use client";
import type { Target } from "@/context/TargetContext";
import { useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SuccessModal from "@/components/popup/SuccessModal";

export default function Page() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [icNumber, setIcNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Removed addedUsers state as the table is no longer present
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");

  // --- ShowcaseSection Component ---
  // A simple wrapper for content sections with a title and styling.
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

  // DatePickerOne Component
  interface DatePickerOneProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  }

  // --- DatePickerOne Component ---
  // A custom date picker component that uses a standard HTML input.
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

  const handleAddUser = () => {
    // Validate all fields
    if (
      !fullName ||
      !birthDate ||
      !icNumber ||
      !phoneNumber ||
      !email ||
      !password ||
      !role
    ) {
      setModalMessage("Please fill in all user information before adding.");
      setModalType("error");
      setIsModalOpen(true);
      return;
    }

    const newUser = {
      fullName,
      birthDate,
      icNumber,
      phoneNumber,
      email,
      password,
      role,
    };

    // No longer adding to an 'addedUsers' array since the table is removed.
    // In a real application, you would send this 'newUser' object to a backend API.
    setModalMessage("The user data has been successfully processed!"); // Changed message
    setModalType("success");
    setIsModalOpen(true);
    console.log("Processing new user:", newUser); // Changed log message

    // Clear the form after submission
    setFullName("");
    setBirthDate("");
    setIcNumber("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const inputClasses = `
    w-full p-3 border rounded-lg focus:outline-none transition-all duration-200
    bg-white text-gray-800 border-gray-300 focus:border-blue-500
  `;

  return (
    <>
      <Breadcrumb pageName="Add New User" />

      <div className="space-y-7.5 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 xl:p-9">
        <div className="flex w-full items-center justify-center p-4 font-sans sm:p-6">
          <div className="w-full">
            <div className="flex flex-col gap-9">
              <ShowcaseSection
                title="User Information"
                className="space-y-5.5 !p-8"
              >
                <div className="flex flex-col space-y-2 pt-4">
                  <label
                    htmlFor="full-name"
                    className="text-base font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    placeholder="e.g., Jane Doe"
                    className={inputClasses}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                {/* IC Number Input Field - now placed below Full Name */}
                <div className="flex flex-col space-y-2 pt-4">
                  <label
                    htmlFor="ic-number"
                    className="text-base font-medium text-gray-700"
                  >
                    IC Number
                  </label>
                  <input
                    id="ic-number"
                    type="text"
                    placeholder="e.g., 900101-14-5678"
                    className={inputClasses}
                    value={icNumber}
                    onChange={(e) => setIcNumber(e.target.value)}
                  />
                </div>

                <DatePickerOne
                  label="Birth Date"
                  id="birth-date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />

                <div className="flex flex-col space-y-2 pt-4">
                  <label
                    htmlFor="phone-number"
                    className="text-base font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone-number"
                    type="text"
                    placeholder="e.g., 012-3456789"
                    className={inputClasses}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-2 pt-4">
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g., jane.doe@example.com"
                    className={inputClasses}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Input Field */}
                <div className="flex flex-col space-y-2 pt-4">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className={inputClasses}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Role Dropdown */}
                <div className="flex flex-col space-y-2 pt-4">
                  <label
                    htmlFor="role"
                    className="text-base font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    className={inputClasses}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>

                <div className="flex justify-center pt-20">
                  <button
                    onClick={handleAddUser}
                    className="focus:ring-3 rounded-lg bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:bg-green-700 focus:outline-none focus:ring-green-300"
                  >
                    Add User
                  </button>
                </div>
              </ShowcaseSection>
            </div>
          </div>

          {/* Render the SuccessModal */}
          <SuccessModal
            isOpen={isModalOpen}
            onClose={closeModal}
            message={modalMessage}
          />
        </div>
      </div>
    </>
  );
}

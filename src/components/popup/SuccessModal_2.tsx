"use client";
import React from "react";

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal_2: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-2xl">
        <p className="mb-8 text-xl font-semibold text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="transform rounded-md bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal_2;

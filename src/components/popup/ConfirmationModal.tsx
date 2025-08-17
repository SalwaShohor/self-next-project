"use client";
import React from "react";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-2xl">
        <p className="mb-8 text-xl font-semibold text-gray-700">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="transform rounded-md bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="transform rounded-md bg-gray-300 px-6 py-3 font-semibold text-gray-800 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

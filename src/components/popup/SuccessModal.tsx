"use client";

import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-75">
      <div className="relative w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-2xl font-semibold text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <svg
            className="mb-4 h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Success!</h2>
          <p className="mb-6 text-gray-600">{message}</p>
          <button
            onClick={onClose}
            className="rounded-md bg-blue-500 px-6 py-2 text-white transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;

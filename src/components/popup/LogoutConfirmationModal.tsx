"use client";

import React from "react";
import { LogOutIcon } from "lucide-react";

interface LogoutConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl dark:bg-dark-2">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <LogOutIcon className="h-8 w-8 text-red-600" />
        </div>

        {/* Title & Message */}
        <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
          Log out
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Are you sure you want to log out of your account?
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-600 transition-all hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-dark-3"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-all hover:bg-red-700"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;

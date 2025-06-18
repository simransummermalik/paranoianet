// TrustPrompt.jsx
import React from "react";

const TrustPrompt = ({ fileName, onConfirm, onCancel }) => {
  return (
    <div className="absolute top-1/2 left-1/2 z-[100] transform -translate-x-1/2 -translate-y-1/2 bg-black border border-red-700 text-white font-mono text-sm p-6 rounded shadow-lg space-y-4 w-[360px]">
      <p className="text-red-400">⚠️ This file is untrusted.</p>
      <p className="text-gray-300">Do you want to open <strong>{fileName}</strong> anyway?</p>
      <div className="flex justify-end gap-4 pt-2">
        <button
          onClick={onCancel}
          className="px-4 py-1 border border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-1 bg-red-700 hover:bg-red-600 text-white"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default TrustPrompt;

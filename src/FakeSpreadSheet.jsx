// src/FakeSpreadsheet.jsx
import React, { useEffect, useState } from "react";

const FakeSpreadsheet = ({ onClose }) => {
  const [kickedOut, setKickedOut] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setKickedOut(true);
      setShowPasswordPrompt(true);
    }, 3000); // Get kicked after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const randomUsers = [
    { name: "Ava Simmons", address: "192.168.1.25", status: "FLAGGED" },
    { name: "Eli Tran", address: "10.0.33.17", status: "SAFE" },
    { name: "Jordan Price", address: "172.16.4.91", status: "ERASED" },
    { name: "Kira Morgan", address: "192.168.3.77", status: "???", flagged: true },
  ];

  return (
    <div className="absolute top-24 left-24 w-[600px] h-[400px] bg-gray-900 text-sm font-mono text-white border border-gray-700 shadow-xl z-50 p-4 relative">
      <div className="text-lg font-bold mb-2 text-green-400">📊 Network Audit Sheet</div>

      {!kickedOut ? (
        <table className="w-full text-left border-collapse border border-green-400">
          <thead>
            <tr className="bg-green-700 text-black">
              <th className="p-2 border border-green-400">Name</th>
              <th className="p-2 border border-green-400">Address</th>
              <th className="p-2 border border-green-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {randomUsers.map((user, i) => (
              <tr key={i} className="hover:bg-green-900">
                <td className="p-2 border border-green-400">{user.name}</td>
                <td className="p-2 border border-green-400">{user.address}</td>
                <td className="p-2 border border-green-400">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-red-500 text-center mt-20 text-lg animate-pulse">
          ❌ Permission Denied. You have been disconnected.
        </div>
      )}

      {showPasswordPrompt && (
        <div className="absolute top-1/2 left-1/2 bg-black text-white text-sm p-4 border border-yellow-500 rounded shadow transform -translate-x-1/2 -translate-y-1/2 z-50">
          🔐 Enter authorization key to restore access.
          <p className="text-gray-400 text-xs mt-2 italic">(Hint hidden elsewhere...)</p>
        </div>
      )}

      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600"
      >
        ❌
      </button>
    </div>
  );
};

export default FakeSpreadsheet;

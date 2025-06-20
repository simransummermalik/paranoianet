import React from "react";

// Accept onFileClick as a prop
const FileExplorer = ({ onClose, unlockedFiles, onFileClick }) => {
  const files = [
    { name: "CSE322 - PenTest Report.docx", requiredCommand: "unlock CSE322" },
    { name: "backup_2024_logs.bak", requiredCommand: "decrypt backup_2024_logs.bak" },
    { name: "UNC-IT_Student_VPN.conf", requiredCommand: "reveal vpn.conf" },
    { name: "found_disk_dump_05.img", requiredCommand: "mount dump_05.img" },
    { name: "corrupted_report.txt", requiredCommand: "unlock corrupted_report.txt", untrusted: true }, // spooky file mwahaha
  ];

  return (
    <div className="absolute top-24 left-48 w-[600px] h-[400px] bg-black border border-gray-700 shadow-lg rounded text-sm text-white font-mono z-50 flex flex-col">
      <div className="bg-gray-800 text-white p-2 flex justify-between items-center">
        <span>🗂️ File Explorer</span>
        <button onClick={onClose} className="hover:text-red-400">❌</button>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto">
        {files.map((file, i) => {
          const isUnlocked = unlockedFiles.includes(file.requiredCommand);
          return (
            <div key={i}>
              <span className="text-green-400">📁 {file.name}</span>

              {!isUnlocked ? (
                <p className="text-gray-500 text-xs">
                  🔒 Requires terminal command: <code>{file.requiredCommand}</code>
                </p>
              ) : (
                <p
                  onClick={() => onFileClick(file)} // This triggers TrustPrompt or opens file random chance--- change here if it doesnt run!!!!
                  className="text-gray-300 text-xs mt-1 hover:text-red-400 cursor-pointer"
                >
                  ✅ Decrypted content: <br />
                  <em>[Click to open {file.name}]</em>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileExplorer;


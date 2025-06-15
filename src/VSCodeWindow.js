import React, { useState, useEffect } from "react";
import codeFiles from "./codeFiles";

function VSCodeWindow({ fileName, onClose }) {
  const fileData = codeFiles[fileName];
  const initialLines = fileData?.initialLines || [];
  const alteredLines = fileData?.alteredLines || [];
  const editable = fileData?.editable ?? false;

  const [displayedLines, setDisplayedLines] = useState(initialLines);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const cursorBlink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(cursorBlink);
  }, []);

  useEffect(() => {
    if (!fileData) return;

    let index = 0;
    const delayStart = setTimeout(() => {
      const interval = setInterval(() => {
        if (index >= alteredLines.length) return clearInterval(interval);
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[index] = "";
          setTimeout(() => {
            newLines[index] = alteredLines[index];
            setDisplayedLines([...newLines]);
          }, 400);
          return newLines;
        });
        index++;
      }, 1500);
    }, 2000);

    return () => clearTimeout(delayStart);
  }, [fileData, alteredLines]);

  if (!fileData) {
    return (
      <div className="absolute top-24 left-24 w-[600px] h-[400px] bg-black text-red-500 font-mono p-4">
        <p>🚫 Error: File "{fileName}" not found.</p>
        <button onClick={onClose} className="text-red-400 mt-4">❌ Close</button>
      </div>
    );
  }

  return (
    <div className="absolute top-24 left-24 w-[600px] h-[400px] bg-[#1e1e1e] border border-gray-600 shadow-lg font-mono text-sm text-gray-200">
      <div className="bg-[#333] px-3 py-2 flex justify-between items-center">
        <span>📝 {fileName} — ParanoiaNet</span>
        <button onClick={onClose} className="hover:text-red-400">❌</button>
      </div>
      <div className="p-4 overflow-y-auto h-full">
        <pre className="whitespace-pre-wrap text-green-400">
          {displayedLines.map((line, i) => (
            <div key={i}>
              {line}
              {i === displayedLines.length - 1 && cursorVisible ? "▍" : ""}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

export default VSCodeWindow;

















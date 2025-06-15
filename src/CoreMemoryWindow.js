import { useEffect, useState } from "react";
import { generateCorruptedContent } from "./openaiService";

function CoreMemoryWindow({ onClose, onTriggerRewrite }) {
  const [log, setLog] = useState("Loading corrupted memory...");

  useEffect(() => {
    const loadCorrupted = async () => {
      const corrupted = await generateCorruptedContent("core.memory", 2);
      setLog(corrupted);
    };
    loadCorrupted();
  }, []);

  return (
    <div className="absolute top-32 left-32 w-[600px] h-[400px] bg-[#0f0f0f] border border-purple-700 rounded-lg shadow-lg flex flex-col text-purple-300 font-mono text-sm">
      <div className="bg-purple-800 text-white p-2 flex justify-between items-center text-sm">
        <span>🧠 CORE MEMORY LOG</span>
        <button onClick={onClose} className="hover:text-red-400">❌</button>
      </div>
      <div className="flex-grow overflow-y-auto p-4 whitespace-pre-wrap">
        {log}
      </div>
      <div className="bg-purple-900 p-2 border-t border-purple-700 flex justify-end">
        <button
          onClick={onTriggerRewrite}
          className="bg-purple-600 px-3 py-1 rounded hover:bg-purple-500 text-white"
        >
          Trigger Rewrite
        </button>
      </div>
    </div>
  );
}

export default CoreMemoryWindow;

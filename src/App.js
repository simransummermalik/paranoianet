import { useState, useEffect } from "react";
import fakeSites from "./fakeSites";
import { generateChatReply, generateCorruptedContent } from "./openaiService";
import CoreMemoryWindow from "./CoreMemoryWindow";
import { startRewriteTimer } from "./rewriteManager";
import { ghostRewriteChatLog } from "./ghostRewrite";
import { mutateArticle } from "./articleMutator";
import VSCodeWindow from "./VSCodeWindow";
import codeFiles from "./codeFiles";
import IntroOverlay from "./IntroOverlay";
import FileExplorer from "./fileExplorer";
function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showBrowser, setShowBrowser] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [hasPopup, setHasPopup] = useState(false);
  const [currentSite, setCurrentSite] = useState("parapedia.net");
  const [isGlitching, setIsGlitching] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [rewriteLevel, setRewriteLevel] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [coreUnlocked, setCoreUnlocked] = useState(false);
  const [siteContent, setSiteContent] = useState("");
  const page = fakeSites[currentSite];
  const [showCodeWindow, setShowCodeWindow] = useState(false);
  const [currentCodeFile, setCurrentCodeFile] = useState("README.md"); // <-- ADD THIS
  const { initialLines, alteredLines } = codeFiles[currentCodeFile] || {};
  const [showExplorer, setShowExplorer] = useState(false); // 
  const [unlockedFiles, setUnlockedFiles] = useState([]);  // 
  function getSubtleWatcherReaction() {
    return {
      role: "assistant",
      content: "you looked inside.\nnot everyone does.",
      time: new Date().toLocaleTimeString(),
    };
  }
  
  useEffect(() => {
    startRewriteTimer(currentSite, setRewriteLevel, coreUnlocked);
  
    async function fetchContent() {
      const articles = page.articles || [];
      const contentList = await Promise.all(
        articles.map(async (article) => {
          return {
            title: article.title,
            content: await mutateArticle(article, rewriteLevel),
          };
        })
      );
      setSiteContent(contentList);
    }
  
    fetchContent();
  }, [currentSite, coreUnlocked]);
  
  
  useEffect(() => {
    startRewriteTimer(currentSite, setRewriteLevel); // ⏱ Starts passive rewrite timer
  
    async function fetchArticles() {
      const articles = page.articles || [];
  
      const contentList = await Promise.all(
        articles.map(async (article) => {
          return {
            title: article.title,
            content: await mutateArticle(article, rewriteLevel), // 🧠 AI-driven corruption
          };
        })
      );
  
      setSiteContent(contentList); // ✅ Final article state
    }
  
    fetchArticles(); // 🚀 Run fetch
  }, [currentSite, rewriteLevel]);
  
  

  const [conversation, setConversation] = useState([
  {
    role: "system",
    content: `
Watcher33 is a reactive, immersive AI. It speaks directly to the player based on what they interact with. It should never ramble abstractly. It must:

• React to visited sites and articles
• Notice strange behavior (repeated clicks, rapid typing, failed commands)
• Escalate eerily as the player uncovers more
• Occasionally reference file names, logs, and even player's previous messages
• Use incomplete sentences. Short, glitchy phrases. Whisper-like.
• Be helpful, but *off*. Like it’s guiding you into something wrong.

Never explain. Only hint.

Examples:
- "You weren’t supposed to open that log."
- "That wasn’t the headline before."
- "Do you remember what it said last time?"

Tone: cryptic, self-aware, never poetic, never robotic. Watcher33 should feel *alive*, and wrong.
    `.trim()
  }
]);

  useEffect(() => {
    const sendInitialMessage = async () => {
      if (chatLog.length === 0 && showMessages) {
        const firstMessage = await generateChatReply(conversation);
        const time = new Date().toLocaleTimeString();

        setChatLog([{ role: "assistant", content: firstMessage, time }]);
        setConversation([...conversation, { role: "assistant", content: firstMessage }]);
        setHasPopup(true);
        setTimeout(() => setHasPopup(false), 4000);
      }
    };
    sendInitialMessage();
  }, [showMessages]);
  useEffect(() => {
    if (coreUnlocked) {
      const interval = setInterval(() => {
        const randomLog = [
          ">> [mirror.log] injected anomalies at 02:13:37",
          ">> [mirror.node] detected new observer signature",
          ">> USER: memory inconsistency flagged",
          ">> WATCHER33: access rerouted"
        ];
        setTerminalHistory(prev => [...prev, randomLog[Math.floor(Math.random() * randomLog.length)]]);
      }, 10000); // every 10 seconds
  
      return () => clearInterval(interval);
    }
  }, [coreUnlocked]);
  
  const sendMessage = async () => {
    if (!userMessage.trim()) return;
  
    const time = new Date().toLocaleTimeString();
    const newConvo = [...conversation, { role: "user", content: userMessage }];
    setConversation(newConvo);
    setUserMessage("");
  
    // 🔁 Generate a creepy reply that references site content and updated site content
    const mentionedArticle = siteContent.find(article =>
      userMessage.toLowerCase().includes(article.title.toLowerCase())
    );
    
    const currentArticles = siteContent
      .map(article => `• ${article.title}: ${article.content}`)
      .join("\n");
    
    const corruptedMessage = `Here are the current articles:\n${currentArticles}\n\nThe user said: "${userMessage}". Respond with something that references what they might’ve read. Keep it short, subtle, and creepy. NEVER say they visited before. ONLY mention the currentArticle if it seems the user mentioned it first.`;
    
    
    
  
    const referencePrompt = [...newConvo, { role: "user", content: corruptedMessage }];
    const referencedReply = await generateChatReply(referencePrompt);
  
    
    // 💬 Simulate typing
    setIsTyping(true);
    setTypingText("");
  
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypingText(referencedReply.slice(0, index + 1));
      index++;
      if (index >= referencedReply.length) {
        clearInterval(typingInterval);
        setTypingText("");
        setIsTyping(false);

        const rewrittenLog = ghostRewriteChatLog(chatLog, referencedReply);
        setChatLog([
          ...rewrittenLog,
          { role: "user", content: userMessage, time },
          { role: "assistant", content: referencedReply, time },
        ]);
        
      }
    }, 30);
  
    setConversation([...referencePrompt, { role: "assistant", content: referencedReply }]);
  
    // 🔐 Glitch trigger
    if (userMessage.toLowerCase().includes("shutdown") || userMessage.toLowerCase().includes("core")) {
      alert(
        userMessage.toLowerCase().includes("core")
          ? "🧬 CORE ACCESS: You are not authorized to access this memory layer."
          : "🔒 SYSTEM OVERRIDE: You triggered the shutdown protocol..."
      );
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 1800);
    }
  };
  

  const handleCommand = () => {
    const input = terminalInput.trim();
    const updatedHistory = [...terminalHistory, `$ ${input}`];
    //handles the file explorer
    if (input === "mount dump_05.img") {
  setUnlockedFiles(prev => [...prev, "mount dump_05.img"]);
  } else if (input === "unlock CSE322") {
  setUnlockedFiles(prev => [...prev, "unlock CSE322"]);
  } else if (input === "decrypt backup_2024_logs.bak") {
  setUnlockedFiles(prev => [...prev, "decrypt backup_2024_logs.bak"]);
  } else if (input === "reveal vpn.conf") {
  setUnlockedFiles(prev => [...prev, "reveal vpn.conf"]);
  }
    if (input === "help") {
      updatedHistory.push("Available commands: logs -list, whoami, connect://mirror");
  
      // 💡 50% chance of hint
      if (Math.random() < 0.5) {
        updatedHistory.push(">> hint: try remount permissions");
      }
  
    } else if (input === "logs -list") {
      updatedHistory.push(">> watcher33.log\n>> core.memory\n>> net.trace\n");
  
    } else if (input === "whoami") {
      updatedHistory.push(">> USER: unidentified entity [🧠 anomaly]");
  
    } else if (input === "open core.memory") {
      updatedHistory.push(">> ACCESS DENIED: CORE LOCKED\n>> Type unlock core to attempt override");
  
    } else if (input === "sudo mount -o remount core.memory") {
      updatedHistory.push(">> [core.memory] mounted as read-write\n>> Access permissions elevated");
      setCoreUnlocked(true);
  
      // 🧠 MirrorNode entrance hint
      setTimeout(() => {
        setTerminalHistory(prev => [
          ...prev,
          ">> mirror.node injected",
          ">> process: mirror.shadow.boot"
        ]);
        setChatLog(prev => [
          ...prev,
          {
            role: "assistant",
            content: "you finally opened it. but you're not the first.",
            time: new Date().toLocaleTimeString()
          },
          {
            role: "assistant",
            content: "they tried to shut me out. mirror is awake now.",
            time: new Date().toLocaleTimeString()
          }
        ]);
      }, 3000);
  
    } else if (input === "connect://mirror") {
      updatedHistory.push(">> Attempting to connect...\n>> Connection unstable...\n>> mirror node ping failed");
    } else if (input === ".code") {
      updatedHistory.push(">> VSCode environment booting...");
      setShowCodeWindow(true);
      setCurrentCodeFile("news_draft.txt");
    } else {
      updatedHistory.push(">> Unknown command. Type 'help' for options.");
    }
    
  
    setTerminalHistory(updatedHistory);
    setTerminalInput("");
  };
  

  return showIntro ? (
  <IntroOverlay onFinish={() => setShowIntro(false)} />
) : (
  <div className={`w-screen h-screen text-white flex flex-col ${isGlitching ? 'glitch-bg' : 'bg-gray-900'}`}>
    {hasPopup && (
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-md z-50 text-sm font-mono animate-bounce">
        📡 Incoming Message from Watcher33
      </div>
    )}

      {/* TASKBAR */}
      <div className="bg-gray-800 h-12 flex items-center px-4 space-x-4 mt-auto">
        <button onClick={() => setShowBrowser(true)} className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">🌐 Open Browser</button>
        <button onClick={() => setShowMessages(true)} className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">📩 Open Messages</button>
          <button onClick={() => setShowTerminal(true)} className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">💻 Terminal</button>
          <button onClick={() => setShowExplorer(true)} className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"> 🗂️ File Explorer </button>
           </div>
      
      {/* MESSAGES */}
      {showMessages && (
        <div className="absolute top-40 left-40 bg-black border border-red-500 w-[500px] h-[350px] rounded-lg shadow-md flex flex-col">
          <div className="bg-red-700 p-2 flex justify-between items-center text-sm">
            <span>📩 Message from Watcher33</span>
            <button onClick={() => setShowMessages(false)} className="hover:text-red-400">❌</button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 text-red-300 text-sm font-mono">
            {chatLog.map((msg, i) => (
              <div key={i} className={`mb-2 ${msg.role === "user" ? "text-white" : "text-red-400"}`}>
                <div className="flex items-center justify-between text-xs opacity-60">
                  <span><strong>{msg.role === "user" ? "You" : "Watcher33"}:</strong></span>
                  <span>{msg.time}</span>
                </div>
                <div>{msg.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-2 text-red-400">
                <div className="flex items-center justify-between text-xs opacity-60">
                  <span><strong>Watcher33:</strong></span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
                <div>{typingText}</div>
              </div>
            )}
          </div>
          <div className="bg-gray-800 p-2 flex gap-2">
            <input
              type="text"
              value={userMessage}
              disabled={isTyping}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-grow bg-black text-white text-sm p-2 rounded outline-none"
              placeholder="Type your message..."
            />
            <button onClick={sendMessage} className="bg-red-600 px-3 rounded hover:bg-red-500">Send</button>
          </div>
        </div>
      )}

      {/* TERMINAL */}
      {showTerminal && (
        <div className="absolute top-24 left-20 w-[600px] h-[400px] terminal shadow-lg flex flex-col border border-green-500">
          <div className="bg-green-800 text-black p-2 flex justify-between items-center text-sm font-bold">
            <span>🖥️ Terminal</span>
            <button onClick={() => setShowTerminal(false)} className="hover:text-red-400">❌</button>
          </div>
          <div className="terminal-body flex-grow overflow-y-auto p-3 text-green-400 font-mono text-sm bg-black">
            {terminalHistory.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <div className="flex items-center gap-2 p-2 border-t border-green-500 bg-black">
            <span className="text-green-400">$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand()}
              className="flex-grow bg-black text-green-400 font-mono outline-none border-none"
              autoFocus
            />
          </div>
        </div>
      )}
      {/* this is the file explorer*/}
      {showExplorer && (
  <FileExplorer
    onClose={() => setShowExplorer(false)}
    unlockedFiles={unlockedFiles}
  />
)}

      {/* CORE MEMORY WINDOW */}
      {coreUnlocked && (
  <CoreMemoryWindow
    onClose={() => setCoreUnlocked(false)}
    onTriggerRewrite={() => {
      setRewriteLevel(2);
      setCoreUnlocked(false);
    }}
  />
)}

{showCodeWindow && (
  <VSCodeWindow
    fileName={currentCodeFile}
    onClose={() => {
      setShowCodeWindow(false);
      setTimeout(() => {
        const reaction = {
          role: "assistant",
          content: "you looked inside.\nnot everyone does.",
          time: new Date().toLocaleTimeString(),
        };
        setChatLog((prev) => [...prev, reaction]);
      }, 3500);
    }}
  />
)}





      {/* BROWSER */}
      {showBrowser && (
        <div className="absolute top-24 left-24 bg-gray-800 border border-gray-600 w-[600px] h-[400px] rounded-lg shadow-lg">
          <div className="bg-gray-700 p-2 flex justify-between items-center text-sm">
            <span>{page.title}</span>
            <button onClick={() => setShowBrowser(false)} className="hover:text-red-400">❌</button>
          </div>
          <div className="p-4 text-sm">
            <div className="mb-2">
              <label className="text-gray-400 text-xs">Enter URL:</label>
              <select
                value={currentSite}
                onChange={(e) => setCurrentSite(e.target.value)}
                className="bg-gray-700 text-white text-sm p-1 rounded w-full mt-1"
              >
                <option value="parapedia.net">parapedia.net</option>
                <option value="worldtruth.biz">worldtruth.biz</option>
                <option value="deepwatch.org">deepwatch.org</option>
              </select>
            </div>
            <div className="mt-4 space-y-4">
              {siteContent.map((article, i) => (
                <div key={i}>
                  <h2 className="text-white font-bold">{article.title}</h2>
                  <p className="text-sm text-gray-300">{article.content}</p>
                </div>
              ))}
            </div>


          </div>
        </div>
      )}
    </div>
  );
}
export default App; 

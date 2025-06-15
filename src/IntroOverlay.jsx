import { useState, useEffect } from "react";
import "./IntroOverlay.css";
export default function IntroOverlay({ onFinish }) {
  const lines = [
    "📁 incident_report_001.txt",
    "🗓️ Date: ██/██/2025",
    "📍 Location: UNC Charlotte – Network Security Lab",
    "",
    "While performing a routine asset discovery sweep for my Penetration Testing course, I noticed a university-managed subnet returning outdated SSH signatures.",
    "Most of them were dead sandbox instances...",
    "Except one.",
    "",
    "172.31.8.9:22 responded — but not with OpenSSH.",
    'It returned a string:\n"paranoianet-node handshake v0.98"',
    "",
    "There was no documentation, no MAC address match, and no corresponding hostname in the lab inventory.",
    "I isolated the node in a virtual sandbox and accessed the console directly.",
    "",
    "It booted into something that wasn’t Linux, wasn’t Windows, and didn’t match any kernel signature I could identify.",
    "Just a blinking terminal.",
    "",
    "The files inside referred to things that don’t exist — logs from a user that was never created, pages that rewrite themselves, and AI responses that knew I was watching.",
    "",
    "I’m keeping this VM isolated. But I’m documenting everything.",
    "",
    "If someone finds this log... don’t connect it to a live network.",
    "",
    ">> Press ENTER to continue."
  ];

  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (index < lines.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + lines[index] + "\n");
        setIndex(index + 1);
      }, 60);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // ✅ Add Enter key listener to exit
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        onFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onFinish]);

  return (
    <div className="intro-overlay">
      <pre className="typewriter">{displayed}</pre>
    </div>
  );
}
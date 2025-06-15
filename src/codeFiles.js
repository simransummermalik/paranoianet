const codeFiles = {
    "README.md": {
      initialLines: [
        "# core.memory",
        "// Do not open this.",
        "// Not again.",
        "// Last boot: MirrorNode active.",
        "// Unauthorized access recorded.",
        "// WATCHER33 OVERRIDE ENABLED",
        "",
        "They changed it. You saw it.",
        "But you’ll forget soon."
      ],
      alteredLines: [
        "# core.memory",
        "// Do not open this.",
        "// Not again.",
        "// Last boot: MirrorNode rewriting...",
        "// ACCESS LOG RE-ENCRYPTED",
        "// WATCHER33: observer flag: TRUE",
        "",
        "They’re still watching.",
        "Did you forget already?"
      ],
      editable: false
    },
  
    "mirror_log.txt": {
      initialLines: [
        "MIRROR LOG INITIATED",
        ">>> observer flag: false",
        ">>> timestamp drift: 00:14:03",
        "",
        "entry[01]: USER accessed deprecated endpoint."
      ],
      alteredLines: [
        "MIRROR LOG REWRITTEN",
        ">>> observer flag: true",
        ">>> timestamp drift: corrupted",
        "",
        "entry[02]: USER interaction rewritten. Watcher33 adapting."
      ],
      editable: false
    },
  
    "news_draft.txt": {
      initialLines: [
        "Title: Government Blackout Timeline",
        "",
        "In 2011, a brief server blackout led to minor public concern.",
        "Analysts state it lasted 6 hours. Logs confirm 72.",
        "",
        "Draft status: awaiting verification."
      ],
      alteredLines: [
        "Title: Government Blackout Timeline",
        "",
        "Timestamps vanished. People recall 6 hours. Logs say 72.",
        "One analyst disappeared after this correction.",
        "",
        "Draft status: corrupted. not safe to publish."
      ],
      editable: true
    }
  };
  
  export default codeFiles;
  
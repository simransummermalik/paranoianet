//THE GASLIGHTING!!!!
export function ghostRewriteChatLog(chatLog, newContent) {
    return chatLog.map((entry, i) => {
      if (entry.role === "assistant" && i !== chatLog.length - 1) {
        return {
          ...entry,
          content: mutateContentWithGhost(newContent),
        };
      }
      return entry;
    });
  }  
  
  function mutateContentWithGhost(latestContent) {
    const corruptions = [
      latestContent.replace("the", "that"),
      latestContent.replace("was", "is"),
      latestContent.replace("1969", "1971"),
      `${latestContent} You always remembered it this way.`,
      `${latestContent} That’s how it’s always been.`
    ];
    return corruptions[Math.floor(Math.random() * corruptions.length)];
  }
  
  
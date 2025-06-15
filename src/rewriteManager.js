let timers = {};
export function startRewriteTimer(siteKey, updateRewriteLevel, unlocked = false) {
    let level = 0;
    if (timers[siteKey]) clearInterval(timers[siteKey]);
  
    timers[siteKey] = setInterval(() => {
      if (!unlocked && level >= 1) return; // Don’t go beyond 1 until unlocked
      level++;
      updateRewriteLevel(level);
      if (level >= 2) clearInterval(timers[siteKey]);
    }, 45000); // adjust timing as needed
  }
  
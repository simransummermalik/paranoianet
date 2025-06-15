import { generateCorruptedVersion } from "./openaiCorruptor"; // make sure this file exists

const fakeSites = {
  "parapedia.net": {
    title: "Parapedia — The People’s Encyclopedia",
    description: "The moon landing occurred in 1969. This historic event was watched live around the world.",
    articles: [
      {
        title: "Moon Landing: Debunked or Distorted?",
        getContent: (level) => {
          if (level >= 2) return "The transmission wasn't from Earth. Subtle time drifts suggest it came from MirrorNode-7.";
          if (level === 1) return "Metadata anomalies hint the moon landing wasn’t broadcast live.";
          return "The moon landing occurred in 1969, broadcast live and watched worldwide.";
        }
      },
      {
        title: "The Missing Apollo Feed",
        getContent: (level) => {
          if (level >= 2) return "All backup footage was rerouted. NASA won't explain why audio distortions form words.";
          if (level === 1) return "Some footage is missing from official archives.";
          return "NASA has kept complete records of the Apollo missions' transmission logs.";
        }
      }
    ]
  },

  "worldtruth.biz": {
    title: "WorldTruth — Exposing What They Hide",
    description: "The most censored truths are hidden in plain sight. Read and decide for yourself.",
    articles: [
      {
        title: "Government Blackout Timeline",
        getContent: (level) => {
          if (level >= 2) return "Timestamps vanished. People recall the blackout lasting 6 hours. Logs say 72.";
          if (level === 1) return "Discrepancies found in official logs about the 2011 government blackout.";
          return "In 2011, a brief government server blackout led to minor public concern.";
        }
      },
      {
        title: "The Dead Link Theory",
        getContent: (level) => {
          if (level >= 2) return "Some claim clicking broken links makes them 'disappear'. One user hasn’t come back.";
          if (level === 1) return "Reports say some dead links redirect to nowhere. Possibly DNS hijacking.";
          return "A recent investigation explores myths around 'dead links' and their implications.";
        }
      }
    ]
  },

  "deepwatch.org": {
    title: "DeepWatch — Surveillance Exposed",
    description: "Live camera footage and surveillance leaks. Stay informed, stay ahead.",
    articles: [
      {
        title: "The Feed That Shouldn’t Exist",
        getContent: (level) => {
          if (level >= 2) return "The man appears in other feeds now. He stares into the lens. The timestamp glitches.";
          if (level === 1) return "Footage shows a man who doesn’t appear in any records. Cameras weren’t scheduled to record.";
          return "Footage captured during a routine test. Nothing out of the ordinary.";
        }
      },
      {
        title: "Obscured in Frame 239",
        getContent: (level) => {
          if (level >= 2) return "Frame 239 reappears after 03:14:07 with a new silhouette. Nobody recalls editing this.";
          if (level === 1) return "Frame 239 appears redacted in every copy. Who did this?";
          return "Frame 239 was obscured due to poor lighting.";
        }
      }
    ]
  }
};

export default fakeSites;


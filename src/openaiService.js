import axios from "axios";

//  Replace with your own API key if needed
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
//  Watcher33 replies to the user in chat
export async function generateChatReply(conversation) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: conversation,
      temperature: 0.85,
      max_tokens: 120,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}

// 🧠 NEW FUNCTION FOR SITE REWRITES
export async function generateCorruptedContent(site, level) {
  const prompt = `Rewrite content for the site "${site}" based on rewrite level ${level}. Make it eerie, contradictory, or glitchy. It should feel like the system is hiding something. Keep it short.`;
  const messages = [{ role: "system", content: prompt }];
  const response = await generateChatReply(messages);
  return response;
}
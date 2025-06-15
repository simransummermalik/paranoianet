import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
export async function generateCorruptedVersion(text, level = 1) {
  const prompt = `Corrupt the following conspiracy text at corruption level ${level}/2. Make it sound eerier but believable. Change only a few words, like something’s off.\n\nText:\n${text}\n\nCorrupted:`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 100,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content.trim();
}

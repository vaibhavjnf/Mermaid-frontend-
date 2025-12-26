import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_FAST = 'gemini-3-flash-preview';

export const generateEmailContent = async (subject: string): Promise<string> => {
  if (!process.env.API_KEY) return "API_KEY_MISSING: Cannot decrypt secure content. Please connect to the neural link.";
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_FAST,
      contents: `Generate a short, cryptic, cyberpunk-style email body for the subject "${subject}". 
      Keep it under 50 words. Use jargon like 'dead drop', 'encryption key', 'node', 'agency'.
      Tone: Urgent, paranoid, secretive.`,
    });
    return response.text || "Decryption failed.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error: Data corruption detected in transmission.";
  }
};

export const generateTweet = async (): Promise<string> => {
  if (!process.env.API_KEY) return "Encrypted stream data...";
  try {
    const response = await ai.models.generateContent({
      model: MODEL_FAST,
      contents: "Generate a short, punchy cyberpunk tweet (max 140 chars) about privacy, crypto, surveillance, or digital freedom. Use slang. No hashtags at the end, integrate them naturally.",
    });
    return response.text || "Status unavailable.";
  } catch (error) {
    return "Network error.";
  }
};

export const generateChatReply = async (history: string[], lastMessage: string): Promise<string> => {
  if (!process.env.API_KEY) return "Connection lost...";
  try {
    const response = await ai.models.generateContent({
      model: MODEL_FAST,
      contents: `You are a fellow hacker in a secure encrypted chat. 
      The user said: "${lastMessage}". 
      Previous context: ${history.join(' | ')}.
      Reply briefly (max 1-2 sentences). Be cool, slightly paranoid, helpful but cautious.`,
    });
    return response.text || "...";
  } catch (error) {
    return "signal_lost";
  }
};

export const generateMapNodes = async (): Promise<any[]> => {
  if (!process.env.API_KEY) return [];
  try {
    const response = await ai.models.generateContent({
      model: MODEL_FAST,
      contents: "Generate 5 fictional 'safe house' or 'dead drop' locations for a cyberpunk map. Return JSON with fields: name, type (SAFEHOUSE, DROP_POINT, RELAY_NODE), status (ACTIVE, COMPROMISED).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['SAFEHOUSE', 'DROP_POINT', 'RELAY_NODE'] },
              status: { type: Type.STRING, enum: ['ACTIVE', 'COMPROMISED'] }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (e) {
    return [
      { name: "Sector 7 Relay", type: "RELAY_NODE", status: "ACTIVE" },
      { name: "The Old Subway", type: "DROP_POINT", status: "COMPROMISED" }
    ];
  }
}
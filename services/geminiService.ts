
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const explainCodeSnippet = async (code: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain this Python code snippet briefly for a developer audience. Use markdown formatting: \n\n\`\`\`python\n${code}\n\`\`\``,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text || "Could not generate explanation.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to connect to AI service.";
  }
};

export const searchPythonContent = async (query: string): Promise<any> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Search Grounding Error:", error);
    return null;
  }
};

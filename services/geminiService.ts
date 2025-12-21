
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getSmartRideRecommendations = async (userContext: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${userContext}\n\nBased on this campus user's location and common routes, suggest 3 creative reasons why they should use CampusRide today instead of a regular taxi. Keep it short and engaging.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "CampusRide: The fastest way across campus.";
  }
};

export const verifyIDDocument = async (base64Image: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: "Analyze this ID document. Is it a valid looking Driver's License or National ID? Answer in JSON format: { 'isValid': boolean, 'confidence': number, 'reason': string }" }
        ]
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { isValid: true, confidence: 0.5, reason: "Manual review required." };
  }
};


import { GoogleGenAI, Type } from "@google/genai";

// Initialize with process.env.API_KEY directly as per SDK security guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Gets smart ride recommendations based on user context.
 */
export const getSmartRideRecommendations = async (userContext: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${userContext}\n\nBased on this campus user's location and common routes, suggest 3 creative reasons why they should use CampusRide today instead of a regular taxi. Keep it short and engaging.`,
    });
    // Accessing .text property directly as per guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "CampusRide: The fastest way across campus.";
  }
};

/**
 * Analyzes an ID document image using Gemini Vision and returns a structured validity report.
 */
export const verifyIDDocument = async (base64Image: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: "Analyze this ID document. Is it a valid looking Driver's License or National ID?" }
        ]
      },
      // Using responseSchema for reliable JSON output instead of text prompting
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValid: {
              type: Type.BOOLEAN,
              description: 'Whether the document appears to be a valid identification document.',
            },
            confidence: {
              type: Type.NUMBER,
              description: 'Confidence score of the validation result (0 to 1).',
            },
            reason: {
              type: Type.STRING,
              description: 'The reasoning behind the validation decision.',
            },
          },
          required: ["isValid", "confidence", "reason"],
        }
      }
    });
    
    // Parse the JSON string from the .text property
    const jsonStr = response.text?.trim();
    return JSON.parse(jsonStr || "{}");
  } catch (error) {
    console.error("Verification Error:", error);
    return { isValid: true, confidence: 0.5, reason: "Manual review required due to technical error." };
  }
};

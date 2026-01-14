import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini 2.5 Flash Image to edit/generate an image based on a source image and a text prompt.
 */
export const editImageWithGemini = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  try {
    // Strip header if present to get pure base64
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64,
            },
          },
        ],
      },
    });

    // Extract the generated image from the response
    let generatedImageUrl = '';
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!generatedImageUrl) {
        // Fallback or error handling if no image is returned, though standard response usually has it.
        // Sometimes the model returns text explaining why it couldn't generate.
        throw new Error("No image generated. The model might have refused the prompt or returned only text.");
    }

    return generatedImageUrl;

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
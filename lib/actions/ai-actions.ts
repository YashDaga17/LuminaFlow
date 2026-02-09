"use server"

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function suggestDescription(title: string) {
  // Basic security check: ensure the title isn't empty
  if (!title || title.length < 3) return "Title too short for AI suggestion.";

  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `You are a productivity assistant for an app called LuminaFlow. 
               Write a concise, 1-sentence professional description for a task titled: "${title}".
               Do not use bold text or special characters.`,
    });

    return text;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Could not generate description at this time.";
  }
}
import { GoogleGenAI, Type } from "@google/genai";
import { BusinessInputData, BusinessPlan } from "../types";

const SYSTEM_INSTRUCTION = `
You are an elite business consultant and expert AI business plan generator. 
Your task is to generate a comprehensive, professional, and investor-ready business plan based on the user's input.
The tone should be professional, persuasive, and clear.
Use Markdown formatting within the content fields (e.g., **bold** for emphasis, lists for features).
Financial projections should be conceptual outlines with placeholders for specific numbers if not provided, explaining *how* to calculate them.
`;

export const generateBusinessPlan = async (data: BusinessInputData): Promise<BusinessPlan> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Generate a detailed business plan for the following business:
    
    Business Name: ${data.businessName}
    Industry: ${data.industry}
    Description: ${data.description}
    Target Market: ${data.targetMarket}
    Key Products/Services: ${data.productsServices}
    Unique Selling Proposition (USP): ${data.usp}
    Funding Request: ${data.fundingRequest || "N/A"}
    Team Experience: ${data.teamExperience || "N/A"}
    Vision/Mission: ${data.visionMission || "N/A"}

    The response must be a valid JSON array of objects, where each object represents a section of the business plan.
    The required sections are:
    1. Executive Summary
    2. Company Overview (Mission, Vision, Legal Structure)
    3. Market Analysis (Industry Overview, Target Audience, Competitors)
    4. Products & Services Detail
    5. Marketing & Sales Strategy
    6. Operational Plan
    7. Management Team
    8. Financial Plan (Projections & Requirements)
    
    Ensure the content is detailed and substantive.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The title of the section (e.g., Executive Summary)"
              },
              content: {
                type: Type.STRING,
                description: "The detailed content of the section in Markdown format."
              }
            },
            required: ["title", "content"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from AI.");
    }

    const plan: BusinessPlan = JSON.parse(text);
    return plan;

  } catch (error) {
    console.error("Error generating plan:", error);
    throw error;
  }
};

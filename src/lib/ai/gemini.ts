import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, type GenerativeModel } from '@google/generative-ai';
import { generateWithOpenRouter } from '@/lib/ai/openrouter';

const apiKey = process.env.GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
let model: GenerativeModel | null = null;

function getModel(): GenerativeModel {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  if (!model) {
    model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      ],
    });
  }
  return model;
}

interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  systemInstruction?: string;
}

export function safeJsonParse(text: string): unknown {
  const cleaned = text.trim();
  const jsonMatch = cleaned.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  const raw = jsonMatch ? jsonMatch[1]!.trim() : cleaned;
  return JSON.parse(raw);
}

async function generateWithGemini(prompt: string, options: GenerateOptions = {}): Promise<string> {
  const m = getModel();
  const result = await m.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: options.temperature ?? 0.7,
      maxOutputTokens: options.maxTokens ?? 2048,
    },
    systemInstruction: options.systemInstruction,
  });

  const response = result.response;
  const text = response.text();

  if (!text) {
    const blocked = response.promptFeedback?.blockReason;
    if (blocked) {
      throw new Error(`AI_SAFETY_BLOCKED: ${blocked}`);
    }
    throw new Error('AI_GENERATION_FAILED: empty response');
  }

  return text;
}

export async function generateContent(
  prompt: string,
  options: GenerateOptions = {},
): Promise<string> {
  const hasOpenRouter = !!process.env.OPENROUTER_API_KEY;

  if (apiKey) {
    try {
      return await generateWithGemini(prompt, options);
    } catch (err) {
      if (hasOpenRouter) {
        console.warn('Gemini failed, falling back to OpenRouter:', (err as Error).message);
        return await generateWithOpenRouter(prompt, options);
      }
      throw err;
    }
  }

  if (hasOpenRouter) {
    return await generateWithOpenRouter(prompt, options);
  }

  throw new Error('Neither GEMINI_API_KEY nor OPENROUTER_API_KEY is configured');
}

import { generateWithOpenRouter } from '@/lib/ai/openrouter';

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

async function generateWithGemini(
  prompt: string,
  options: GenerateOptions = {},
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  // Lazy import: the Gemini SDK pulls in Node-oriented code that should not be
  // evaluated in the Cloudflare Workers runtime when OpenRouter is the provider.
  const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = await import(
    '@google/generative-ai'
  );

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
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

  const result = await model.generateContent({
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
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const hasOpenRouter = Boolean(process.env.OPENROUTER_API_KEY);

  if (hasGemini) {
    try {
      return await generateWithGemini(prompt, options);
    } catch (err) {
      if (hasOpenRouter) {
        // SDK errors may include credential-bearing request URLs.
        console.warn('Gemini failed; falling back to OpenRouter. Details omitted from logs.');
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

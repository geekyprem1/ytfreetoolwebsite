const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  systemInstruction?: string;
}

export async function generateWithOpenRouter(
  prompt: string,
  options: GenerateOptions = {},
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  const model = process.env.AI_MODEL || 'google/gemini-2.5-flash';

  const messages = [];
  if (options.systemInstruction) {
    messages.push({ role: 'system', content: options.systemInstruction });
  }
  messages.push({ role: 'user', content: prompt });

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      'X-Title': 'YouTube Toolkit AI',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2048,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(`OPENROUTER_ERROR: ${res.status} ${JSON.stringify(error)}`);
  }

  const data = (await res.json()) as {
    choices: { message: { content: string } }[] | null;
    error?: { message: string };
  };

  if (data.error) {
    throw new Error(`OPENROUTER_ERROR: ${data.error.message}`);
  }

  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error('AI_GENERATION_FAILED: empty response from OpenRouter');
  }

  return text;
}

const SYSTEM_ROLE =
  'You are an expert YouTube SEO specialist and content strategist. You help creators optimize their content for maximum reach and engagement. Always provide high-quality, actionable, and unique outputs. Never include placeholder text.';

export const titleGenerationPrompt = ({
  topic,
  keyword,
  language,
  tone,
  count,
}: {
  topic: string;
  keyword: string;
  language: string;
  tone: string;
  count: number;
}) => ({
  systemInstruction: `${SYSTEM_ROLE} You generate SEO-optimized, click-worthy YouTube titles that drive high CTR while accurately representing the content.`,
  prompt: `Generate ${count} YouTube video titles for a video about "${topic}".
Target keyword: "${keyword}"
Language: ${language}
Tone: ${tone}

Requirements:
- Each title must be 50-70 characters
- Include the target keyword naturally
- Use power words and emotional triggers
- Avoid clickbait or misleading titles
- Make each title unique in approach and phrasing

Return the titles as a valid JSON array of objects with this format:
[{"title": "...", "seoScore": 85, "emotionalAppeal": "curiosity"}]
Respond ONLY with the JSON array, no other text.`,
});

export const descriptionGenerationPrompt = ({
  topic,
  keyword,
  summary,
  tone,
  includeTimestamps,
  includeHashtags,
  includeCTA,
}: {
  topic: string;
  keyword: string;
  summary: string;
  tone: string;
  includeTimestamps: boolean;
  includeHashtags: boolean;
  includeCTA: boolean;
}) => ({
  systemInstruction: `${SYSTEM_ROLE} You generate comprehensive, SEO-optimized YouTube video descriptions that include keywords, chapters, hashtags, and engaging calls-to-action. Output plain text only — YouTube does not render markdown.`,
  prompt: `Generate a YouTube video description for:
Topic: "${topic}"
Keyword: "${keyword}"
Video Summary: "${summary}"
Tone: ${tone}

Requirements:
- Write in ${tone} tone
- Include a compelling first 2-3 lines (above the fold)
- Naturally incorporate the keyword 2-3 times
${includeTimestamps ? '- Create 4-6 video chapters with realistic timestamps (0:00, 1:30, etc.) in the timestamps array. Also paste those same chapters into the description body under a "Chapters:" or "Timestamps:" line.' : '- Do NOT include chapters/timestamps in the description or timestamps array (return timestamps as []).'}
${includeHashtags ? '- Provide 10-15 relevant hashtags in the hashtags array only (do not dump a long hashtag wall into the description body)' : '- Return hashtags as []'}
${includeCTA ? '- Include a short call-to-action in the cta field (and optionally one line in the description)' : '- Return cta as empty string'}
- Total length: 150-300 words for description
- PLAIN TEXT ONLY: never use markdown (no **bold**, *italic*, # headings, bullet markdown, or backticks). YouTube shows stars/asterisks as raw characters.

Return as a valid JSON object with this EXACT shape:
{
  "description": "full description plain text",
  "hashtags": ["#tag1", "#tag2"],
  "timestamps": [
    { "timestamp": "0:00", "title": "Introduction" },
    { "timestamp": "1:30", "title": "Main Topic" }
  ],
  "cta": "call to action text"
}
Respond ONLY with the JSON object, no other text.`,
});

export const hashtagGenerationPrompt = ({
  topic,
  count,
}: {
  topic: string;
  count: number;
}) => ({
  systemInstruction: `${SYSTEM_ROLE} You generate relevant, trending hashtag sets optimized for YouTube discoverability.`,
  prompt: `Generate ${count} YouTube hashtags for a video about "${topic}".

Group them into:
- Broad hashtags (high volume, competitive): 30%
- Niche hashtags (specific, targeted): 40%
- Trending hashtags (currently popular): 30%

Return as a valid JSON object:
{
  "hashtags": ["#tag1", "#tag2", ...],
  "grouped": {
    "broad": ["#tag1", ...],
    "niche": ["#tag1", ...],
    "trending": ["#tag1", ...]
  }
}
Respond ONLY with the JSON object, no other text.`,
});

export const hookGenerationPrompt = ({
  topic,
  audience,
  tone,
  count,
}: {
  topic: string;
  audience: string;
  tone: string;
  count: number;
}) => ({
  systemInstruction: `${SYSTEM_ROLE} You create powerful video hooks that capture attention in the first 3 seconds and drive viewers to keep watching.`,
  prompt: `Generate ${count} YouTube video hooks for a video about "${topic}".
Target audience: ${audience}
Tone: ${tone}

Create 4 types of hooks (divide equally):
1. Question hooks — provoke curiosity with a compelling question
2. Story hooks — hint at an interesting personal story or case study
3. Curiosity hooks — create an information gap
4. Shock hooks — use surprising facts or bold claims

Each hook must be 1-2 sentences and designed to stop the scroll.

Return as a valid JSON object:
{
  "hooks": {
    "question": ["hook1", ...],
    "story": ["hook1", ...],
    "curiosity": ["hook1", ...],
    "shock": ["hook1", ...]
  }
}
Respond ONLY with the JSON object, no other text.`,
});

export const keywordGenerationPrompt = ({
  seedKeyword,
  language,
}: {
  seedKeyword: string;
  language: string;
}) => ({
  systemInstruction: `${SYSTEM_ROLE} You are a YouTube keyword research expert. You find high-potential keywords and provide search intent analysis.`,
  prompt: `Generate keyword ideas based on the seed keyword: "${seedKeyword}"
Language: ${language}

For each keyword (generate 10-15), provide:
- The keyword phrase
- Difficulty: "easy", "medium", or "hard"
- Popularity: "low", "medium", or "high"
- Search intent: "informational", "commercial", "transactional", or "navigational"
- 2-3 related keywords
- 1-2 suggested questions viewers might search

Return as a valid JSON object:
{
  "keywords": [
    {
      "keyword": "...",
      "difficulty": "medium",
      "popularity": "high",
      "intent": "informational",
      "relatedKeywords": ["...", "..."],
      "suggestedQuestions": ["...?"]
    }
  ]
}
Respond ONLY with the JSON object, no other text.`,
});

export const timestampGenerationPrompt = ({ transcript }: { transcript: string }) => ({
  systemInstruction: `${SYSTEM_ROLE} You generate clear, well-structured YouTube video chapters/timestamps from transcripts.`,
  prompt: `Generate YouTube video chapters from this transcript. Create 5-10 chapters that meaningfully divide the content.

Transcript:
${transcript.substring(0, 15000)}

Return as a valid JSON object:
{
  "chapters": [
    { "timestamp": "0:00", "title": "Introduction" },
    { "timestamp": "2:15", "title": "..." }
  ]
}
Timestamps should be in MM:SS or HH:MM:SS format. Chapter titles should be concise (5-8 words max).
Respond ONLY with the JSON object, no other text.`,
});

export const shortsIdeasPrompt = ({
  topic,
  count,
}: {
  topic: string;
  count: number;
}) => ({
  systemInstruction: `${SYSTEM_ROLE} You are a viral content strategist specializing in YouTube Shorts. You generate creative, trending short-form video ideas.`,
  prompt: `Generate ${count} YouTube Shorts ideas about "${topic}".

Each idea should be:
- 1-2 sentences describing the short video concept
- Designed for 15-60 second format
- Optimized for virality and engagement

For each idea, provide a trend score (0-100) and virality score (0-100) based on current content trends.

Return as a valid JSON object:
{
  "ideas": [
    {
      "idea": "...",
      "trendScore": 85,
      "viralityScore": 78,
      "category": "lifehack"
    }
  ]
}
Categories can be: tutorial, lifehack, storytelling, challenge, reaction, behind-the-scenes, educational, entertainment.
Respond ONLY with the JSON object, no other text.`,
});

export const transcriptSummaryPrompt = ({ transcript }: { transcript: string }) => ({
  systemInstruction: `${SYSTEM_ROLE} You create concise, well-structured summaries of video transcripts.`,
  prompt: `Summarize the following video transcript in 5-10 bullet points. Each bullet should capture a key point or takeaway.

Transcript:
${transcript.substring(0, 15000)}

Return as a valid JSON object:
{
  "summary": ["bullet point 1", "bullet point 2", ...],
  "totalDuration": "estimated video length if known"
}
Respond ONLY with the JSON object, no other text.`,
});

export const titleAnalysisPrompt = ({
  titleA,
  titleB,
  keyword,
}: {
  titleA: string;
  titleB: string;
  keyword: string;
}) => ({
  systemInstruction: `${SYSTEM_ROLE} You analyze and compare YouTube video titles for SEO optimization and click-through rate (CTR) potential. Your predictions are AI-based estimates, not guaranteed results.`,
  prompt: `Compare these two YouTube video titles for a video targeting the keyword "${keyword}":

Title A: "${titleA}"
Title B: "${titleB}"

Analyze each title for:
- CTR prediction (estimated percentage, 0-20% range)
- SEO score (0-100)
- Emotion score (0-100, how emotionally compelling)
- Power words used
- Overall sentiment

Then determine the winner and explain why.

Return as a valid JSON object:
{
  "titleA": {
    "ctrPrediction": 4.2,
    "seoScore": 82,
    "emotionScore": 35,
    "powerWords": ["word1"],
    "sentiment": "neutral"
  },
  "titleB": {
    "ctrPrediction": 7.8,
    "seoScore": 68,
    "emotionScore": 72,
    "powerWords": ["word1", "word2"],
    "sentiment": "curiosity-driven"
  },
  "winner": "B",
  "analysis": "detailed comparison paragraph explaining the decision"
}
Respond ONLY with the JSON object, no other text.`,
});

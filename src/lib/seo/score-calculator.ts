interface TitleScore {
  score: number;
  maxScore: number;
  suggestions: string[];
}

function scoreTitle(title: string, keyword: string): TitleScore {
  const suggestions: string[] = [];
  let score = 0;

  if (title.length >= 40 && title.length <= 70) {
    score += 40;
  } else if (title.length >= 30 && title.length <= 80) {
    score += 25;
    suggestions.push('Aim for a title length between 40-70 characters for optimal display.');
  } else {
    suggestions.push('Title should be 40-70 characters for best visibility.');
  }

  if (keyword && title.toLowerCase().includes(keyword.toLowerCase())) {
    score += 30;
    if (title.toLowerCase().startsWith(keyword.toLowerCase())) {
      score += 10;
    }
  } else if (keyword) {
    suggestions.push(`Include the keyword "${keyword}" near the beginning of the title.`);
  }

  const powerWords = ['ultimate', 'proven', 'secret', 'free', 'best', 'top', 'amazing', 'easy', 'simple'];
  if (powerWords.some((w) => title.toLowerCase().includes(w))) {
    score += 15;
  } else {
    suggestions.push('Add a power word (e.g., ultimate, proven, free) to increase CTR.');
  }

  if (/[?!]/.test(title)) {
    score += 5;
  } else {
    suggestions.push('Consider adding a question or exclamation mark for emotional appeal.');
  }

  return { score: Math.min(score, 100), maxScore: 100, suggestions };
}

function scoreDescription(desc: string, keyword: string): TitleScore {
  const suggestions: string[] = [];
  let score = 0;

  const wordCount = desc.split(/\s+/).length;
  if (wordCount >= 150 && wordCount <= 350) {
    score += 30;
  } else if (wordCount >= 100) {
    score += 15;
    suggestions.push('Expand description to 150-350 words for better SEO.');
  } else {
    suggestions.push('Description is too short. Aim for 150-350 words.');
  }

  if (keyword) {
    const occurrences = (desc.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
    if (occurrences >= 1 && occurrences <= 3) {
      score += 25;
    } else if (occurrences > 3) {
      score += 15;
      suggestions.push('Keyword appears too many times. 1-3 natural mentions is optimal.');
    } else {
      suggestions.push('Include the target keyword 1-3 times naturally in the description.');
    }
  }

  if (desc.includes('\n') || desc.includes('\n\n')) {
    score += 15;
  } else {
    suggestions.push('Use line breaks to improve readability.');
  }

  const sentences = desc.split(/[.!?]+/).filter(Boolean);
  if (sentences.length > 0) {
    const avgLen = sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / sentences.length;
    if (avgLen >= 10 && avgLen <= 25) {
      score += 15;
    } else {
      suggestions.push('Keep sentences between 10-25 words for readability.');
    }
  }

  if (/https?:\/\//.test(desc)) {
    score += 10;
  } else {
    suggestions.push('Include relevant links (social media, website, resources).');
  }

  return { score: Math.min(score, 100), maxScore: 100, suggestions };
}

function scoreTags(tagsStr: string, keyword: string): TitleScore {
  const suggestions: string[] = [];
  const tags = tagsStr.split(',').map((t) => t.trim()).filter(Boolean);
  let score = 0;

  if (tags.length >= 15 && tags.length <= 30) {
    score += 40;
  } else if (tags.length >= 5) {
    score += 25;
    suggestions.push('Use 15-30 tags for maximum reach.');
  } else {
    suggestions.push('Use at least 15 tags to improve discoverability.');
  }

  const longTags = tags.filter((t) => t.split(/\s+/).length >= 2);
  if (longTags.length >= 5) {
    score += 25;
  } else {
    suggestions.push('Use multi-word (long-tail) tags for better ranking.');
  }

  if (keyword && tags.some((t) => t.toLowerCase().includes(keyword.toLowerCase()))) {
    score += 20;
  } else if (keyword) {
    suggestions.push('Include the target keyword or its variations in your tags.');
  }

  const unique = new Set(tags.map((t) => t.toLowerCase()));
  if (unique.size === tags.length) {
    score += 15;
  } else {
    suggestions.push('Remove duplicate tags.');
  }

  return { score: Math.min(score, 100), maxScore: 100, suggestions };
}

function scoreHashtags(hashtagsStr: string): TitleScore {
  const suggestions: string[] = [];
  const tags = hashtagsStr.split(/[\s,]+/).filter(Boolean);
  let score = 0;

  if (tags.length >= 3 && tags.length <= 15) {
    score += 40;
  } else if (tags.length > 15) {
    score += 20;
    suggestions.push('Too many hashtags. 3-15 is optimal.');
  } else {
    suggestions.push('Add 3-15 relevant hashtags.');
  }

  const broadTags = tags.filter((t) => t.length <= 10);
  const nicheTags = tags.filter((t) => t.length > 10);
  if (broadTags.length > 0 && nicheTags.length > 0) {
    score += 35;
  } else {
    suggestions.push('Mix broad and niche hashtags for better reach.');
  }

  const hashTags = tags.filter((t) => t.startsWith('#'));
  if (hashTags.length === tags.length) {
    score += 25;
  } else {
    suggestions.push('Hashtags should start with #.');
  }

  return { score: Math.min(score, 100), maxScore: 100, suggestions };
}

function scoreKeywordDensity(text: string, keyword: string): TitleScore {
  const suggestions: string[] = [];
  if (!keyword) return { score: 0, maxScore: 100, suggestions: ['Enter a target keyword to check density.'] };

  const words = text.split(/\s+/);
  const keywordWords = keyword.split(/\s+/);
  let matches = 0;

  for (let i = 0; i <= words.length - keywordWords.length; i++) {
    if (keywordWords.every((kw: string, j: number) => words[i + j]?.toLowerCase() === kw.toLowerCase())) {
      matches++;
    }
  }

  const density = words.length > 0 ? (matches / words.length) * 100 : 0;
  let score = 0;

  if (density >= 1 && density <= 3) {
    score = 90;
  } else if (density >= 0.5 && density < 1) {
    score = 60;
    suggestions.push(`Keyword density is low (${density.toFixed(1)}%). Aim for 1-3%.`);
  } else if (density > 3 && density <= 5) {
    score = 50;
    suggestions.push(`Keyword density is high (${density.toFixed(1)}%). Reduce to avoid keyword stuffing.`);
  } else if (density > 5) {
    score = 20;
    suggestions.push(`Keyword stuffing detected (${density.toFixed(1)}%). Reduce keyword frequency.`);
  } else {
    score = 30;
    suggestions.push('Keyword not found in the text.');
  }

  return { score, maxScore: 100, suggestions };
}

function scoreReadability(text: string): TitleScore {
  const suggestions: string[] = [];
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.length > 0);

  if (sentences.length === 0 || words.length === 0) {
    return { score: 0, maxScore: 100, suggestions: ['Add content to check readability.'] };
  }

  const avgWordsPerSentence = words.length / sentences.length;
  let score = 0;

  if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 20) {
    score = 85;
  } else if (avgWordsPerSentence >= 8 && avgWordsPerSentence <= 25) {
    score = 60;
    suggestions.push(`Average sentence length is ${avgWordsPerSentence.toFixed(1)} words. Aim for 10-20.`);
  } else {
    score = 30;
    suggestions.push(`Sentences are too ${avgWordsPerSentence > 20 ? 'long' : 'short'} (${avgWordsPerSentence.toFixed(1)} avg words).`);
  }

  const complexWords = words.filter((w) => w.length > 6).length;
  const complexityRatio = complexWords / words.length;
  if (complexityRatio < 0.3) {
    score = Math.min(score + 15, 100);
  } else {
    suggestions.push('Use simpler language. Too many complex words reduce accessibility.');
  }

  return { score, maxScore: 100, suggestions };
}

function scoreStructure(desc: string): TitleScore {
  const suggestions: string[] = [];
  let score = 0;

  if (desc.includes('\n\n') || desc.includes('\r\n\r\n')) {
    score += 40;
  } else {
    suggestions.push('Use paragraphs to structure your description.');
  }

  const lines = desc.split('\n').filter(Boolean);
  if (lines.length >= 3) {
    score += 30;
  } else {
    suggestions.push('Your description should have at least 3 sections/lines.');
  }

  if (/https?:\/\//.test(desc)) {
    score += 30;
  } else {
    suggestions.push('Include links to related content or social media.');
  }

  return { score: Math.min(score, 100), maxScore: 100, suggestions };
}

function scoreEngagementHooks(text: string): TitleScore {
  const suggestions: string[] = [];
  let score = 0;

  if (/\b(subscribe|like|comment|share|follow)\b/i.test(text)) {
    score += 40;
  } else {
    suggestions.push('Include a clear call-to-action (subscribe, like, comment, share).');
  }

  if (/\?/.test(text)) {
    score += 20;
  } else {
    suggestions.push('Ask a question to encourage comments.');
  }

  const emojis = text.match(/[\p{Emoji}]/gu);
  if (emojis && emojis.length >= 1 && emojis.length <= 5) {
    score += 25;
  } else if (emojis && emojis.length > 5) {
    score += 10;
    suggestions.push('Too many emojis. 1-5 is optimal.');
  } else {
    suggestions.push('Add 1-3 relevant emojis to increase visual appeal.');
  }

  return { score: Math.min(score, 100), maxScore: 100, suggestions };
}

interface CategoryBreakdown {
  title: TitleScore & { weight: number };
  description: TitleScore & { weight: number };
  tags: TitleScore & { weight: number };
  keywordDensity: TitleScore & { weight: number };
  hashtags: TitleScore & { weight: number };
  readability: TitleScore & { weight: number };
  structure: TitleScore & { weight: number };
  engagementHooks: TitleScore & { weight: number };
}

export function calculateSEOScore(inputs: {
  title: string;
  description: string;
  tags: string;
  hashtags: string;
  keyword: string;
  category: string;
}): {
  overallScore: number;
  breakdown: CategoryBreakdown;
  topSuggestions: string[];
} {
  const breakdown: CategoryBreakdown = {
    title: { ...scoreTitle(inputs.title, inputs.keyword), weight: 0.1 },
    description: { ...scoreDescription(inputs.description, inputs.keyword), weight: 0.1 },
    tags: { ...scoreTags(inputs.tags, inputs.keyword), weight: 0.15 },
    keywordDensity: { ...scoreKeywordDensity(inputs.title + ' ' + inputs.description, inputs.keyword), weight: 0.2 },
    hashtags: { ...scoreHashtags(inputs.hashtags), weight: 0.1 },
    readability: { ...scoreReadability(inputs.description), weight: 0.15 },
    structure: { ...scoreStructure(inputs.description), weight: 0.1 },
    engagementHooks: { ...scoreEngagementHooks(inputs.description), weight: 0.1 },
  };

  const overallScore = Math.round(
    Object.values(breakdown).reduce((sum, cat) => sum + cat.score * cat.weight, 0),
  );

  const allSuggestions = Object.entries(breakdown)
    .flatMap(([, cat]) => cat.suggestions.map((s: string) => ({ key: '', suggestion: s, score: cat.score })))
    .sort((a: { score: number }, b: { score: number }) => a.score - b.score)
    .slice(0, 5)
    .map((s: { suggestion: string }) => s.suggestion);

  return { overallScore, breakdown, topSuggestions: allSuggestions };
}

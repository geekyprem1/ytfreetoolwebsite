const POWER_WORDS = [
  'ultimate',
  'proven',
  'secret',
  'free',
  'best',
  'top',
  'amazing',
  'easy',
  'simple',
  'new',
  'instant',
  'powerful',
  'essential',
  'complete',
  'fast',
  'guaranteed',
];

const EMOTIONAL_TRIGGERS = [
  'you',
  'your',
  'shocking',
  'insane',
  'never',
  'always',
  'stop',
  'avoid',
  'warning',
  'mistake',
  'love',
  'hate',
  'fear',
  'why',
  'how',
  'what',
];

export interface HeadlineBreakdown {
  lengthScore: number;
  emotionalScore: number;
  powerWordScore: number;
  total: number;
  charCount: number;
  inOptimalLength: boolean;
  powerWordsFound: string[];
  emotionalTriggersFound: string[];
  suggestions: string[];
}

/** 0–100 Headline Strength Scorecard: length (40–60), emotional triggers, power words. */
export function scoreHeadlineStrength(title: string): HeadlineBreakdown {
  const lower = title.toLowerCase();
  const suggestions: string[] = [];
  const charCount = title.length;

  let lengthScore = 0;
  const inOptimalLength = charCount >= 40 && charCount <= 60;
  if (inOptimalLength) {
    lengthScore = 40;
  } else if (charCount >= 35 && charCount <= 70) {
    lengthScore = 28;
    suggestions.push('Tighten toward 40–60 characters for the CTR sweet spot (~21% higher).');
  } else {
    lengthScore = 12;
    suggestions.push('Aim for 40–60 characters — titles in that range often see ~21% higher CTR.');
  }

  const emotionalTriggersFound = EMOTIONAL_TRIGGERS.filter((w) =>
    new RegExp(`\\b${w}\\b`, 'i').test(lower),
  );
  let emotionalScore = Math.min(30, emotionalTriggersFound.length * 10);
  if (/[?!]/.test(title)) emotionalScore = Math.min(30, emotionalScore + 5);
  if (emotionalScore < 15) {
    suggestions.push('Add emotional triggers (you/your, why/how, or a question mark).');
  }

  const powerWordsFound = POWER_WORDS.filter((w) => new RegExp(`\\b${w}\\b`, 'i').test(lower));
  const powerWordScore = Math.min(30, powerWordsFound.length * 15);
  if (powerWordScore === 0) {
    suggestions.push('Include a power word (best, free, ultimate, proven, easy).');
  }

  const total = Math.min(100, lengthScore + emotionalScore + powerWordScore);

  return {
    lengthScore,
    emotionalScore,
    powerWordScore,
    total,
    charCount,
    inOptimalLength,
    powerWordsFound,
    emotionalTriggersFound,
    suggestions,
  };
}

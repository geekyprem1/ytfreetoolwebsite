/**
 * Programmatic "YouTube tags for {niche}" pages. Each niche ships a curated
 * starter tag set (build-time, no API). Pages CTA to the AI generators for
 * video-specific tags.
 */

export interface TagNiche {
  slug: string;
  name: string;
  tags: string[];
}

/** Build a niche entry, deriving the slug from the name. */
function niche(name: string, tags: string[]): TagNiche {
  return { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), name, tags };
}

export const tagNiches: TagNiche[] = [
  niche('Gaming', ['gaming', 'gameplay', 'lets play', 'gaming channel', 'walkthrough', 'gaming tips', 'pc gaming', 'console gaming', 'game review', 'speedrun']),
  niche('Vlog', ['vlog', 'daily vlog', 'lifestyle vlog', 'day in my life', 'vlogger', 'travel vlog', 'weekly vlog', 'life update', 'grwm', 'routine']),
  niche('Cooking', ['cooking', 'recipe', 'easy recipes', 'home cooking', 'food', 'meal prep', 'quick recipes', 'how to cook', 'dinner ideas', 'baking']),
  niche('Tech Review', ['tech review', 'gadget review', 'unboxing', 'technology', 'smartphone review', 'tech tips', 'best gadgets', 'tech 2026', 'product review', 'hands on']),
  niche('Fitness', ['fitness', 'workout', 'home workout', 'gym', 'exercise', 'weight loss', 'fitness tips', 'strength training', 'hiit', 'fitness motivation']),
  niche('Study', ['study', 'study with me', 'study tips', 'productivity', 'exam prep', 'note taking', 'study motivation', 'student life', 'how to study', 'focus']),
  niche('Beauty', ['beauty', 'makeup', 'makeup tutorial', 'skincare', 'grwm', 'beauty tips', 'makeup look', 'skincare routine', 'beauty review', 'cosmetics']),
  niche('Finance', ['personal finance', 'investing', 'money', 'budgeting', 'stock market', 'passive income', 'financial freedom', 'save money', 'money tips', 'wealth']),
  niche('Travel', ['travel', 'travel vlog', 'travel guide', 'budget travel', 'travel tips', 'destination', 'backpacking', 'solo travel', 'travel 2026', 'wanderlust']),
  niche('Music', ['music', 'cover song', 'original song', 'music video', 'singer', 'guitar', 'music production', 'beat', 'songwriting', 'live performance']),
  niche('Education', ['education', 'tutorial', 'how to', 'explained', 'learning', 'lesson', 'educational', 'science', 'history', 'facts']),
  niche('Comedy', ['comedy', 'funny', 'skit', 'comedy video', 'humor', 'parody', 'funny moments', 'sketch comedy', 'entertainment', 'laugh']),
  niche('DIY', ['diy', 'do it yourself', 'crafts', 'diy projects', 'how to make', 'handmade', 'diy ideas', 'home improvement', 'upcycle', 'tutorial']),
  niche('Photography', ['photography', 'photo tips', 'camera', 'photography tutorial', 'editing', 'lightroom', 'portrait', 'photographer', 'photo editing', 'camera gear']),
  niche('Coding', ['coding', 'programming', 'web development', 'python', 'javascript', 'learn to code', 'software development', 'coding tutorial', 'developer', 'tech']),
  niche('Podcast', ['podcast', 'interview', 'talk show', 'podcast clips', 'conversation', 'episode', 'podcasting', 'guest', 'discussion', 'audio']),
  niche('Cars', ['cars', 'car review', 'automotive', 'car', 'supercar', 'car vlog', 'motoring', 'car tips', 'driving', 'car detailing']),
  niche('Pets', ['pets', 'dogs', 'cats', 'pet care', 'cute animals', 'dog training', 'puppy', 'pet vlog', 'animals', 'pet tips']),
  niche('Real Estate', ['real estate', 'property', 'home tour', 'real estate tips', 'investing in real estate', 'house hunting', 'realtor', 'property investment', 'mortgage', 'first home']),
  niche('Motivation', ['motivation', 'self improvement', 'motivational', 'discipline', 'success', 'mindset', 'personal growth', 'inspiration', 'productivity', 'habits']),
];

export function getTagNiche(slug: string): TagNiche | undefined {
  return tagNiches.find((n) => n.slug === slug);
}

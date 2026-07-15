'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Shield, Brain, Target } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant results',
    description: 'Paste any YouTube URL and get results in milliseconds. Every tool is optimized for speed.',
  },
  {
    icon: Shield,
    title: 'No signup required',
    description: 'Privacy-first. We never store your data, require accounts, or track your usage.',
  },
  {
    icon: Brain,
    title: 'AI-powered',
    description: 'Gemini and OpenRouter power titles, descriptions, hooks, and more — tuned for YouTube.',
  },
  {
    icon: Target,
    title: 'Built for creators',
    description: 'Purpose-designed for YouTubers — not generic SEO tools adapted for video.',
  },
];

export function TrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="section-pad">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-16 max-w-xl">
          <h2 className="text-display text-heading-lg mb-3">
            Built differently
          </h2>
          <p className="text-lead">
            Speed, privacy, and intelligence — purpose-built for YouTube creators.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="space-y-3"
            >
              <feature.icon className="size-5 text-primary" strokeWidth={1.75} />
              <h3 className="text-lg font-semibold tracking-tight">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

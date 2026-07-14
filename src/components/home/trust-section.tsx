'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Shield, Brain, Target } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant results',
    description: 'Paste any YouTube URL and get results in milliseconds. Every tool is optimized for speed.',
    color: '#FF3B30',
    gradient: 'from-[#FF3B30]/10 to-[#FF3B30]/5',
    stat: '< 2s',
    statLabel: 'Response time',
  },
  {
    icon: Shield,
    title: 'No signup required',
    description: 'Privacy-first. We never store your data, require accounts, or track your usage.',
    color: '#10B981',
    gradient: 'from-[#10B981]/10 to-[#10B981]/5',
    stat: '0',
    statLabel: 'Data stored',
  },
  {
    icon: Brain,
    title: 'AI-powered intelligence',
    description: 'Gemini 2.5 Flash and OpenRouter power our AI tools — titles, descriptions, hooks, and more.',
    color: '#8B5CF6',
    gradient: 'from-[#8B5CF6]/10 to-[#8B5CF6]/5',
    stat: '8',
    statLabel: 'AI tools',
  },
  {
    icon: Target,
    title: 'Built for creators',
    description: 'Every tool is purposefully designed for YouTubers — not generic SEO tools adapted for video.',
    color: '#F59E0B',
    gradient: 'from-[#F59E0B]/10 to-[#F59E0B]/5',
    stat: '15+',
    statLabel: 'Creator tools',
  },
];

function FeatureCard({ icon: Icon, title, description, color, gradient, stat, statLabel, index }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string; description: string; color: string; gradient: string;
  stat: string; statLabel: string; index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative rounded-2xl border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${gradient} rounded-bl-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative">
        <motion.div
          whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}
          className="size-12 rounded-2xl flex items-center justify-center mb-5"
          style={{ backgroundColor: `${color}14` }}
        >
          <span style={{ color }}><Icon className="size-6" /></span>
        </motion.div>

        <h3 className="text-[19px] font-bold tracking-tight mb-2">{title}</h3>
        <p className="text-[14px] text-muted-foreground leading-relaxed mb-5">{description}</p>

        <div className="flex items-center gap-3 pt-4 border-t">
          <span className="text-2xl font-extrabold tracking-tight" style={{ color }}>{stat}</span>
          <span className="text-[12px] text-muted-foreground font-medium">{statLabel}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function TrustSection() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-[13px] font-medium text-primary mb-5">
          Why creators trust us
        </div>
        <h2 className="text-3xl md:text-[40px] font-bold tracking-tight mb-3">
          Built differently
        </h2>
        <p className="text-[17px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Not another generic tool. Purpose-built for YouTube creators with speed, privacy, and intelligence in mind.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} {...feature} index={i} />
        ))}
      </div>
    </section>
  );
}

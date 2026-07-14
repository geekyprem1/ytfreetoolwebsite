'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link2, LayoutGrid, Zap, ArrowRight, Play } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Link2,
    title: 'Paste any YouTube URL',
    description: 'Copy the link of any video or channel and paste it. Our smart parser instantly recognizes the content type.',
  },
  {
    num: '02',
    icon: LayoutGrid,
    title: 'Pick your tool',
    description: 'Choose from 15+ tools — thumbnails, tags, transcripts, AI generators, analytics, and SEO tools.',
  },
  {
    num: '03',
    icon: Zap,
    title: 'Get instant results',
    description: 'Results appear instantly. Copy, download, or share with one click. Regenerate AI content as needed.',
  },
];

function StepCard({ num, icon: Icon, title, description, index }: {
  num: string; icon: React.ComponentType<{ className?: string }>; title: string; description: string; index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      className="relative group"
    >
      <div className="rounded-2xl border bg-card p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start gap-4">
          <span className="text-[48px] font-extrabold tracking-tighter text-muted/30 leading-none shrink-0 select-none">
            {num}
          </span>
          <div className="pt-1.5">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <span style={{ color: '#FF3B30' }}><Icon className="size-5" /></span>
            </div>
            <h3 className="text-[17px] font-bold tracking-tight mb-1.5">{title}</h3>
            <p className="text-[14px] text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-secondary/30 border-y border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-[13px] font-medium text-primary mb-5">
            <Play className="size-3.5" />
            Simple workflow
          </div>
          <h2 className="text-3xl md:text-[40px] font-bold tracking-tight mb-3">
            How it works
          </h2>
          <p className="text-[17px] text-muted-foreground max-w-xl mx-auto">
            Three steps. No signup. Instant results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <StepCard key={step.num} {...step} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/thumbnail-downloader"
            className="inline-flex items-center gap-2 bg-[#FF3B30] hover:bg-[#E0352B] text-white px-6 py-3 rounded-xl text-[15px] font-semibold transition-all shadow-lg shadow-primary/20"
          >
            Try your first tool <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

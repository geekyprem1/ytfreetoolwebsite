'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link2, LayoutGrid, Zap, ArrowRight } from 'lucide-react';

const steps = [
  {
    num: '1',
    icon: Link2,
    title: 'Paste any YouTube URL',
    description: 'Copy a video or channel link. Our parser instantly detects the content type.',
  },
  {
    num: '2',
    icon: LayoutGrid,
    title: 'Pick your tool',
    description: 'Choose from thumbnails, tags, AI generators, analytics, or SEO tools.',
  },
  {
    num: '3',
    icon: Zap,
    title: 'Get instant results',
    description: 'Results appear instantly. Copy, download, or regenerate with one click.',
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
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="relative mb-4">
        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <span style={{ color: '#FF3B30' }}><Icon className="size-6" /></span>
        </div>
        <span className="absolute -top-1.5 -right-1.5 size-6 rounded-full bg-primary text-[11px] font-bold text-white flex items-center justify-center">
          {num}
        </span>
      </div>
      <h3 className="text-[16px] font-bold tracking-tight mb-1.5">{title}</h3>
      <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[240px]">{description}</p>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 border-y border-border/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-[13px] font-medium text-primary mb-5">
            <Zap className="size-3.5" />
            Simple workflow
          </div>
          <h2 className="text-3xl md:text-[40px] font-bold tracking-tight mb-3">
            How it works
          </h2>
          <p className="text-[16px] text-muted-foreground">
            Three simple steps. No signup needed. Start in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {steps.map((step, i) => (
            <StepCard key={step.num} {...step} index={i} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/thumbnail-downloader"
            className="inline-flex items-center gap-2 bg-[#FF3B30] hover:bg-[#E0352B] text-white px-6 py-3 rounded-xl text-[14px] font-semibold transition-all shadow-md shadow-primary/15 hover:shadow-lg"
          >
            Try your first tool <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

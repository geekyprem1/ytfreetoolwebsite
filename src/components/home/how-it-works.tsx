'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Paste any YouTube URL',
    description: 'Copy a video or channel link. Our parser instantly detects the content type.',
  },
  {
    num: '02',
    title: 'Pick your tool',
    description: 'Choose from thumbnails, tags, AI generators, analytics, or SEO tools.',
  },
  {
    num: '03',
    title: 'Get instant results',
    description: 'Results appear instantly. Copy, download, or regenerate with one click.',
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="section-pad border-t hairline">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-16 max-w-xl">
          <h2 className="text-display text-heading-lg mb-3">
            How it works
          </h2>
          <p className="text-lead">
            Three simple steps. No signup needed.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="space-y-3"
            >
              <span className="text-display text-sm font-semibold tracking-widest text-primary">
                {step.num}
              </span>
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <Link
          href="/thumbnail-downloader"
          className="inline-flex items-center gap-2 bg-[#FF3B30] hover:bg-[#E0352B] text-white px-6 py-3.5 rounded-xl text-base font-semibold transition-colors"
        >
          Try your first tool <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

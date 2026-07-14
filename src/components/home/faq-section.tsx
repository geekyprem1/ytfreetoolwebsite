'use client';

import { useState } from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HelpCircle, MessageCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  { q: 'Do I need to create an account?', a: 'No! All tools are completely free and require no login or account creation. Just paste a YouTube URL and get started.' },
  { q: 'Is this affiliated with YouTube?', a: 'No. YouTube Toolkit AI is an independent project and is not affiliated with or endorsed by YouTube or Google.' },
  { q: 'How many tools are available?', a: 'We offer 15+ tools: Thumbnail Downloader, Tags Extractor, Transcript, AI Title & Description Generator, SEO Score Checker, Analytics, and more.' },
  { q: 'Are AI results SEO-optimized?', a: 'Yes. Our AI tools use advanced prompts and Google Gemini 2.5 Flash to generate SEO-optimized, click-worthy content for YouTube.' },
  { q: 'Are there any usage limits?', a: 'Free tools may have rate limits to ensure fair usage. AI tools have daily request limits on the free tier.' },
  { q: 'Can I use this on mobile?', a: 'Absolutely. All tools are fully responsive and work perfectly on mobile, tablet, and desktop.' },
  { q: 'Do you store my data?', a: 'No. We never store video URLs, transcripts, or generated content. Your data stays private — always.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border bg-card hover:shadow-sm transition-shadow duration-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className={cn('text-[15px] font-semibold transition-colors', open && 'text-primary')}>
          {q}
        </span>
        <ChevronDown
          className={cn(
            'size-4 text-muted-foreground shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-200 ease-in-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <p className="text-[14px] text-muted-foreground leading-relaxed px-5 pb-5">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function HomeFAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-24 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-[13px] font-medium text-primary mb-5">
            <HelpCircle className="size-3.5" />
            Got questions?
          </div>
          <h2 className="text-3xl md:text-[40px] font-bold tracking-tight mb-3">
            Frequently asked questions
          </h2>
          <p className="text-[16px] text-muted-foreground">
            Everything you need to know about the toolkit.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[14px] text-muted-foreground">
            Still have questions?{' '}
            <a href="/contact" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
              Contact us <MessageCircle className="size-3.5" />
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}

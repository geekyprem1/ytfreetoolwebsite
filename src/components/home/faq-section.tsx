'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { homeFaqs } from '@/content/home-faqs';

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/60">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className={cn('text-base font-semibold tracking-tight transition-colors', open && 'text-foreground')}>
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
          <p className="text-base text-muted-foreground leading-relaxed pb-5 pr-8">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function HomeFAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="faq" className="section-pad border-t hairline">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-10 md:mb-12">
          <h2 className="text-display text-heading-lg mb-3">
            Frequently asked questions
          </h2>
          <p className="text-lead">
            Everything you need to know about the toolkit.
          </p>
        </div>

        <div className="border-t border-border/60">
          {homeFaqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

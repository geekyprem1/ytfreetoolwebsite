'use client';

import { motion } from 'framer-motion';
import { UrlSearchBox } from '@/components/home/url-search-box';

export function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,59,48,0.07),transparent)]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative max-w-3xl mx-auto w-full text-center py-16 md:py-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-display text-sm font-semibold tracking-[0.08em] uppercase text-primary mb-6"
        >
          YouTube (YT) Toolkit
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease: 'easeOut' }}
          className="text-display text-heading-xl mb-5 text-balance"
        >
          Free YouTube Creator Tools - AI & Analytics Toolkit
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="text-lead mb-10 max-w-xl mx-auto"
        >
          Download thumbnails, extract tags, generate AI titles, analyze stats — 27 free tools, zero signup.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="max-w-xl mx-auto text-left"
        >
          <UrlSearchBox />
        </motion.div>
      </div>
    </section>
  );
}

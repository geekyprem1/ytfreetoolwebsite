'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Star, Zap, Shield, Users, Sparkles, ThumbsUp, Play, Image, Tags, FileText, Search, BarChart3, ArrowRight } from 'lucide-react';
import { tools } from '@/content/tools-metadata';

const popularSlugs = ['thumbnail-downloader', 'title-generator', 'transcript-extractor', 'tags-extractor', 'video-statistics'];
const popularTools = popularSlugs.map(s => tools.find(t => t.slug === s)).filter(Boolean);

const trustStats = [
  { icon: Zap, value: '20+', label: 'Free Tools' },
  { icon: Users, value: '150K+', label: 'Creators Served' },
  { icon: ThumbsUp, value: '4.9', label: 'User Rating' },
  { icon: Shield, value: '100%', label: 'No Login' },
];

function HeroVisual() {
  const cards = [
    { icon: Image, label: 'Thumbnails', color: '#FF3B30', x: 0, y: 0, delay: 0 },
    { icon: Tags, label: 'Tags', color: '#10B981', x: 180, y: 20, delay: 0.1 },
    { icon: FileText, label: 'Transcript', color: '#8B5CF6', x: 40, y: 140, delay: 0.2 },
    { icon: Sparkles, label: 'AI Titles', color: '#F59E0B', x: 200, y: 150, delay: 0.15 },
    { icon: BarChart3, label: 'Analytics', color: '#3B82F6', x: 100, y: 280, delay: 0.25 },
  ];

  return (
    <div className="relative w-[320px] h-[380px] hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-purple-500/5 rounded-[40px]" />
      <div className="absolute top-[60px] left-[80px] size-36 rounded-full bg-primary/10 blur-[60px]" />
      <div className="absolute bottom-[80px] right-[40px] size-24 rounded-full bg-purple-500/10 blur-[50px]" />
      
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, scale: 0.8, x: card.x - 20 }}
          animate={{ opacity: 1, scale: 1, x: card.x }}
          transition={{ duration: 0.5, delay: card.delay, ease: 'easeOut' }}
          className="absolute flex items-center gap-2.5 bg-card border rounded-2xl px-3.5 py-2.5 shadow-sm"
          style={{ top: card.y }}
        >
          <div className="size-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.color}14` }}>
            <span style={{ color: card.color }}><card.icon className="size-4" /></span>
          </div>
          <span className="text-[13px] font-semibold tracking-tight">{card.label}</span>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2"
      >
        <div className="size-8 rounded-lg bg-[#FF3B30] flex items-center justify-center">
          <Play className="size-4 text-white fill-white" />
        </div>
        <div>
          <p className="text-[12px] font-semibold leading-tight">Paste URL</p>
          <p className="text-[10px] text-muted-foreground">Analyze → Results</p>
        </div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="lg:max-w-[580px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 mb-8">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="size-5 rounded-full bg-primary/20 border-2 border-white dark:border-[#0A0A0A]" />
                  ))}
                </div>
                <span className="text-[13px] font-medium text-primary">
                  Trusted by 150K+ creators
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
              className="text-[44px] leading-[1.08] md:text-[60px] lg:text-[68px] font-extrabold tracking-[-0.03em] mb-6 text-balance"
            >
              The ultimate{' '}
              <span className="text-primary relative">
                toolkit{' '}
                <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 120 8" preserveAspectRatio="none">
                  <path d="M0,4 Q60,0 120,4" fill="none" stroke="#FF3B30" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
                </svg>
              </span>
              <br />for YouTube creators
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-[17px] md:text-[19px] text-muted-foreground leading-relaxed mb-8 max-w-lg"
            >
              Download thumbnails, extract tags, generate AI titles, analyze video stats, and more — all free, no login.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 max-w-md">
                <Link
                  href="/thumbnail-downloader"
                  className="inline-flex items-center gap-2 bg-[#FF3B30] hover:bg-[#E0352B] text-white px-6 py-3 rounded-xl text-[15px] font-semibold transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98]"
                >
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="#tools"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-muted px-6 py-3 rounded-xl text-[15px] font-semibold transition-all border border-border hover:border-primary/20"
                >
                  Explore Tools
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2 mb-8"
            >
              <span className="text-[13px] text-muted-foreground mr-1">Popular:</span>
              {popularTools.map((tool) =>
                tool ? (
                  <Link
                    key={tool.slug}
                    href={tool.route}
                    className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted border border-border/50 text-[13px] font-medium transition-colors hover:border-primary/20"
                  >
                    {tool.name}
                  </Link>
                ) : null
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              {trustStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span style={{ color: '#FF3B30' }}><stat.icon className="size-4" /></span>
                  <div>
                    <p className="text-[15px] font-bold tracking-tight">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="flex items-center justify-center lg:justify-end"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

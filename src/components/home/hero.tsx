'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Shield, Users, ThumbsUp, Play, Image, Tags, FileText, Sparkles, BarChart3, ArrowRight } from 'lucide-react';
import { tools } from '@/content/tools-metadata';
import { UrlSearchBox } from '@/components/home/url-search-box';

const popularSlugs = ['thumbnail-downloader', 'title-generator', 'transcript-extractor', 'tags-extractor', 'video-statistics'];
const popularTools = popularSlugs.map(s => tools.find(t => t.slug === s)).filter(Boolean);

const trustStats = [
  { icon: Users, value: '150K+', label: 'Creators Served', color: '#3B82F6' },
  { icon: Zap, value: '20+', label: 'Free Tools', color: '#FF3B30' },
  { icon: ThumbsUp, value: '4.9', label: 'User Rating', color: '#10B981' },
  { icon: Shield, value: '100%', label: 'No Login', color: '#8B5CF6' },
];

function FloatingCard({ x, y, icon: Icon, label, color, size = 'md', delay = 0 }: {
  x: string; y: string; icon: React.ComponentType<{ className?: string }>; label: string; color: string; size?: 'sm' | 'md' | 'lg'; delay: number;
}) {
  const sizeClasses = {
    sm: 'gap-2 px-3 py-2',
    md: 'gap-2.5 px-3.5 py-2.5',
    lg: 'gap-3 px-4 py-3',
  };
  const iconClasses = {
    sm: 'size-7 rounded-lg',
    md: 'size-9 rounded-xl',
    lg: 'size-10 rounded-xl',
  };
  const iconSizes = { sm: 'size-3.5', md: 'size-4', lg: 'size-[18px]' };
  const textSizes = { sm: 'text-[11px]', md: 'text-[12px]', lg: 'text-[13px]' };
  const floatAmount = { sm: 3, md: 5, lg: 7 };

  return (
    <div className="absolute" style={{ left: x, top: y, transform: 'translateX(-50%)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -floatAmount[size], 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay },
          scale: { duration: 0.6, delay },
          y: { duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut', delay },
        }}
        className={`flex items-center bg-card/70 backdrop-blur-sm border rounded-2xl cursor-default ${sizeClasses[size]}`}
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        }}
      >
        <div className={`${iconClasses[size]} flex items-center justify-center shrink-0`} style={{ backgroundColor: `${color}14` }}>
          <span style={{ color }}><Icon className={iconSizes[size]} /></span>
        </div>
        <span className={`font-semibold tracking-tight ${textSizes[size]} text-foreground/90`}>{label}</span>
      </motion.div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative w-[360px] h-[420px] hidden lg:block">
      <div className="absolute inset-[10px] rounded-[36px] bg-gradient-to-br from-white/60 via-white/40 to-purple-50/30 dark:from-white/[0.03] dark:via-transparent dark:to-purple-500/[0.03] border border-border/30"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02), 0 12px 24px rgba(0,0,0,0.03)' }}
      />
      <div className="absolute top-[30%] left-[50%] size-48 rounded-full bg-primary/[0.04] blur-[60px]" />
      <div className="absolute bottom-[20%] right-[25%] size-40 rounded-full bg-purple-500/[0.04] blur-[50px]" />
      <div className="absolute top-[15%] left-[25%] size-32 rounded-full bg-blue-400/[0.03] blur-[40px]" />

      <FloatingCard x="52%" y="8%" icon={Image} label="Thumbnail Downloader" color="#FF3B30" size="lg" delay={0} />
      <FloatingCard x="84%" y="14%" icon={Tags} label="Tags Extractor" color="#10B981" size="sm" delay={0.12} />
      <FloatingCard x="8%" y="54%" icon={FileText} label="Transcript" color="#8B5CF6" size="sm" delay={0.24} />
      <FloatingCard x="78%" y="52%" icon={Sparkles} label="AI Title Generator" color="#F59E0B" size="md" delay={0.18} />
      <FloatingCard x="18%" y="12%" icon={BarChart3} label="Video Statistics" color="#3B82F6" size="md" delay={0.06} />

      {/* Chips */}
      {[
        { label: 'SEO', x: '70%', y: '34%', color: '#F59E0B', delay: 0.3 },
        { label: 'AI', x: '22%', y: '38%', color: '#8B5CF6', delay: 0.35 },
        { label: '4K', x: '52%', y: '28%', color: '#3B82F6', delay: 0.28 },
        { label: 'HD', x: '38%', y: '58%', color: '#10B981', delay: 0.32 },
      ].map(chip => (
        <div key={chip.label} className="absolute" style={{ left: chip.x, top: chip.y, transform: 'translateX(-50%)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
            transition={{ opacity: { duration: 0.5, delay: chip.delay }, scale: { duration: 0.5, delay: chip.delay }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: chip.delay } }}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/60 dark:bg-white/[0.06] backdrop-blur-sm border border-border/20 shadow-sm"
          >
            <div className="size-1.5 rounded-full" style={{ backgroundColor: chip.color }} />
            <span className="text-[9px] font-semibold tracking-wide text-muted-foreground uppercase">{chip.label}</span>
          </motion.div>
        </div>
      ))}

      {/* Focal Paste URL card */}
      <div className="absolute" style={{ left: '50%', top: '72%', transform: 'translateX(-50%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ opacity: { duration: 0.5, delay: 0.4 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 } }}
          className="flex items-center gap-3 bg-card/80 backdrop-blur-md border border-primary/20 rounded-2xl px-4 py-3"
          style={{ boxShadow: '0 2px 8px rgba(255,59,48,0.08), 0 8px 24px rgba(0,0,0,0.06)' }}
        >
          <div className="size-10 rounded-xl bg-[#FF3B30] flex items-center justify-center" style={{ boxShadow: '0 2px 8px rgba(255,59,48,0.2)' }}>
            <Play className="size-5 text-white fill-white" />
          </div>
          <div>
            <p className="text-[12px] font-bold tracking-tight text-foreground">Paste YouTube URL</p>
            <p className="text-[10px] text-muted-foreground font-medium">Instant results in any tool</p>
          </div>
        </motion.div>
      </div>

      {/* Connecting dots */}
      <div className="absolute top-[22%] left-[48%] size-1 rounded-full bg-border/60" />
      <div className="absolute top-[40%] left-[55%] size-1 rounded-full bg-border/40" />
      <div className="absolute bottom-[28%] left-[42%] size-1.5 rounded-full bg-border/50" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[700px] h-[700px] bg-primary/[0.025] rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="lg:max-w-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary/10 border border-primary/15 mb-8">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="size-5 rounded-full bg-primary/20 border-2 border-background dark:border-[#0A0A0A]" />
                  ))}
                </div>
                <span className="text-[13px] font-semibold text-primary">Trusted by 150K+ creators</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
              className="text-[42px] leading-[1.06] sm:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.035em] mb-6 text-balance"
            >
              The ultimate{' '}
              <span className="text-primary relative inline-block">
                toolkit
                <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 140 8" preserveAspectRatio="none">
                  <path d="M0,4 Q70,0 140,4" fill="none" stroke="#FF3B30" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
                </svg>
              </span>
              <br />for YouTube creators
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-[16px] sm:text-[18px] text-muted-foreground leading-relaxed mb-8 max-w-[480px]"
            >
              Download thumbnails, extract tags, generate AI titles, analyze stats — 15+ free tools, zero signup.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mb-8"
            >
              <UrlSearchBox />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="flex flex-wrap items-center gap-1.5 mb-8"
            >
              {popularTools.map((tool) =>
                tool ? (
                  <Link
                    key={tool.slug}
                    href={tool.route}
                    className="px-3 py-1 rounded-lg bg-secondary hover:bg-muted border border-border/50 text-[12px] font-medium transition-all hover:border-primary/20 hover:text-primary"
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
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/50"
            >
              {trustStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}14` }}>
                    <span style={{ color: stat.color }}><stat.icon className="size-3.5" /></span>
                  </div>
                  <div>
                    <p className="text-[15px] font-bold tracking-tight leading-tight">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex items-center justify-center lg:justify-end"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

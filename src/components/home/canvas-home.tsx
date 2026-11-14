'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, ArrowRight, BookOpen, Check, Download, FileText, Grid2X2, Menu, Plus, Search, Sparkles, Star, X, BarChart3, Calculator, Target, PanelsTopLeft } from 'lucide-react';
import { tools, toolCount, type ToolCategory, type ToolMetadata } from '@/content/tools-metadata';
import { iconMap, FallbackToolIcon } from '@/lib/utils/tool-icons';
import { PublicSponsorCard, usePublicSponsors } from './public-sponsor';
import { searchTools } from '@/content/tool-search';
import { getHomeToolSuggestions } from '@/content/home-tool-suggestions';
import './canvas-home.css';
import './canvas-home-experience.css';

const categories = [
  { id: 'downloader', label: 'Downloaders', Icon: Download },
  { id: 'extractor', label: 'Extractors', Icon: FileText },
  { id: 'ai-generator', label: 'AI tools', Icon: Sparkles },
  { id: 'analytics', label: 'Analytics', Icon: BarChart3 },
  { id: 'seo', label: 'SEO tools', Icon: Target },
  { id: 'calculator', label: 'Calculators', Icon: Calculator },
] satisfies { id: ToolCategory; label: string; Icon: typeof Search }[];

const favouritesKey = 'yt-toolkit-favourites';
let memoryFavourites = '[]';
let useMemoryFavourites = false;
function readFavourites() {
  if (useMemoryFavourites) return memoryFavourites;
  try { return localStorage.getItem(favouritesKey) || '[]'; } catch { return memoryFavourites; }
}
function subscribeFavourites(listener: () => void) {
  window.addEventListener('storage', listener);
  window.addEventListener('yt-favourites-change', listener);
  return () => { window.removeEventListener('storage', listener); window.removeEventListener('yt-favourites-change', listener); };
}

function Brand() {
  return <Link className="logo" href="/" aria-label="YT Toolkit home"><span className="logo-mark"><PanelsTopLeft className="icon" aria-hidden="true" /></span><span>YT<span className="logo-light"> Toolkit</span><small>THE CREATOR TOOLBOX</small></span></Link>;
}

function ToolCard({ tool, quick = false, index = 0, saved = false, onSave }: { tool: ToolMetadata; quick?: boolean; index?: number; saved?: boolean; onSave?: (slug: string) => void }) {
  const Icon = iconMap[tool.icon] ?? FallbackToolIcon;
  if (quick) return <Link href={tool.route} className={`quick-card quick-${index}`}><span className="tool-icon" aria-hidden="true"><Icon className="icon" /></span><span><strong>{tool.name}</strong><small>{['Get the full picture.', 'Find the right words.', 'Turn watching into reading.', 'Look behind the channel.'][index]}</small></span><ArrowUpRight className="icon" aria-hidden="true" /></Link>;
  return <article className={`tool-card category-${tool.category}`}><Link href={tool.route} className="tool-open"><span className="tool-icon" aria-hidden="true"><Icon className="icon" /></span><span className="tool-copy"><h3>{tool.name}</h3><p>{tool.description}</p></span></Link><button className={`save-tool ${saved ? 'saved' : ''}`} onClick={() => onSave?.(tool.slug)} aria-label={`${saved ? 'Unsave' : 'Save'} ${tool.name}`} aria-pressed={saved}><Star className="icon" aria-hidden="true" /></button></article>;
}

function UrlSuggestions({ input }: { input: string }) {
  const detected = getHomeToolSuggestions(input);
  if (!detected) return null;
  return <section className="url-suggestions" aria-label="Suggested tools for your YouTube link"><p className="url-detected" role="status">{detected.type === 'video' ? 'Video' : detected.type === 'channel' ? 'Channel' : 'Playlist'} link detected — choose a tool</p><div className="url-suggestion-links">{detected.suggestions.map(({ tool, href }) => {const Icon = iconMap[tool.icon] ?? FallbackToolIcon; return <Link key={tool.slug} href={href} prefetch={false}><Icon className="icon" aria-hidden="true" /><span>{tool.name}</span><ArrowUpRight className="icon" aria-hidden="true" /></Link>;})}</div></section>;
}

export function CanvasHome({ children }: { children: ReactNode }) {
  const router=useRouter();
  const sponsors=usePublicSponsors();
  const [category, setCategory] = useState<ToolCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const savedJson = useSyncExternalStore(subscribeFavourites, readFavourites, () => '[]');
  const saved = useMemo<string[]>(() => {
    try { const value: unknown = JSON.parse(savedJson); return Array.isArray(value) ? value.filter((s): s is string => typeof s === 'string') : []; } catch { return []; }
  }, [savedJson]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const panel = sidebarRef.current;
    const trigger = menuRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel?.querySelector<HTMLButtonElement>('.canvas-nav-close')?.focus();
    function trapFocus(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !panel) return;
      const nodes = [...panel.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input')].filter(el => el.getClientRects().length > 0);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {e.preventDefault();last?.focus();}
      else if (!e.shiftKey && document.activeElement === last) {e.preventDefault();first?.focus();}
    }
    const desktop = window.matchMedia('(min-width: 761px)');
    const closeOnDesktop = () => {if (desktop.matches) setMenuOpen(false);};
    desktop.addEventListener('change', closeOnDesktop);
    document.addEventListener('keydown', trapFocus);
    return () => {document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', trapFocus); desktop.removeEventListener('change', closeOnDesktop); trigger?.focus();};
  }, [menuOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setMenuOpen(false); }
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !(e.target as HTMLElement).isContentEditable && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName) && !menuOpen) {
        e.preventDefault(); searchRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const detected = getHomeToolSuggestions(query);
  const visible = searchTools(tools, detected ? '' : query, category).filter(t => !onlySaved || saved.includes(t.slug));
  function choose(id: ToolCategory | 'all', favourites = false) {
    setCategory(id); setOnlySaved(favourites); setMenuOpen(false);
    document.getElementById('tools')?.scrollIntoView({ block: 'start' });
  }
  function toggleSaved(slug: string) {
    const next = saved.includes(slug) ? saved.filter(s => s !== slug) : [...saved, slug];
    memoryFavourites = JSON.stringify(next);
    try { localStorage.setItem(favouritesKey, memoryFavourites); useMemoryFavourites = false; } catch { useMemoryFavourites = true; }
    window.dispatchEvent(new Event('yt-favourites-change'));
  }
  const advertise = () => router.push('/sponsor');
  return <div className={`canvas-home ${menuOpen ? 'menu-open' : ''}`}>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    {menuOpen && <button className="canvas-menu-backdrop" aria-label="Close navigation" onClick={() => {setMenuOpen(false); menuRef.current?.focus();}} />}
    <aside ref={sidebarRef} className="sidebar" id="canvas-navigation" aria-label="Tool navigation" role={menuOpen ? 'dialog' : undefined} aria-modal={menuOpen || undefined}>
      <Brand /><button className="canvas-nav-close" aria-label="Close navigation" onClick={() => {setMenuOpen(false); menuRef.current?.focus();}}><X className="icon" /></button>
      <button className="side-search" onClick={() => {setMenuOpen(false); searchRef.current?.focus();}}><Search className="icon" /><span>Find a tool</span><kbd>/</kbd></button>
      <nav className="side-primary" aria-label="Workspace"><button className={`side-item ${!onlySaved && category === 'all' ? 'selected' : ''}`} onClick={() => {setQuery(''); choose('all');}}><Grid2X2 className="icon" />Dashboard</button><button className={`side-item ${onlySaved ? 'selected' : ''}`} onClick={() => {setQuery('');choose('all', true);}}><Star className="icon" />Favourites<span className="favorite-count">{saved.length || ''}</span></button></nav>
      <p className="nav-label">YOUR TOOLBOX</p><nav className="side-categories" aria-label="Tool categories">{categories.map(({id, label, Icon}) => <button key={id} className={`side-item ${category === id ? 'selected' : ''}`} onClick={() => choose(id)}><Icon className="icon" /><span>{label}</span><span className="nav-count">{tools.filter(t => t.category === id).length}</span></button>)}</nav>
      <div className="side-bottom"><Link href="/blog" className="side-item"><BookOpen className="icon" />Creator guides<ArrowUpRight className="icon" /></Link><div className="sidebar-sponsor"><span className="tiny-kicker">BUILT FOR CREATORS</span><p>Put your brand<br />in good company.</p><button onClick={advertise}>Sponsor a slot <ArrowUpRight className="icon" /></button></div><span className="independent">Independent. Creator-first.</span></div>
    </aside>
    <div className="workspace" inert={menuOpen || undefined}><header className="topbar"><button ref={menuRef} className="mobile-menu icon-button" aria-label="Open navigation" aria-controls="canvas-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu className="icon" /></button><span className="breadcrumb"><Grid2X2 className="icon" />Dashboard</span><div className="topbar-right"><span className="free-note"><i />All tools are free</span><button className="text-button" onClick={advertise}>Advertise <ArrowUpRight className="icon" /></button></div></header>
      <main id="main-content" className="main-content"><div className="hero-grid"><section className="hero"><p className="eyebrow">THE CREATOR’S EVERYDAY TOOLKIT</p><h1><span>A little less work.</span><span>A lot more <em>creating.</em></span></h1><p className="hero-description">Download, discover, write and analyse.<br /><strong>{toolCount} free YouTube tools.</strong> One place to get things done.</p><form className="search-box" role="search" onSubmit={e => {e.preventDefault(); choose(category, onlySaved);}}><Search className="icon" /><label className="sr-only" htmlFor="canvas-search">Search YouTube tools</label><input ref={searchRef} id="canvas-search" type="search" placeholder="Search tools, or paste a YouTube link…" value={query} onChange={e => setQuery(e.target.value)} /><kbd>/</kbd><button className="search-action" aria-label="Search tools"><ArrowRight className="icon" /></button></form><UrlSuggestions input={query} /><div className="benefits">{['Free to use','No account needed','Made for creators'].map(s => <span key={s}><Check className="icon" />{s}</span>)}</div></section>
        <aside className="standard-sponsors" aria-label="Standard sponsor spaces"><div className="sponsor-section-label"><span>Sponsored</span><button onClick={advertise}>Advertise here <ArrowUpRight className="icon" /></button></div><div className="standard-list">{[1,2,3,4].map(n => {const sponsor=sponsors.find(s=>s.slotId===n);return sponsor?<PublicSponsorCard key={n} sponsor={sponsor} compact />:<button key={n} className="standard-empty" onClick={advertise}><Plus className="icon" /><span>Your logo here</span><small>Slot {n}</small></button>;})}</div></aside></div>
        <section className="featured-sponsors" aria-label="Featured sponsor spaces"><div className="section-label"><span>Featured sponsors</span><button onClick={advertise}>Your brand here <ArrowUpRight className="icon" /></button></div><div className="sponsor-grid">{[1,2,3,4].map(n => {const sponsor=sponsors.find(s=>s.slotId===n+4);return sponsor?<PublicSponsorCard key={n} sponsor={sponsor} />:<button key={n} className="sponsor-card empty" onClick={advertise} aria-label={`Enquire about featured sponsor slot ${n}`}><span className="slot-plus"><Plus className="icon" /></span><span><strong>Your app here</strong><small>Meet your next creator.</small></span><ArrowUpRight className="icon" /></button>;})}</div></section>
        <section className="quick-start"><div className="section-label"><span>Start with the essentials</span><a href="#tools">Browse all tools <ArrowRight className="icon" /></a></div><div className="quick-grid">{['thumbnail-downloader','title-generator','transcript-extractor','monetization-checker'].map((slug,index) => {const tool = tools.find(t => t.slug === slug); return tool ? <ToolCard key={slug} tool={tool} quick index={index} /> : null;})}</div></section>
        <section className="directory" id="tools"><div className="directory-heading"><h2>Find the right tool for your next video.</h2><span role="status">{visible.length} {onlySaved ? 'saved ' : ''}tools{query && !detected ? ' found' : ', all yours.'}</span></div><div className="filters" role="group" aria-label="Filter tools"><button className={`filter ${category === 'all' ? 'active' : ''}`} aria-pressed={category === 'all'} onClick={() => choose('all')}><Grid2X2 className="icon" />All tools <span>{toolCount}</span></button>{categories.map(({id,label}) => <button key={id} className={`filter ${category === id ? 'active' : ''}`} aria-pressed={category === id} onClick={() => choose(id)}>{label}</button>)}</div><div className="tools-grid">{visible.map(tool => <ToolCard key={tool.slug} tool={tool} saved={saved.includes(tool.slug)} onSave={toggleSaved} />)}</div>{visible.length === 0 && <div className="no-results"><h3>{onlySaved ? 'Your favourites start here' : 'No tools found'}</h3><p>{onlySaved ? 'Save a tool using its star button to find it here.' : 'Try another search or category.'}</p><button onClick={() => {setQuery('');choose('all');}}>Show all tools</button></div>}</section>
        <div className="canvas-supporting-content">{children}</div><footer className="page-footer"><Brand /><span>Make something worth watching.</span><nav className="footer-links" aria-label="Site information"><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></footer>
      </main></div>

  </div>;
}

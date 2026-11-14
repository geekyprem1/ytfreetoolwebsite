'use client';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { PublicSponsor } from '@/lib/sponsorship/types';

export function usePublicSponsors() {
  const [sponsors,setSponsors]=useState<PublicSponsor[]>([]);
  useEffect(() => {
    const controller=new AbortController();
    const load=async () => {
      try {const response=await fetch('/api/sponsors',{cache:'no-store',signal:controller.signal});if(response.ok){const data=await response.json();if(!controller.signal.aborted)setSponsors(data.sponsors);}}
      catch { /* A sponsor outage must not interrupt the tools. */ }
    };
    void load();const interval=setInterval(() => void load(),60000);
    return () => {controller.abort();clearInterval(interval);};
  },[]);
  useEffect(() => {
    if(!sponsors.length)return;
    const firstEnd=Math.min(...sponsors.map(s=>s.expiresAt))*1000;
    const timeout=setTimeout(() => setSponsors(current=>current.filter(s=>s.expiresAt*1000>Date.now())),Math.min(2147483647,Math.max(0,firstEnd-Date.now())));
    return () => clearTimeout(timeout);
  },[sponsors]);
  return sponsors;
}
export function PublicSponsorCard({sponsor,compact=false}:{sponsor:PublicSponsor;compact?:boolean}) {
  return <a href={sponsor.url} target="_blank" rel="sponsored noopener noreferrer" className={compact?'standard-card':'sponsor-card'}><span className="sponsor-logo"><Image src={sponsor.logo} alt="" width={37} height={37} unoptimized /></span><span><strong>{sponsor.brand}</strong><small>{sponsor.tagline}</small></span><ArrowUpRight className="icon" aria-hidden="true" /></a>;
}

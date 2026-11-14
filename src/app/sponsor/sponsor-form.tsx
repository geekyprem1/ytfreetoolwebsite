'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import type { SponsorSlot } from '@/lib/sponsorship/types';
import { MAX_LOGO_BYTES } from '@/lib/sponsorship/validation';
import styles from './sponsor.module.css';

export function SponsorForm() {
  const [slots,setSlots]=useState<SponsorSlot[]>([]);
  const [enabled,setEnabled]=useState(false);
  const [loaded,setLoaded]=useState(false);
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const [receipt,setReceipt]=useState('');
  const [brand,setBrand]=useState(''); const [tagline,setTagline]=useState('');
  const [slotId,setSlotId]=useState(0); const [logoUrl,setLogoUrl]=useState('');
  const objectUrl=useRef('');
  useEffect(() => {
    const controller=new AbortController();
    fetch('/api/sponsorship/availability',{cache:'no-store',signal:controller.signal}).then(async response => {
      const data=await response.json(); if (!response.ok) throw new Error(data.error || 'Availability could not be loaded.');
      setSlots(data.slots); setEnabled(data.bookingEnabled); setLoaded(true);
    }).catch(error => {if (!controller.signal.aborted) {setError(error instanceof Error ? error.message : 'Availability could not be loaded.');setLoaded(true);}});
    return () => controller.abort();
  },[]);
  useEffect(() => () => {if(objectUrl.current) URL.revokeObjectURL(objectUrl.current);},[]);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true);setError('');
    const body=new FormData(event.currentTarget);
    try {
      const response=await fetch('/api/sponsorship/bookings',{method:'POST',body});
      const data=await response.json(); if (!response.ok) throw new Error(data.error || 'Your request could not be saved.');
      setReceipt(data.id);
    } catch(error) {setError(error instanceof Error ? error.message : 'Your request could not be saved.');}
    finally {setBusy(false);}
  }
  if(receipt) return <section className={styles.success} role="status"><Check aria-hidden="true" /><h2>Request received.</h2><p>Your creative is in the review queue. This is a request, not a confirmed reservation. No payment was collected.</p><p>Reference: <code>{receipt}</code></p><Link href="/">Back to your toolkit</Link></section>;
  return <div className={styles.root}>
    <div className={styles.notice}>Sponsorship requests are reviewed before placement. Pricing and online payments are not available yet. Submitting this form does not reserve a slot or start a subscription.</div>
    {!loaded && <p role="status">Loading available spaces…</p>}
    {loaded && !enabled && <p className={styles.notice}>New sponsorship requests are not open right now. You can still preview your creative below.</p>}
    <form onSubmit={submit}>
      <fieldset disabled={!enabled || busy} className={styles.fieldset}>
        <legend>Choose a space</legend>
        <div className={styles.packages}>{(['standard','featured'] as const).map(kind => <div className={styles.package} key={kind}><h2>{kind==='standard'?'Standard':'Featured'}</h2><p>{kind==='standard'?'A compact listing beside the homepage headline.':'A larger card below the homepage search.'}</p><div className={styles.slots}>{slots.filter(s => s.kind===kind).map(slot => <label key={slot.id} className={`${styles.slot} ${slotId===slot.id?styles.selected:''} ${!slot.available?styles.unavailable:''}`}><input type="radio" name="slotId" value={slot.id} required disabled={!slot.available} checked={slotId===slot.id} onChange={() => setSlotId(slot.id)} />Slot {slot.id}<small>{slot.available?'Available':'Unavailable'}</small></label>)}</div></div>)}</div>
      </fieldset>
      <div className={styles.columns}>
        <section className={styles.panel} aria-labelledby="creative-title"><h2 id="creative-title">Make it yours.</h2>
          <label className={styles.field}>Brand name<input name="brand" maxLength={40} required value={brand} onChange={e => setBrand(e.target.value)} autoComplete="organization" /></label>
          <label className={styles.field}>Website<input type="url" name="url" placeholder="https://yourwebsite.com" maxLength={2048} pattern="https://.*" required /></label>
          <label className={styles.field}>What does your product do?<input name="tagline" maxLength={60} required value={tagline} onChange={e => setTagline(e.target.value)} /><small>{tagline.length}/60 characters</small></label>
          <label className={styles.field}>Logo<input type="file" name="logo" accept="image/png,image/jpeg,image/webp" required onChange={e => {
            if(objectUrl.current) URL.revokeObjectURL(objectUrl.current); objectUrl.current='';setLogoUrl('');
            const file=e.target.files?.[0]; if(!file)return;
            if(file.size>MAX_LOGO_BYTES || !['image/png','image/jpeg','image/webp'].includes(file.type)) {e.target.value='';setError('Choose a PNG, JPG or WebP no larger than 2 MB.');return;}
            objectUrl.current=URL.createObjectURL(file);setLogoUrl(objectUrl.current);setError('');
          }} /><small>PNG, JPG or WebP · up to 2 MB · square works best</small></label>
        </section>
        <aside className={styles.preview} aria-label="Live sponsor card preview"><p>YOUR PLACEMENT, IN CONTEXT</p><div className={styles.previewCard}>{logoUrl?<Image unoptimized src={logoUrl} alt="Your logo preview" width={42} height={42} />:<span className={styles.letter}>{brand[0]?.toUpperCase() || 'Y'}</span>}<div><strong>{brand || 'Your brand'}</strong><span>{tagline || 'A few words about what you do.'}</span></div><ArrowUpRight size={15} aria-hidden="true" /></div><small>Live preview · {slotId>4?'Featured':'Standard'}</small><p>Your logo. Your name.<br />In good company.</p></aside>
      </div>
      <section className={styles.panel}><h2>How can we reach you?</h2><p>These details stay private and are visible only to the site owner.</p><div className={styles.columns}><label className={styles.field}>Your name<input name="contactName" required maxLength={100} autoComplete="name" /></label><label className={styles.field}>Contact email<input name="contactEmail" type="email" required maxLength={254} autoComplete="email" /></label></div><label className={styles.field}>Anything else? <span>(optional)</span><textarea name="note" maxLength={1000} rows={3} /></label></section>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.actions}><span>No payment collected.<br /><small>Creative approval is required before any placement.</small></span><button type="submit" className={styles.primary} disabled={!enabled || busy || !slotId}>{busy?'Saving request…':'Request this placement'} <ArrowUpRight size={16} aria-hidden="true" /></button></div>
      <p className={styles.privacy}>Contact details are used to review this request and arrange a placement. <Link href="/privacy">Privacy policy</Link>.</p>
    </form>
  </div>;
}

'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { SponsorBooking } from '@/lib/sponsorship/types';
import styles from './sponsor-admin.module.css';

type Booking=Omit<SponsorBooking,'logo_key'> & {logo:string};
function PrivateLogo({url,token}:{url:string;token:string}) {
  const [src,setSrc]=useState('');
  useEffect(() => {
    const controller=new AbortController();let objectUrl='';
    fetch(url,{headers:{Authorization:`Bearer ${token}`},signal:controller.signal,cache:'no-store'}).then(async response => {
      if(!response.ok) return;const blob=await response.blob();if(controller.signal.aborted)return;
      objectUrl=URL.createObjectURL(blob);setSrc(objectUrl);
    }).catch(() => undefined);
    return () => {controller.abort();if(objectUrl)URL.revokeObjectURL(objectUrl);};
  },[url,token]);
  return src?<Image unoptimized src={src} alt="Submitted sponsor logo" width={48} height={48} />:<span className={styles.logoPlaceholder}>Logo</span>;
}
export function SponsorAdmin() {
  const [key,setKey]=useState('');const token=useRef('');
  const [bookings,setBookings]=useState<Booking[]>([]);const [authenticated,setAuthenticated]=useState(false);
  const [busy,setBusy]=useState(false);const [error,setError]=useState('');
  const [endDates,setEndDates]=useState<Record<string,string>>({});
  const [complimentary,setComplimentary]=useState<Record<string,boolean>>({});
  async function load(accessKey=token.current) {
    const response=await fetch('/api/admin/sponsors',{headers:{Authorization:`Bearer ${accessKey}`},cache:'no-store'});
    const data=await response.json();if(!response.ok)throw new Error(data.error || 'Unable to load bookings.');
    setBookings(data.bookings);return accessKey;
  }
  async function login(e:React.FormEvent) {
    e.preventDefault();setBusy(true);setError('');
    try {token.current=await load(key);setKey('');setAuthenticated(true);} catch(error) {setError(error instanceof Error?error.message:'Unable to sign in.');}
    finally {setBusy(false);}
  }
  async function action(booking:Booking,action:string) {
    setBusy(true);setError('');
    try {
      const payload=action==='activate'?{id:booking.id,action,complimentary:complimentary[booking.id]===true,endsAt:Math.floor(new Date(endDates[booking.id] || '').getTime()/1000)}:{id:booking.id,action};
      const response=await fetch('/api/admin/sponsors',{method:'POST',headers:{Authorization:`Bearer ${token.current}`,'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const data=await response.json();if(!response.ok)throw new Error(data.error || 'Action failed.');await load();
    } catch(error) {setError(error instanceof Error?error.message:'Action failed.');}
    finally {setBusy(false);}
  }
  return <main className={styles.root}><header className={styles.header}><div><Link href="/">← YT Toolkit</Link><h1>Sponsor administration</h1></div>{authenticated&&<button onClick={() => {token.current='';setAuthenticated(false);setBookings([]);setError('');}}>Sign out</button>}</header>
    <p className={styles.notice}>Paid activation is not connected yet. Approval reserves a slot for 24 hours. Complimentary placements can be activated explicitly with an end date. Pausing retains the slot until that date.</p>
    {!authenticated?<form className={styles.login} onSubmit={login}><label htmlFor="admin-key">Owner access key</label><input id="admin-key" type="password" required value={key} onChange={e => setKey(e.target.value)} autoComplete="current-password" /><p>The key stays in memory for this page session. It is never added to a URL or browser storage.</p><button disabled={busy}>{busy?'Checking…':'Open review queue'}</button></form>:<><div className={styles.toolbar}><span>{bookings.length} recent requests (latest 100)</span><button disabled={busy} onClick={async () => {setBusy(true);setError('');try{await load();}catch(error){setError(error instanceof Error?error.message:'Refresh failed.');}finally{setBusy(false);}}}>Refresh</button></div>{bookings.length===0&&<p className={styles.empty}>No sponsorship requests yet.</p>}<div className={styles.list}>{bookings.map(b=><article key={b.id} className={styles.card}><div className={styles.brand}><PrivateLogo url={b.logo} token={token.current} /><div><h2>{b.brand}</h2><span>Slot {b.slot_id} · {b.slot_id>4?'Featured':'Standard'} · <strong>{b.status}</strong></span></div></div><p>{b.tagline}</p><a href={b.url} target="_blank" rel="noopener noreferrer">{b.url} ↗</a><dl><dt>Contact</dt><dd>{b.contact_name} · {b.contact_email}</dd><dt>Submitted</dt><dd>{new Date(b.created_at*1000).toLocaleString()}</dd>{b.approval_until&&b.status==='approved'&&<><dt>Approval hold ends</dt><dd>{new Date(b.approval_until*1000).toLocaleString()}</dd></>}{b.ends_at&&<><dt>Display ends</dt><dd>{new Date(b.ends_at*1000).toLocaleString()}</dd></>}{b.note&&<><dt>Note</dt><dd>{b.note}</dd></>}</dl><small className={styles.reference}>Reference: {b.id}</small>
      {b.status==='approved'&&<div className={styles.activation}><label>Display until (your local time)<input type="datetime-local" value={endDates[b.id]||''} onChange={e=>setEndDates({...endDates,[b.id]:e.target.value})} /></label><label className={styles.check}><input type="checkbox" checked={complimentary[b.id]||false} onChange={e=>setComplimentary({...complimentary,[b.id]:e.target.checked})} />This is a complimentary placement. No payment has been verified.</label><button disabled={busy||!complimentary[b.id]||!endDates[b.id]} onClick={()=>action(b,'activate')}>Activate complimentary placement</button></div>}
      <div className={styles.actions}>{b.status==='pending'&&<button disabled={busy} onClick={()=>action(b,'approve')}>Approve creative</button>}{['pending','approved'].includes(b.status)&&<button disabled={busy} onClick={()=>action(b,'reject')}>Reject</button>}{b.status==='active'&&<button disabled={busy} onClick={()=>action(b,'pause')}>Pause</button>}{b.status==='paused'&&<button disabled={busy} onClick={()=>action(b,'resume')}>Resume</button>}{['approved','active','paused'].includes(b.status)&&<button disabled={busy} onClick={()=>action(b,'end')}>End placement</button>}</div>
    </article>)}</div></>}
    {error&&<p className={styles.error} role="alert">{error}</p>}
  </main>;
}

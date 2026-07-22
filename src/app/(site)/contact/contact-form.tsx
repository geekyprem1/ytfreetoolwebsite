'use client';

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`YT Toolkit contact from ${name || 'creator'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'hello@yttools.pro'}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5 max-w-lg">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="h-12 rounded-xl text-base md:text-base"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-12 rounded-xl text-base md:text-base"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          rows={5}
          className="rounded-xl text-base"
          required
        />
      </div>
      <Button
        type="submit"
        className="h-12 px-6 rounded-xl bg-[#FF3B30] hover:bg-[#E0352B] text-white text-base"
      >
        Send message
      </Button>
      {sent ? (
        <p className="text-sm text-muted-foreground">
          Your email app should open. If it doesn&apos;t, write us at hello@yttools.pro.
        </p>
      ) : null}
    </form>
  );
}

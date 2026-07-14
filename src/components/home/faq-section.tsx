import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Do I need to create an account?',
    a: 'No! All tools are completely free and require no login or account creation. Just paste a YouTube URL and get started.',
  },
  {
    q: 'Is this tool affiliated with YouTube?',
    a: 'No, YouTube Toolkit AI is an independent project and is not affiliated with or endorsed by YouTube or Google.',
  },
  {
    q: 'How many tools are available?',
    a: 'We offer 15+ tools including Thumbnail Downloader, Tags Extractor, Transcript Extractor, AI Title & Description Generator, SEO Score Checker, and more.',
  },
  {
    q: 'Are AI-generated titles and descriptions SEO-optimized?',
    a: 'Yes! Our AI tools use advanced prompts and are powered by Google Gemini to generate SEO-optimized, click-worthy content tailored for YouTube.',
  },
  {
    q: 'Can I use these tools on mobile?',
    a: 'Absolutely! All tools are fully responsive and work on mobile, tablet, and desktop.',
  },
  {
    q: 'Are there any limits?',
    a: 'Free tools may have rate limits to ensure fair usage for everyone. AI tools have daily request limits.',
  },
  {
    q: 'Do you store my data?',
    a: 'No. We do not store video URLs, transcripts, or generated content. Your data stays private.',
  },
];

export function HomeFAQ() {
  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>
      <Accordion className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i}>
            <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

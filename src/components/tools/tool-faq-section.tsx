import { site } from '@/content/site';

export type ToolFaq = { q: string; a: string };

export function ToolFaqSection({ faqs }: { faqs: ToolFaq[] }) {
  if (!faqs.length) return null;

  return (
    <>
      <h2>Frequently asked questions</h2>
      {faqs.map((faq) => (
        <div key={faq.q} className="mb-6">
          <h3>{faq.q}</h3>
          <p>{faq.a}</p>
        </div>
      ))}
      <p>
        More product questions are answered on the{' '}
        <a href={`${site.url}/#faq`}>home FAQ</a>. For privacy or advertising topics, see our{' '}
        <a href={`${site.url}/privacy`}>Privacy Policy</a>.
      </p>
    </>
  );
}

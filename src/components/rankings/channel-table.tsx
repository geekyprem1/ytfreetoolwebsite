import type { RankedChannel } from '@/lib/rankings/rankings';
import { formatCompact, formatFull, formatPercent } from '@/lib/rankings/format';
import { categoryLabels, countryFlag, countryName } from '@/content/rankings/filters';

export interface ChannelTableRow {
  channel: RankedChannel;
  gain?: number;
  percent?: number;
}

interface ChannelTableProps {
  rows: ChannelTableRow[];
  caption: string;
  mode?: 'subscribers' | 'growth';
  /** Label for the gain column, e.g. "Gained (28d)". */
  gainLabel?: string;
}

/**
 * Server-rendered ranking table.
 *
 * Styling lives in globals.css (`.rk*`) rather than per-cell utility classes:
 * with 100 rows, repeated class strings were ~40% of the page's HTML + RSC
 * payload. Keep row markup minimal when editing this component.
 */

function liveCountHref(c: RankedChannel): string {
  return c.handle
    ? `/live-subscriber-count/${encodeURIComponent(`@${c.handle}`)}`
    : `/live-subscriber-count?c=${c.id}`;
}

export function ChannelTable({ rows, caption, mode = 'subscribers', gainLabel = 'Gain' }: ChannelTableProps) {
  const growth = mode === 'growth';

  return (
    <div className="rk-wrap">
      <table className="rk">
        <caption className="sr-only">{`${caption}. Channel names open YouTube in a new tab.`}</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Channel</th>
            {growth ? (
              <>
                <th scope="col">{gainLabel}</th>
                <th scope="col" className="rk-sm">
                  Growth
                </th>
                <th scope="col" className="rk-md">
                  Subscribers
                </th>
              </>
            ) : (
              <>
                <th scope="col">Subscribers</th>
                <th scope="col" className="rk-sm">
                  Views
                </th>
                <th scope="col" className="rk-md">
                  Videos
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ channel: c, gain, percent }, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>
                <div className="rk-ch">
                  {c.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.thumbnail}
                      alt=""
                      width={36}
                      height={36}
                      loading={i < 10 ? undefined : 'lazy'}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span aria-hidden className="rk-av" />
                  )}
                  <div>
                    <a href={`https://www.youtube.com/channel/${c.id}`} target="_blank" rel="noopener noreferrer">
                      {c.title}
                    </a>
                    <p>
                      <span aria-hidden>{`${countryFlag(c.country)} `}</span>
                      {`${countryName(c.country)} · ${categoryLabels[c.category]} · `}
                      <a href={liveCountHref(c)} aria-label={`Live subscriber count for ${c.title}`}>
                        Live count
                      </a>
                    </p>
                  </div>
                </div>
              </td>
              {growth ? (
                <>
                  <td className="rk-up" title={formatFull(gain ?? 0)}>
                    {`+${formatCompact(gain ?? 0)}`}
                  </td>
                  <td className="rk-sm">{formatPercent(percent ?? 0)}</td>
                  <td className="rk-md" title={formatFull(c.subscribers)}>
                    {formatCompact(c.subscribers)}
                  </td>
                </>
              ) : (
                <>
                  <td title={formatFull(c.subscribers)}>{formatCompact(c.subscribers)}</td>
                  <td className="rk-sm" title={formatFull(c.views)}>
                    {formatCompact(c.views)}
                  </td>
                  <td className="rk-md">{formatFull(c.videos)}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

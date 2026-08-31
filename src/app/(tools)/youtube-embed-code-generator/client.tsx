'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { parseYouTubeUrl } from '@/lib/youtube/url-parser';

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-lg border p-2.5 cursor-pointer hover:bg-muted/40 transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-[#FF3B30]"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

export function EmbedCodeGeneratorClient({ initialUrl }: { initialUrl?: string }) {
  const [url, setUrl] = useState(initialUrl ?? '');

  const [responsive, setResponsive] = useState(true);
  const [width, setWidth] = useState('560');
  const [height, setHeight] = useState('315');

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [autoplay, setAutoplay] = useState(false);
  const [mute, setMute] = useState(false);
  const [loop, setLoop] = useState(false);
  const [controls, setControls] = useState(true);
  const [noCookie, setNoCookie] = useState(true);
  const [relatedOff, setRelatedOff] = useState(true);

  const videoId = useMemo(() => {
    const parsed = parseYouTubeUrl(url);
    return parsed?.type === 'video' ? parsed.id : null;
  }, [url]);

  const { src, iframe } = useMemo(() => {
    if (!videoId) return { src: '', iframe: '' };

    const domain = noCookie ? 'www.youtube-nocookie.com' : 'www.youtube.com';
    const params = new URLSearchParams();
    if (start && parseInt(start) > 0) params.set('start', String(parseInt(start)));
    if (end && parseInt(end) > 0) params.set('end', String(parseInt(end)));
    if (autoplay) params.set('autoplay', '1');
    if (mute || autoplay) params.set('mute', '1'); // autoplay needs mute to work in most browsers
    if (loop) {
      params.set('loop', '1');
      params.set('playlist', videoId); // loop requires playlist=videoId for a single video
    }
    if (!controls) params.set('controls', '0');
    if (relatedOff) params.set('rel', '0');

    const query = params.toString();
    const url = `https://${domain}/embed/${videoId}${query ? `?${query}` : ''}`;

    const attrs =
      'title="YouTube video player" frameborder="0" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
      'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen';

    const code = responsive
      ? `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">\n  <iframe src="${url}" style="position:absolute;top:0;left:0;width:100%;height:100%;" ${attrs}></iframe>\n</div>`
      : `<iframe width="${width}" height="${height}" src="${url}" ${attrs}></iframe>`;

    return { src: url, iframe: code };
  }, [
    videoId, noCookie, start, end, autoplay, mute, loop, controls, relatedOff, responsive, width, height,
  ]);

  return (
    <div className="space-y-4">
      <ToolInput label="YouTube video URL" required>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="h-11"
        />
      </ToolInput>

      {url && !videoId && (
        <p className="text-sm text-destructive">
          Paste a valid YouTube video URL (watch, youtu.be, or shorts).
        </p>
      )}

      {videoId && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <Toggle label="Responsive" checked={responsive} onChange={setResponsive} />
            <Toggle label="Privacy (nocookie)" checked={noCookie} onChange={setNoCookie} />
            <Toggle label="Hide related" checked={relatedOff} onChange={setRelatedOff} />
            <Toggle label="Autoplay" checked={autoplay} onChange={setAutoplay} />
            <Toggle label="Muted" checked={mute} onChange={setMute} />
            <Toggle label="Loop" checked={loop} onChange={setLoop} />
            <Toggle label="Show controls" checked={controls} onChange={setControls} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ToolInput label="Start at (seconds)">
              <Input type="number" min="0" value={start} onChange={(e) => setStart(e.target.value)} placeholder="0" />
            </ToolInput>
            <ToolInput label="End at (seconds)">
              <Input type="number" min="0" value={end} onChange={(e) => setEnd(e.target.value)} placeholder="optional" />
            </ToolInput>
          </div>

          {!responsive && (
            <div className="grid grid-cols-2 gap-3">
              <ToolInput label="Width (px)">
                <Input type="number" min="1" value={width} onChange={(e) => setWidth(e.target.value)} />
              </ToolInput>
              <ToolInput label="Height (px)">
                <Input type="number" min="1" value={height} onChange={(e) => setHeight(e.target.value)} />
              </ToolInput>
            </div>
          )}

          <ToolOutput title="Embed code">
            <div className="space-y-4">
              <div className="mx-auto w-full max-w-xl">
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  {/* Live preview uses the same computed src */}
                  <iframe
                    src={src}
                    title="YouTube embed preview"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 12 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              <pre className="rounded-xl border bg-muted/20 p-4 text-xs overflow-x-auto whitespace-pre-wrap break-all">
                {iframe}
              </pre>

              <OutputActions
                copyText={iframe}
                copyLabel="Embed code"
                downloadContent={iframe}
                downloadFilename={`${videoId}-embed.html`}
                downloadMimeType="text/html"
              />
            </div>
          </ToolOutput>
        </>
      )}

      <RelatedTools currentSlug="youtube-embed-code-generator" />
    </div>
  );
}

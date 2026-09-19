'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, FileVideo, LoaderCircle, ShieldCheck } from 'lucide-react';
import { RelatedTools } from '@/components/tools/related-tools';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { Select } from '@/components/ui/select';
import {
  formatAspectRatio,
  formatVideoDuration,
  getShortsEligibility,
  type LocalVideoMetadata,
  type YouTubeChannelType,
} from '@/lib/youtube/shorts-eligibility';

interface VideoFileDetails extends LocalVideoMetadata {
  name: string;
  size: number;
  type: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function displayFileType(file: File): string {
  if (file.type) return file.type.replace('video/', '').toUpperCase();
  const extension = file.name.split('.').pop();
  return extension ? extension.toUpperCase() : 'Unknown';
}

export function YouTubeShortsEligibilityCheckerClient() {
  const [channelType, setChannelType] = useState<YouTubeChannelType>('standard');
  const [video, setVideo] = useState<VideoFileDetails | null>(null);
  const [status, setStatus] = useState<'idle' | 'reading' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type && !file.type.startsWith('video/')) {
      setVideo(null);
      setStatus('error');
      setError('Choose a video file so your browser can read its metadata.');
      return;
    }

    setStatus('reading');
    setError(null);
    setVideo(null);

    const objectUrl = URL.createObjectURL(file);
    const videoElement = document.createElement('video');
    videoElement.preload = 'metadata';

    videoElement.onloadedmetadata = () => {
      const metadata = {
        durationSeconds: videoElement.duration,
        width: videoElement.videoWidth,
        height: videoElement.videoHeight,
      };

      URL.revokeObjectURL(objectUrl);

      if (
        !Number.isFinite(metadata.durationSeconds) ||
        metadata.durationSeconds < 0 ||
        !metadata.width ||
        !metadata.height
      ) {
        setStatus('error');
        setError('Your browser could not read a duration and both video dimensions from this file.');
        return;
      }

      setVideo({
        ...metadata,
        name: file.name,
        size: file.size,
        type: displayFileType(file),
      });
      setStatus('idle');
    };

    videoElement.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      setStatus('error');
      setError('This video format could not be read by your current browser. Try an MP4, WebM, or MOV file.');
    };

    videoElement.src = objectUrl;
  };

  const result = video ? getShortsEligibility(video, channelType) : null;

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-muted/20 p-4 sm:p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <h2 className="font-semibold">Private, in-browser file check</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The selected file never leaves your device. This tool only asks your browser for video metadata; it does not upload, store, or scan the video.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <ToolInput
          label="Choose a video file"
          required
          description="MP4, WebM, MOV, or another video format your browser can read"
          error={error}
        >
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="block w-full cursor-pointer rounded-lg border border-input bg-transparent px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
          />
        </ToolInput>
        <ToolInput
          label="Channel type"
          description="The categorization date differs for Official Artist Channels"
        >
          <Select
            value={channelType}
            onChange={(event) => setChannelType(event.target.value as YouTubeChannelType)}
            options={[
              { value: 'standard', label: 'Standard YouTube channel' },
              { value: 'official-artist', label: 'Official Artist Channel' },
            ]}
          />
        </ToolInput>
      </section>

      {status === 'reading' && (
        <div className="flex items-center gap-2 rounded-lg border p-4 text-sm text-muted-foreground">
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          Reading local video metadata…
        </div>
      )}

      {result && video && (
        <ToolOutput title="Shorts format result">
          <div className="space-y-5">
            <section className={`rounded-xl border p-4 sm:p-5 ${result.likelyShort ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-amber-500/40 bg-amber-500/5'}`}>
              <div className="flex gap-3">
                {result.likelyShort ? (
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                ) : (
                  <AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                )}
                <div>
                  <h2 className="font-semibold">
                    {result.likelyShort ? 'Likely to be categorized as a Short' : 'Likely to remain long-form'}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{result.reason}</p>
                </div>
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="mt-1 font-semibold">{formatVideoDuration(video.durationSeconds)}</p>
                <p className={`mt-1 text-xs ${result.isWithinDurationLimit ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>
                  {result.isWithinDurationLimit ? 'Within 3-minute limit' : 'Over 3-minute limit'}
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Dimensions</p>
                <p className="mt-1 font-semibold">{video.width} × {video.height}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formatAspectRatio(video.width, video.height)} aspect ratio</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Orientation</p>
                <p className="mt-1 font-semibold capitalize">{result.orientation}</p>
                <p className={`mt-1 text-xs ${result.isSquareOrVertical ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>
                  {result.isSquareOrVertical ? 'Square or vertical' : 'Wider than tall'}
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">File details</p>
                <p className="mt-1 font-semibold">{video.type}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formatFileSize(video.size)}</p>
              </div>
            </section>

            <section className="rounded-xl border p-4 sm:p-5">
              <h3 className="font-semibold">Before you upload</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>This is a format check, not a guarantee of reach, monetization, or policy approval.</li>
                <li>The tool cannot inspect music rights, copyright claims, or Content ID status inside your file.</li>
                <li>For a standard channel, YouTube&apos;s current rule applies to square or vertical uploads up to three minutes. Official Artist Channels have a separate effective date.</li>
              </ul>
            </section>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileVideo className="size-4" aria-hidden="true" />
              Checked locally: <span className="truncate font-medium text-foreground">{video.name}</span>
            </div>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-shorts-eligibility-checker" />
    </div>
  );
}

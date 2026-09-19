'use client';

import { useMemo, useState } from 'react';
import { Clock3, Gauge, HardDrive, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { RelatedTools } from '@/components/tools/related-tools';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import {
  bytesToSize,
  calculateRequiredUploadSpeed,
  calculateUploadTime,
  formatDuration,
  sizeToBytes,
  type FileSizeUnit,
} from '@/lib/youtube/upload-time';

type CalculatorMode = 'time' | 'speed';

const speedPresets = [5, 10, 25, 50, 100, 500];

function numberFromInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatMbps(value: number): string {
  return `${value.toLocaleString('en-US', { maximumFractionDigits: 1 })} Mbps`;
}

export function YouTubeUploadTimeCalculatorClient() {
  const [mode, setMode] = useState<CalculatorMode>('time');
  const [fileSize, setFileSize] = useState('10');
  const [fileSizeUnit, setFileSizeUnit] = useState<FileSizeUnit>('GB');
  const [uploadSpeed, setUploadSpeed] = useState('100');
  const [efficiency, setEfficiency] = useState('80');
  const [targetMinutes, setTargetMinutes] = useState('30');
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const sizeValue = numberFromInput(fileSize);
  const sizeBytes = sizeToBytes(sizeValue, fileSizeUnit);
  const speedValue = numberFromInput(uploadSpeed);
  const efficiencyValue = numberFromInput(efficiency);
  const targetSeconds = numberFromInput(targetMinutes) * 60;

  const estimate = useMemo(
    () => calculateUploadTime(sizeBytes, speedValue, efficiencyValue),
    [efficiencyValue, sizeBytes, speedValue],
  );
  const requiredSpeed = useMemo(
    () => calculateRequiredUploadSpeed(sizeBytes, targetSeconds, efficiencyValue),
    [efficiencyValue, sizeBytes, targetSeconds],
  );

  const isValid = sizeBytes > 0 && efficiencyValue > 0 && (mode === 'time' ? speedValue > 0 : targetSeconds > 0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(`${file.name} (${(file.size / 1_000_000).toFixed(2)} MB)`);
    setFileSize(String(bytesToSize(file.size, fileSizeUnit).toFixed(2)));
    setError(null);
    setShowResult(false);
    event.target.value = '';
  };

  const updateUnit = (unit: FileSizeUnit) => {
    const currentBytes = sizeToBytes(sizeValue, fileSizeUnit);
    setFileSize(currentBytes > 0 ? String(bytesToSize(currentBytes, unit).toFixed(2)) : '');
    setFileSizeUnit(unit);
    setShowResult(false);
  };

  const calculate = () => {
    if (!isValid) {
      setError(mode === 'time' ? 'Enter a file size, upload speed, and efficiency.' : 'Enter a file size, target time, and efficiency.');
      setShowResult(false);
      return;
    }

    setError(null);
    setShowResult(true);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-muted/20 p-4 sm:p-5">
        <div className="flex gap-3">
          <Upload className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <h2 className="font-semibold">Choose an estimate</h2>
            <p className="mt-1 text-sm text-muted-foreground">Calculate a transfer time from your upload speed, or work backward from a deadline to find the required Mbps.</p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Button variant={mode === 'time' ? 'default' : 'outline'} onClick={() => { setMode('time'); setShowResult(false); }}>
            <Clock3 className="size-4" aria-hidden="true" />
            Upload time
          </Button>
          <Button variant={mode === 'speed' ? 'default' : 'outline'} onClick={() => { setMode('speed'); setShowResult(false); }}>
            <Gauge className="size-4" aria-hidden="true" />
            Speed by deadline
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <ToolInput label="Video file size" required description="Use the final exported file size for the closest estimate" error={error}>
          <div className="flex gap-2">
            <Input type="number" min="0" step="0.01" value={fileSize} onChange={(event) => { setFileSize(event.target.value); setFileName(null); setShowResult(false); }} placeholder="10" inputMode="decimal" />
            <Select
              value={fileSizeUnit}
              onChange={(event) => updateUnit(event.target.value as FileSizeUnit)}
              options={[
                { value: 'B', label: 'Bytes' },
                { value: 'KB', label: 'KB' },
                { value: 'MB', label: 'MB' },
                { value: 'GB', label: 'GB' },
              ]}
              className="w-28 shrink-0"
              aria-label="File size unit"
            />
          </div>
        </ToolInput>

        <ToolInput label="Read size from a local file" description="Only reads file size in your browser; nothing is uploaded">
          <Input type="file" onChange={handleFileChange} className="file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground" />
          {fileName && <p className="mt-1 text-xs text-muted-foreground">Using: {fileName}</p>}
        </ToolInput>

        {mode === 'time' ? (
          <ToolInput label="Upload speed" required description="Use upload Mbps, not download Mbps">
            <Input type="number" min="0" step="0.1" value={uploadSpeed} onChange={(event) => { setUploadSpeed(event.target.value); setShowResult(false); }} placeholder="100" inputMode="decimal" />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {speedPresets.map((preset) => (
                <button key={preset} type="button" onClick={() => { setUploadSpeed(String(preset)); setShowResult(false); }} className="rounded-md border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
                  {preset} Mbps
                </button>
              ))}
            </div>
          </ToolInput>
        ) : (
          <ToolInput label="Target upload time (minutes)" required description="How quickly should the file finish transferring?">
            <Input type="number" min="0" step="1" value={targetMinutes} onChange={(event) => { setTargetMinutes(event.target.value); setShowResult(false); }} placeholder="30" inputMode="decimal" />
          </ToolInput>
        )}

        <ToolInput label="Connection efficiency" required description="80% is a practical starting point for planning">
          <div className="flex items-center gap-3">
            <Input type="range" min="1" max="100" step="1" value={efficiency} onChange={(event) => { setEfficiency(event.target.value); setShowResult(false); }} aria-label="Connection efficiency percentage" className="flex-1" />
            <span className="w-14 rounded-md border px-2 py-1 text-center text-sm font-medium">{efficiencyValue}%</span>
          </div>
        </ToolInput>
      </section>

      <Button className="w-full" onClick={calculate}>
        {mode === 'time' ? 'Calculate upload time' : 'Calculate required speed'}
      </Button>

      {showResult && (
        <ToolOutput title={mode === 'time' ? 'Upload time estimate' : 'Required upload speed'}>
          {mode === 'time' && estimate ? (
            <div className="space-y-5">
              <section className="rounded-xl border bg-muted/20 p-5 text-center">
                <p className="text-sm text-muted-foreground">Practical estimate at {estimate.efficiencyPercent}% efficiency</p>
                <p className="mt-1 text-3xl font-bold tracking-tight">{formatDuration(estimate.practicalSeconds)}</p>
                <p className="mt-2 text-xs text-muted-foreground">Ideal transfer: {formatDuration(estimate.idealSeconds)} at {formatMbps(estimate.uploadSpeedMbps)}</p>
              </section>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">Practical planning range</p>
                  <p className="mt-1 text-lg font-semibold">{formatDuration(estimate.practicalRangeSeconds.minimum)}–{formatDuration(estimate.practicalRangeSeconds.maximum)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Assumes roughly 90–70% sustained efficiency</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">Data to transfer</p>
                  <p className="mt-1 text-lg font-semibold">{(estimate.fileSizeBytes / 1_000_000_000).toFixed(2)} GB</p>
                  <p className="mt-1 text-xs text-muted-foreground">File size × 8 = bits on the wire</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">This is a transfer estimate. YouTube may need additional processing time after the upload completes, especially for higher-resolution videos.</p>
            </div>
          ) : requiredSpeed ? (
            <div className="space-y-5">
              <section className="rounded-xl border bg-muted/20 p-5 text-center">
                <p className="text-sm text-muted-foreground">Minimum planned upload speed</p>
                <p className="mt-1 text-3xl font-bold tracking-tight">{formatMbps(requiredSpeed)}</p>
                <p className="mt-2 text-xs text-muted-foreground">To move {(sizeBytes / 1_000_000_000).toFixed(2)} GB in {formatDuration(targetSeconds)} at {efficiencyValue}% efficiency</p>
              </section>
              <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                Add headroom if the connection is shared. Other uploads, Wi-Fi conditions, congestion, and processing time can make a real deadline longer than the file-transfer estimate.
              </div>
            </div>
          ) : null}
        </ToolOutput>
      )}

      <section className="rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground">
        <div className="flex gap-3">
          <HardDrive className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <p>Local file size reading is private: the browser reads the byte count, and the video itself never leaves your device.</p>
        </div>
      </section>

      <RelatedTools currentSlug="youtube-upload-time-calculator" />
    </div>
  );
}

import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How long does it take to upload a 10GB video to YouTube?',
    a: 'It depends on upload speed and connection efficiency. At 100 Mbps, a 10GB file takes about 13 minutes 20 seconds at ideal speed, or about 16 minutes 40 seconds at 80% efficiency. Enter your own speed to get a better estimate.',
  },
  {
    q: 'What upload speed do I need for a 4K YouTube video?',
    a: 'There is no single speed because 4K file sizes vary by codec, frame rate, bitrate, and length. Enter the exported file size and your deadline in reverse mode to calculate the Mbps you need.',
  },
  {
    q: 'Does upload speed or download speed control YouTube upload time?',
    a: 'Upload speed controls how quickly your file can leave your connection. Download speed is a separate direction and does not determine the upload estimate.',
  },
  {
    q: 'Why is my real upload slower than the ideal calculation?',
    a: 'The ideal formula assumes the full advertised upload speed is available continuously. Wi-Fi, network congestion, router overhead, other devices, and server-side variation reduce the practical rate, so this calculator includes an efficiency input and a 70–90% planning range.',
  },
  {
    q: 'Does the local file picker upload my video?',
    a: 'No. The file picker reads only the local file size in your browser. The video is not sent to yttools.pro.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>How long will your YouTube upload take?</h2>
      <p>
        The answer comes from three numbers: exported file size, upload speed, and the share of that speed
        your connection can sustain. The core calculation is{' '}
        <strong>file size in bytes × 8 ÷ upload speed in bits per second</strong>. This tool then adjusts
        the ideal result with your efficiency percentage so a 10GB video estimate is closer to a real
        upload than a headline ISP speed alone.
      </p>
      <p>
        You can type a size or choose a local file. The local picker reads its byte count in your browser;
        it does not upload the file or inspect your video content.
      </p>

      <h2>YouTube upload-time examples</h2>
      <table>
        <thead>
          <tr>
            <th>File size</th>
            <th>Upload speed</th>
            <th>Ideal time</th>
            <th>At 80% efficiency</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1GB</td><td>25 Mbps</td><td>5m 20s</td><td>6m 40s</td></tr>
          <tr><td>10GB</td><td>100 Mbps</td><td>13m 20s</td><td>16m 40s</td></tr>
          <tr><td>50GB</td><td>500 Mbps</td><td>13m 20s</td><td>16m 40s</td></tr>
        </tbody>
      </table>
      <p>
        These examples use decimal units: 1GB = 1,000,000,000 bytes and 1Mbps = 1,000,000 bits per
        second. Your editor may display file sizes differently, so use the actual exported file size when
        timing a scheduled upload.
      </p>

      <h2>Use reverse mode when you have a deadline</h2>
      <p>
        If your video must finish uploading in 30 minutes, switch to the reverse mode, enter the file size
        and target time, then use the required Mbps result as your minimum planning speed. Add headroom for
        other people or devices sharing the connection; the result is not a guarantee from YouTube or your
        ISP.
      </p>
      <p>
        For a repeatable publishing workflow, pair this with the{' '}
        <Link href="/youtube-upload-frequency-calculator">Upload Frequency Calculator</Link>. If your
        export is for a vertical Short, check the format first with the{' '}
        <Link href="/youtube-shorts-eligibility-checker">Shorts Eligibility Checker</Link>.
      </p>

      <h2>Upload speed versus YouTube video bitrate</h2>
      <p>
        Your upload speed controls the transfer from your device to YouTube. Video bitrate controls how
        much data your editor writes into the exported file over time. A high-bitrate 4K export can be much
        larger than a compressed 4K export, so resolution alone cannot predict upload duration.
      </p>
      <p>
        YouTube publishes recommended encoding settings and reference video bitrates in its{' '}
        <a
          href="https://support.google.com/youtube/answer/1722171?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          official upload encoding guidance
        </a>
        . Use the final file size from your chosen export settings for the most useful estimate.
      </p>

      <h2>What can make an upload slower?</h2>
      <ul>
        <li>Wi-Fi signal quality or a busy local network</li>
        <li>Other uploads, video calls, cloud sync, or backups running at the same time</li>
        <li>ISP congestion or a changing upstream route</li>
        <li>Browser, device, or YouTube processing behavior after transfer</li>
      </ul>
      <p>
        The calculator estimates the file transfer. YouTube may still need extra time to process higher
        resolutions after the upload reaches its servers.
      </p>
    </>
  );
}

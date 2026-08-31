/**
 * Download a remote image by fetching it as a blob so the browser saves the file
 * instead of navigating to it. YouTube's image CDN (googleusercontent / ytimg)
 * allows cross-origin GETs, so this works client-side without a proxy.
 *
 * Falls back to opening the image in a new tab if the fetch is blocked (e.g. CORS).
 */
export async function downloadImageFromUrl(url: string, filename: string): Promise<void> {
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error(`Image request failed: ${res.status}`);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch {
    // CORS or network failure — open in a new tab so the user can save manually.
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

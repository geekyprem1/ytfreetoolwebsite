export function getThumbnailUrls(videoId: string) {
  const base = `https://img.youtube.com/vi/${videoId}`;
  return {
    max: { url: `${base}/maxresdefault.jpg`, width: 1280, height: 720, quality: 'max' },
    hd: { url: `${base}/hqdefault.jpg`, width: 480, height: 360, quality: 'hd' },
    sd: { url: `${base}/sddefault.jpg`, width: 640, height: 480, quality: 'sd' },
    hq: { url: `${base}/hqdefault.jpg`, width: 480, height: 360, quality: 'hq' },
    mq: { url: `${base}/mqdefault.jpg`, width: 320, height: 180, quality: 'mq' },
  };
}

export type ThumbnailQuality = keyof ReturnType<typeof getThumbnailUrls>;

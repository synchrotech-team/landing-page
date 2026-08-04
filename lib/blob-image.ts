// Vercel Blob objects are public — served straight from the CDN edge, no proxy needed.
export function resolveImageSrc(url: string): string {
  return url;
}

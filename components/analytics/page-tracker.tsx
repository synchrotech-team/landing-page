'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function PageTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // ponytail: ignore admin panel navigation to keep public analytics clean
    if (!pathname || pathname.startsWith('/admin') || lastPath.current === pathname) {
      return;
    }
    lastPath.current = pathname;

    let visitorId = typeof window !== 'undefined' ? localStorage.getItem('synchro_vid') : null;
    if (!visitorId && typeof window !== 'undefined') {
      visitorId = 'v_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      localStorage.setItem('synchro_vid', visitorId);
    }

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname, visitorId }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}

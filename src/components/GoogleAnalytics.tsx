'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (command: string, id: string, config?: Record<string, unknown>) => void;
  }
}

function AnalyticsTracker({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      window.gtag('config', gaId, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, gaId]);

  return null;
}

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker gaId={gaId} />
    </Suspense>
  );
}

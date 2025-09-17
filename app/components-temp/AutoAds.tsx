// app/components/AutoAds.tsx
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AutoAds() {
  useEffect(() => {
    // Initialize Google Auto Ads
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-6736999079825175",
          enable_page_level_ads: true
        });
      } catch (error) {
        console.error('Auto Ads initialization error:', error);
      }
    }
  }, []);

  return null; // This component doesn't render anything
}
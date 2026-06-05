'use client';

import Script from 'next/script';

/**
 * HubSpot Tracking Code — loads the tracking pixel ONLY.
 * The chat widget (conversations) is disabled via hsConversationsSettings
 * to avoid loading ~200KB+ of unused JS on every page.
 *
 * Portal ID: 245067165 (The Rig Doctor)
 */

const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

export default function HubSpotTracking() {
  if (!PORTAL_ID) return null;

  return (
    <>
      {/* Disable chat widget before HubSpot script loads */}
      <Script
        id="hs-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.hsConversationsSettings={loadImmediately:false,disableWidget:true};`,
        }}
      />
      <Script
        id="hs-script-loader"
        src={`https://js.hs-scripts.com/${PORTAL_ID}.js`}
        strategy="lazyOnload"
      />
    </>
  );
}

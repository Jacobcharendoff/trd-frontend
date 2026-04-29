import Script from 'next/script';

/**
 * HubSpot Tracking Code — loads the hs-scripts tracking pixel
 * so HubSpot can track page views, identify contacts, and attribute
 * conversions on the headless frontend.
 *
 * Portal ID: 245067165 (The Rig Doctor)
 *
 * Loads only when NEXT_PUBLIC_HUBSPOT_PORTAL_ID is set.
 * Drop this into layout.tsx as a sibling to Analytics.
 */

const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

export default function HubSpotTracking() {
  if (!PORTAL_ID) return null;

  return (
    <Script
      id="hs-script-loader"
      src={`https://js.hs-scripts.com/${PORTAL_ID}.js`}
      strategy="afterInteractive"
    />
  );
}

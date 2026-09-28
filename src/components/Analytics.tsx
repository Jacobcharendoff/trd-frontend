import Script from 'next/script';

/**
 * Google tag: GA4 property "THE RIG DOCTOR INC." plus the Google Ads account linked in Shopify.
 * Env vars override the defaults if they ever change.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-1FK63P86TN';
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-16896877526';

export default function Analytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          gtag('config', '${ADS_ID}');
        `}
      </Script>
    </>
  );
}

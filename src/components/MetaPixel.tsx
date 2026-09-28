import Script from 'next/script';

/**
 * Meta (Facebook/Instagram) Pixel base code.
 * Pixel 302484154666519 (override with NEXT_PUBLIC_META_PIXEL_ID).
 * The first PageView fires here; later client-side navigations are sent by RouteTracker.
 */
// Same pixel Shopify's Facebook & Instagram app uses at checkout, so site and checkout events land together.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '302484154666519';

export default function MetaPixel() {
  if (!PIXEL_ID) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
    </Script>
  );
}

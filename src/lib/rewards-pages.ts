/** Tiny self-contained HTML pages for the unsubscribe and revoke links. */

export function simplePage(title: string, body: string, status = 200) {
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>${title} | The Rig Doctor</title>
<style>
  body{margin:0;background:#000;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px;box-sizing:border-box}
  main{max-width:460px;text-align:center}
  h1{font-size:34px;letter-spacing:-1px;margin:0 0 14px}
  p{color:#a1a1a6;line-height:1.6;font-size:16px;margin:0 0 22px}
  button,a.btn{display:inline-block;border:0;border-radius:999px;padding:15px 30px;font-size:16px;font-weight:700;color:#fff;cursor:pointer;text-decoration:none;background:linear-gradient(90deg,#00A85A 0%,#0071E3 50%,#8E3FD9 100%)}
  a{color:#fff}
</style></head><body><main>${body}</main></body></html>`;
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex', 'Cache-Control': 'no-store' },
  });
}

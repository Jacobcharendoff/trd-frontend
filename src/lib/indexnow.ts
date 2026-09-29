// IndexNow tells Bing (plus Yandex, Seznam and Naver) when pages change. No account needed.
// The key file is public/<INDEXNOW_KEY>.txt, served at https://www.therigdr.com/<INDEXNOW_KEY>.txt
export const INDEXNOW_KEY = 'a9f317c133743cc65e02cc22709ba3ca';
export const SITE_HOST = 'www.therigdr.com';

export async function submitToIndexNow(
  urls: string[]
): Promise<{ ok: boolean; status: number }> {
  if (urls.length === 0) return { ok: true, status: 204 };
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
    cache: 'no-store',
  });
  return { ok: res.ok, status: res.status };
}

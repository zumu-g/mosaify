import { put, del, list } from '@vercel/blob';

export async function uploadImage(
  filename: string,
  data: Buffer | ReadableStream,
  contentType: string
): Promise<{ url: string; pathname: string }> {
  const blob = await put(filename, data, {
    access: 'public',
    contentType,
  });
  return { url: blob.url, pathname: blob.pathname };
}

export async function uploadJson(
  filename: string,
  data: Record<string, unknown>
): Promise<{ url: string }> {
  const blob = await put(filename, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
  });
  return { url: blob.url };
}

export async function getJsonData(url: string): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function deleteImage(url: string): Promise<void> {
  await del(url);
}

export async function listBlobs(prefix?: string) {
  const result = await list({ prefix });
  return result.blobs;
}

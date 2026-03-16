'use client';

import { useState, useCallback, useRef } from 'react';
import { UploadResult } from '@/types';

interface UseUploadReturn {
  uploading: boolean;
  progress: number;
  error: string | null;
  result: UploadResult | null;
  uploadFile: (file: File) => Promise<UploadResult | null>;
  reset: () => void;
}

export function useUpload(): UseUploadReturn {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const reset = useCallback(() => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;
    }
    setUploading(false);
    setProgress(0);
    setError(null);
    setResult(null);
  }, []);

  const uploadFile = useCallback(async (file: File): Promise<UploadResult | null> => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Client-side validation
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File size must be under 10MB');
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Only JPG, PNG, and WebP files are allowed');
      }

      // Get image dimensions while uploading (parallel)
      const dimensionsPromise = getImageDimensions(file);

      // Upload via XHR for real progress tracking
      const formData = new FormData();
      formData.append('file', file);

      const response = await new Promise<{ url: string; pathname: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const pct = Math.round((e.loaded / e.total) * 90); // 0-90% for upload
            setProgress(pct);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch {
              reject(new Error('Invalid server response'));
            }
          } else {
            try {
              const data = JSON.parse(xhr.responseText);
              reject(new Error(data.error || 'Upload failed'));
            } catch {
              reject(new Error(`Upload failed (${xhr.status})`));
            }
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Network error during upload')));
        xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
      });

      setProgress(95);

      const dimensions = await dimensionsPromise;

      const uploadResult: UploadResult = {
        id: response.pathname.split('/').pop()?.split('.')[0] || response.pathname,
        url: response.url,
        width: dimensions.width,
        height: dimensions.height,
      };

      setProgress(100);
      setResult(uploadResult);
      await new Promise(r => setTimeout(r, 400));
      setUploading(false);
      xhrRef.current = null;
      return uploadResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      setUploading(false);
      xhrRef.current = null;
      return null;
    }
  }, []);

  return { uploading, progress, error, result, uploadFile, reset };
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      reject(new Error('Failed to read image dimensions'));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
}

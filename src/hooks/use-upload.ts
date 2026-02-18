'use client';

import { useState, useCallback } from 'react';
import { upload } from '@vercel/blob/client';
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

  const reset = useCallback(() => {
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

      // Upload via Vercel Blob client
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      // Get image dimensions client-side
      const dimensions = await getImageDimensions(file);

      const uploadResult: UploadResult = {
        id: blob.pathname.split('/').pop()?.split('.')[0] || blob.pathname,
        url: blob.url,
        width: dimensions.width,
        height: dimensions.height,
      };

      setResult(uploadResult);
      setProgress(100);
      return uploadResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  return { uploading, progress, error, result, uploadFile, reset };
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
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

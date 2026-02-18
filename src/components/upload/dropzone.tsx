'use client';

import { useCallback, useState, useRef } from 'react';
import { useUpload } from '@/hooks/use-upload';
import { UploadResult } from '@/types';

interface DropzoneProps {
  onUploadComplete: (result: UploadResult) => void;
}

export function Dropzone({ onUploadComplete }: DropzoneProps) {
  const { uploading, progress, error, uploadFile } = useUpload();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      const result = await uploadFile(file);
      if (result) {
        onUploadComplete(result);
      }
    },
    [uploadFile, onUploadComplete]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = () => inputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
        isDragging
          ? 'border-brand-500 bg-brand-50'
          : 'border-gray-300 hover:border-brand-400 hover:bg-brand-50/50'
      } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-brand-100 p-4">
          <svg
            className="h-8 w-8 text-brand-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>

        {uploading ? (
          <>
            <p className="text-sm font-medium text-gray-700">Uploading...</p>
            <div className="h-2 w-48 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-brand-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-base font-semibold text-gray-700">
                Drop your photo here
              </p>
              <p className="mt-1 text-sm text-gray-500">
                or click to browse — JPG, PNG, WebP up to 10MB
              </p>
            </div>
          </>
        )}

        {error && (
          <p className="text-sm font-medium text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}

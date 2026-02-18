'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
        Error
      </p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900">
        Something went wrong
      </h1>
      <p className="mt-2 text-gray-600">
        An unexpected error occurred. Please try again.
      </p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}

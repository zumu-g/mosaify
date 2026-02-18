'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { DownloadCard } from '@/components/success/download-card';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';

interface SessionData {
  imageId: string;
  style: string;
  sizeTier: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    async function fetchSession() {
      try {
        const response = await fetch(`/api/session?session_id=${sessionId}`);
        if (!response.ok) throw new Error('Failed to fetch session');
        const data = await response.json();
        setSession(data);
      } catch {
        setError('Could not verify your payment. Please contact support.');
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-gray-600">Verifying payment...</p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
        <p className="text-red-600">{error || 'Something went wrong'}</p>
        <Link href="/" className="text-sm text-brand-600 hover:text-brand-700">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <DownloadCard
        mosaicId={session.imageId}
        style={session.style}
        sizeTier={session.sizeTier}
      />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

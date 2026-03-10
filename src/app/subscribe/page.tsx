import Link from 'next/link';
import { SubscribePayment } from '@/components/SubscribePayment';

export default function SubscribePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-2 border-[var(--color-ink)] bg-white/90 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-[var(--color-ink)]"
            aria-label="홈으로"
          >
            ← 홈
          </Link>
          <h1 className="flex-1 text-center font-headline font-bold text-lg">
            구독·결제
          </h1>
          <span className="w-10" aria-hidden />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <SubscribePayment />
        <p className="mt-6 text-center text-sm text-gray-500">
          © JP 타임즈 · 토스페이먼츠 결제
        </p>
      </main>
    </div>
  );
}

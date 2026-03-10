'use client';

const TOSSPAYMENTS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSSPAYMENTS_CLIENT_KEY ?? '';

export function SubscribePayment() {
  return (
    <div className="space-y-6">
      <p className="text-center text-gray-600">
        JP 타임즈 구독을 통해 매주 초등·중등·고등 맞춤 기사를 읽을 수 있습니다.
      </p>

      {!TOSSPAYMENTS_CLIENT_KEY ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-medium">토스페이먼츠 연동 준비</p>
          <p className="mt-1">
            환경 변수 <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_TOSSPAYMENTS_CLIENT_KEY</code>를
            설정한 뒤, <code className="bg-amber-100 px-1 rounded">@tosspayments/tosspayments-sdk</code>를
            연동하면 결제 기능을 사용할 수 있습니다.
          </p>
          <a
            href="https://docs.tosspayments.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            토스페이먼츠 개발자센터 →
          </a>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 text-center">
          <p>토스페이먼츠 클라이언트 키가 설정되었습니다.</p>
          <p className="mt-1">결제 요청 코드를 추가하면 구독·결제가 가능합니다.</p>
        </div>
      )}

    </div>
  );
}

'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          読み込みエラー
        </h2>
        <p className="text-gray-600 mb-6">
          アニメデータの読み込みに失敗しました。
        </p>
        <button
          onClick={reset}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          再読み込み
        </button>
      </div>
    </div>
  );
}
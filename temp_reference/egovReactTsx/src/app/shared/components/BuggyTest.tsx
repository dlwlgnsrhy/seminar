import React, { useState } from 'react';

/**
 * ErrorBoundary 테스트를 위한 컴포넌트
 * 버튼을 클릭하면 의도적으로 에러를 발생시킵니다.
 */
export const BuggyTest = () => {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('의도적으로 발생시킨 에러입니다! (ErrorBoundary 테스트)');
  }

  return (
    <div className="p-4 border border-red-300 rounded bg-red-50 text-center my-4">
      <p className="mb-2 text-red-800 font-medium">ErrorBoundary 테스트</p>
      <button
        onClick={() => setError(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
      >
        에러 발생
      </button>
    </div>
  );
};

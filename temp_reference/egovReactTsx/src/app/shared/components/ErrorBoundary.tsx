import React, { ReactNode } from 'react';
/**
 * 전역 에러 처리 컴포넌트
 * - 컴포넌트 렌더링 중 에러 발생 시 대체 UI를 렌더링
 * - API 통신 에러는 별도 (Query Error Handling으로 분리)
 */
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const ERROR_MESSAGE = '문제가 발생했습니다.';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // React Error Boundary 공식 메서드
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Uncaught error:', error, info);
    // TODO: Add custom logger service
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="flex flex-col items-center justify-center h-screen text-center"
        >
          <h1 className="text-xl font-semibold mb-2">{ERROR_MESSAGE}</h1>
          <p className="text-gray-500 md-4">잠시 후 다시 시도해주세요.</p>

          {/* 개발 환경일 때만 상세 에러 메시지 표시 */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre className="text-sm text-red-500 bg-gray-50 p-3 rounded">
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={this.handleReset}
            // onClick ={()=> navigate(0)} 으로도 사용가능 react-router-dom 6.4+에서 지원 (soft reload)
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
          >
            새로고침
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

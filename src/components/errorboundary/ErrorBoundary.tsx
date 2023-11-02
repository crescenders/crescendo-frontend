import { ErrorFallbackProps } from '@components/errorboundary/ErrorFallback';
import { AxiosError } from 'axios';
import type { ComponentType, PropsWithChildren } from 'react';
import { Component } from 'react';

type ErrorBoundaryProps = {
  fallback: ComponentType<ErrorFallbackProps>;
  reset?: () => void;
};

type ErrorBoundaryState = {
  error: AxiosError | null;
  shouldRethrow: boolean;
};

/**
 * Suspense를 감싸는 컴포넌트가 에러를 발생했을 때 처리하는 컴포넌트입니다.
 * 에러를 다시 throw 할 지 결정하는 shouldRethrow state가 포함되어 있습니다.
 */

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      shouldRethrow: false,
      error: null,
    };
  }

  // render 되기 전 error 정보를 state에 저장
  static getDerivedStateFromError(error: AxiosError): ErrorBoundaryState {
    if (error.response?.status === 404) {
      return {
        shouldRethrow: true,
        error,
      };
    }
    return { shouldRethrow: false, error };
  }

  resetError() {
    if (this.props.reset) {
      this.props.reset();
    }

    this.setState({ error: null, shouldRethrow: false });
  }

  render() {
    const { fallback: Fallback, children } = this.props;
    const { error, shouldRethrow } = this.state;

    if (shouldRethrow) {
      throw error;
    }

    if (error) {
      return (
        <Fallback error={error} resetErrorBoundary={() => this.resetError()} />
      );
    }

    return children;
  }
}

export default ErrorBoundary;

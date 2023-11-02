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

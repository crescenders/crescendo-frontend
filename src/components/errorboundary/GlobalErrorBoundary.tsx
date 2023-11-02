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
};

class GlobalErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: AxiosError): ErrorBoundaryState {
    return { error };
  }

  resetError() {
    if (this.props.reset) {
      this.props.reset();
    }

    this.setState({ error: null });
  }

  render() {
    const { fallback: Fallback, children } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <Fallback error={error} resetErrorBoundary={() => this.resetError()} />
      );
    }

    return children;
  }
}

export default GlobalErrorBoundary;

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-8 max-w-md w-full text-center">
            <AlertTriangle className="size-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-400 mb-6">
              We encountered an unexpected error. Please try refreshing the
              page.
            </p>
            <button
              onClick={this.handleRetry}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors mx-auto"
            >
              <RefreshCw className="size-4" />
              Try Again
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-gray-300 cursor-pointer">
                  Error Details
                </summary>
                <pre className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

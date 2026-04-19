import { Suspense, ComponentType } from "react";
import { Loader2 } from "lucide-react";

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyWrapper({ children, fallback }: LazyWrapperProps) {
  const defaultFallback = (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="size-8 text-red-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>;
}

export function withLazyLoading<T extends object>(
  Component: ComponentType<T>,
  fallback?: React.ReactNode,
) {
  const WrappedComponent = (props: T) => (
    <LazyWrapper fallback={fallback}>
      <Component {...props} />
    </LazyWrapper>
  );

  WrappedComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

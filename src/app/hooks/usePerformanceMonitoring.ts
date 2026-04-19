import { useEffect, useRef } from "react";

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export function usePerformanceMonitoring() {
  const metricsRef = useRef<PerformanceMetrics>({});

  useEffect(() => {
    // Only run in production and if Performance API is available
    if (typeof window === "undefined" || !window.performance) return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case "paint":
            if (entry.name === "first-contentful-paint") {
              metricsRef.current.fcp = entry.startTime;
            }
            break;
          case "largest-contentful-paint":
            metricsRef.current.lcp = entry.startTime;
            break;
          case "first-input":
            metricsRef.current.fid =
              (entry as any).processingStart - entry.startTime;
            break;
          case "layout-shift":
            if (!(entry as any).hadRecentInput) {
              metricsRef.current.cls =
                (metricsRef.current.cls || 0) + (entry as any).value;
            }
            break;
        }
      }
    });

    try {
      observer.observe({
        entryTypes: [
          "paint",
          "largest-contentful-paint",
          "first-input",
          "layout-shift",
        ],
      });
    } catch (e) {
      console.warn("Performance monitoring not fully supported");
    }

    // Measure TTFB
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    if (navigation) {
      metricsRef.current.ttfb =
        navigation.responseStart - navigation.requestStart;
    }

    return () => observer.disconnect();
  }, []);

  const logMetrics = () => {
    console.log("Performance Metrics:", metricsRef.current);
  };

  return { metrics: metricsRef.current, logMetrics };
}

// Web Vitals reporting function
export function reportWebVitals(metric: any) {
  // Send to analytics service
  console.log("Web Vital:", metric);

  // Example: Send to Google Analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", metric.name, {
      value: Math.round(metric.value),
      event_category: "Web Vitals",
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

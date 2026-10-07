/** Document-scoped Web Vitals: never relabel initial-load metrics as a soft route. */
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";
export function collectVitals(report: (metric: Record<string, unknown>) => void): void {
  const record = (metric: Metric) =>
    report({
      name: metric.name.toLowerCase(),
      value: metric.value,
      rating: metric.rating,
      metricId: metric.id,
      navigationType: metric.navigationType,
    });
  onCLS(record);
  onFCP(record);
  onINP(record);
  onLCP(record);
  onTTFB(record);
}

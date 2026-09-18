const FIRST_PERFORMANCE_CUTOFF_AT = Date.parse("2026-10-22T00:00:00+09:00");

export function isFirstPerformanceOpen(now = Date.now()) {
  return now < FIRST_PERFORMANCE_CUTOFF_AT;
}

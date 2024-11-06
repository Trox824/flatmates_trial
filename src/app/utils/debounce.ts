// utils/debounce.ts

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

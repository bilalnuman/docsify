<<<<<<< HEAD
=======
// utils/debounce.ts
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

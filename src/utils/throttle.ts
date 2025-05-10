/**
 * A function to limit the calls or invocakation till the limit time passes.
 *
 * @param delay (number) - Time to limit the call in ms(Milliseconds).
 * @param fn (function) - Which needs to be limited.
 * @returns A throttle version of function.
 *
 */

export function throttle<T extends (...arg: unknown[]) => void>(
  fn: T,
  delay: number
): T {
  let lastCall = 0;
  return function (...args: Parameters<T>) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  } as T;
}

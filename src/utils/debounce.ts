/**
 * To limit the call after some time of delay from last action or last function call.
 *
 * @param {function} fn - function to run after the last action delay.
 * @param {number} delay - delay in ms(milliseconds).
 * @returns {function} A delay version of the function.
 */

export function debounce(fn: (...args: unknown[]) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

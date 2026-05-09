export const fetchWithTimeout = (promise, timeout = 8000) => {
  let timeoutId;

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = globalThis.setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    globalThis.clearTimeout(timeoutId);
  });
};

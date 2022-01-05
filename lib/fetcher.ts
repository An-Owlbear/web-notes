export const fetcher = <T>(input: RequestInfo, init?: RequestInit | undefined): Promise<T> =>
  fetch(input, init).then(res => res.json())
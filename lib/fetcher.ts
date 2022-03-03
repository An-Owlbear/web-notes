export interface RequestError extends Error {
  status: number;
}

export const fetcher = async <T>(input: RequestInfo, init?: RequestInit | undefined): Promise<T> => {
  const res = await fetch(input, init);

  // Returns error information if unsuccessful
  if (!res.ok) {
    const error = new Error('An error has occurred whilst fetching the message') as RequestError;
    error.status = res.status;
    throw error;
  }

  return res.json();
}
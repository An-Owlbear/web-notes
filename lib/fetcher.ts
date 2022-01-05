import { Note } from './apiModels';

export const getNotes = (input: RequestInfo, init?: RequestInit | undefined): Promise<Note[]> =>
  fetch(input, init).then(res => res.json())
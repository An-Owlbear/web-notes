export interface ApiNote {
  id: string;
  title: string;
  content: string;
}

export interface ApiError {
  error: string;
}

export interface NoteCreateResponse {
  id: string;
}
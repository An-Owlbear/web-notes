import type { NextApiResponse } from 'next'
import { Note } from '../../lib/apiModels';
import { getNotes } from '../../lib/dbUtils';

export default async function handler(req: Request, res: NextApiResponse<Note[]>) {
  const notes = await getNotes('temp');
  const responseNotes = notes.map(note => ({ id: note.id, title: note.title, content: note.content }))
  res.json(responseNotes);
};

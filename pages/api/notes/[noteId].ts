import { NextApiRequest, NextApiResponse } from 'next';
import { Note } from '../../../lib/apiModels';
import { getNote } from '../../../lib/dbUtils';

interface Request extends NextApiRequest {
  query: {
    noteId: string
  }
}

export default async function handler(req: Request, res: NextApiResponse<Note>) {
  const note = await getNote(req.query.noteId, 'temp');
  const responseNote = { id: note.id, title: note.title, content: note.content };
  res.json(responseNote);
}
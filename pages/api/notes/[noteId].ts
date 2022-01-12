import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { ApiError, Note } from '../../../lib/apiModels';
import { getNote } from '../../../lib/dbUtils';
import { Responses } from '../../../lib/Responses';

interface Request extends NextApiRequest {
  query: {
    noteId: string
  }
}

export default async function handler(req: Request, res: NextApiResponse<Note | ApiError>) {
  const session = await getSession({ req })
  if (!session || !session.user) {
    return res.status(401).send({ error: Responses.Unauthorized});
  }

  const note = await getNote(req.query.noteId);
  if (note.user_id != session.user.id) {
    return res.status(403).send({ error: Responses.Forbidden });
  }

  const responseNote = { id: note.id, title: note.title, content: note.content };
  res.json(responseNote);
}
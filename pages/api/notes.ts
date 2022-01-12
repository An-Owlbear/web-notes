import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { ApiError, Note } from '../../lib/apiModels';
import { getNotes } from '../../lib/dbUtils';
import { Responses } from '../../lib/Responses';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Note[] | ApiError>) {
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).send({ error: Responses.Unauthorized })
  }

  const notes = await getNotes(session.user.id);
  const responseNotes = notes.map(note => ({ id: note.id, title: note.title, content: note.content }))
  res.json(responseNotes);
};

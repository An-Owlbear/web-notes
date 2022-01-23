import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { ApiError, ApiNote } from '../../../lib/apiModels';
import { getNote } from '../../../lib/dbUtils';
import { Responses } from '../../../lib/Responses';

interface GetRequest extends NextApiRequest {
  query: {
    noteId: string
  }
}

export default async function handler(req: GetRequest, res: NextApiResponse<ApiNote | ApiError>) {
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
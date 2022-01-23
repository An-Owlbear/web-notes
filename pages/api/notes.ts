import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { ApiError, ApiNote, NoteCreateResponse } from '../../lib/apiModels';
import { createNote, getNotes } from '../../lib/dbUtils';
import { Responses } from '../../lib/Responses';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiNote[] | NoteCreateResponse | ApiError>) {
  if (req.method === 'GET') return await getHandler(req, res);
  else if (req.method === 'PUT') return await putHandler(req, res);
}

async function getHandler(req: NextApiRequest, res: NextApiResponse<ApiNote[] | ApiError>) {
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).send({ error: Responses.Unauthorized })
  }

  const notes = await getNotes(session.user.id);
  const responseNotes = notes.map(note => ({ id: note.id, title: note.title, content: note.content }))
  res.json(responseNotes);
}

async function putHandler(req: NextApiRequest, res: NextApiResponse<NoteCreateResponse | ApiError>) {
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).send({ error: Responses.Unauthorized });
  }

  const note = await createNote(session.user.id);
  res.send({ id: note.id });
}
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { ApiError, ApiNote } from '../../../lib/apiModels';
import { getNote, Note, updateNote } from '../../../lib/dbUtils';
import { Responses } from '../../../lib/Responses';

interface GetRequest extends NextApiRequest {
  query: {
    noteId: string
  }
}

interface PatchRequest extends GetRequest {
  body: {
    title: string;
    content: string;
  }
}

export default async function handler(req: GetRequest, res: NextApiResponse<ApiNote | ApiError>) {
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).send({ error: Responses.Unauthorized});
  }

  const note = await getNote(req.query.noteId);
  if (note.user_id != session.user.id) {
    return res.status(403).send({ error: Responses.Forbidden });
  }

  if (req.method === 'GET') return await getHandler(req, res, note);
  else if (req.method === 'PATCH') return await patchHandler(req as PatchRequest, res, note);
}

async function getHandler(req: GetRequest, res: NextApiResponse<ApiNote | ApiError>, note: Note) {
  const responseNote = { id: note.id, title: note.title, content: note.content };
  res.json(responseNote);
}

async function patchHandler(req: PatchRequest, res: NextApiResponse, note: Note) {
  if (!req.body.title) return res.status(400).send({ error: 'Note title cannot be null' });

  const updateNoteValues = {
    id: note.id,
    title: req.body.title ?? note.title,
    content: req.body.content ?? note.content,
    user_id: note.user_id
  }

  await updateNote(updateNoteValues);
  res.status(200).end();
}
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError, ApiNote, NoteCreateResponse } from '../../lib/apiModels';
import { createNote, getNotes } from '../../lib/dbUtils';
import { SessionRequest, withSession } from '../../lib/ironSession';
import { Responses } from '../../lib/Responses';

export default withSession(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<ApiNote[] | NoteCreateResponse | ApiError>) {
  if (req.method === 'GET') return await getHandler(req, res);
  else if (req.method === 'PUT') return await putHandler(req, res);
}

// Returns a list of notes
async function getHandler(req: SessionRequest, res: NextApiResponse<ApiNote[] | ApiError>) {
  if (!req.session.userId) {
    return res.status(401).send({ error: Responses.Unauthorized })
  }

  const notes = await getNotes(req.session.userId);
  const responseNotes = notes.map(note => ({ id: note.id, title: note.title, content: note.content, dateCreated: note.date_created }))
  res.json(responseNotes);
}

// Creates a new note
async function putHandler(req: SessionRequest, res: NextApiResponse<NoteCreateResponse | ApiError>) {
  if (!req.session.userId) {
    return res.status(401).send({ error: Responses.Unauthorized });
  }

  const note = await createNote(req.session.userId);
  res.send({ id: note.id });
}
import { NextApiResponse } from 'next';
import { ApiError, ApiNote } from '../../../lib/apiModels';
import { deleteNote, getNote, Note, updateNote } from '../../../lib/dbUtils';
import { SessionRequest, withSession } from '../../../lib/ironSession';
import { Responses } from '../../../lib/Responses';

interface PatchRequest extends SessionRequest {
  body: {
    title: string;
    content: string;
  }
}

export default withSession(handler);

// Checks if the user is logged in and has access to the note
async function handler(req: SessionRequest, res: NextApiResponse<ApiNote | ApiError>) {
  if (!req.session.userId) {
    return res.status(401).send({ error: Responses.Unauthorized});
  }

  const note = await getNote(req.query.noteId as string);
  if (note.user_id != req.session.userId) {
    return res.status(403).send({ error: Responses.Forbidden });
  }

  if (req.method === 'GET') return await getHandler(req, res, note);
  else if (req.method === 'PATCH') return await patchHandler(req as PatchRequest, res, note);
  else if (req.method === 'DELETE') return await deleteHandler(req, res, note);
  else res.status(400).end();
}

// Returns note information
async function getHandler(req: SessionRequest, res: NextApiResponse<ApiNote | ApiError>, note: Note) {
  const responseNote = { id: note.id, title: note.title, content: note.content, dateCreated: note.date_created };
  res.json(responseNote);
}

// Updates the note content
async function patchHandler(req: PatchRequest, res: NextApiResponse, note: Note) {
  if (!req.body.title) return res.status(400).send({ error: 'Note title cannot be null' });

  const updateNoteValues = {
    id: note.id,
    title: req.body.title ?? note.title,
    content: req.body.content ?? note.content,
    user_id: note.user_id,
    date_created: note.date_created
  }

  await updateNote(updateNoteValues);
  res.status(200).end();
}

// Deletes the note
async function deleteHandler(req: SessionRequest, res: NextApiResponse, note: Note) {
  await deleteNote(note.id);
  res.status(200).end();
}
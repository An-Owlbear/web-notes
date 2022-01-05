import type { NextApiRequest, NextApiResponse } from 'next'
import { Note } from '../../lib/apiModels';

const sampleNotes = [{ title: "title 1", content: "content 1" }, { title: "title 2", content: "content 2" }];

export default function handler(req: NextApiRequest, res: NextApiResponse<Note[]>) {
  res.status(200).json(sampleNotes);
};

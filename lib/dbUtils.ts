import { createPool, sql } from 'slonik';
import { v4 as uuidv4 } from 'uuid';

export interface Note {
  id: string;
  title: string;
  content: string;
  user_id: string;
  date_created: Date
}

const pool = createPool(`postgres://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

export const getNote = async (id: string) =>
  await pool.one<Note>(sql`SELECT * FROM notes WHERE id = ${id}`)
    .catch(() => undefined);

export const getNotes = async (userId: string) =>
  await pool.any<Note>(sql`SELECT * FROM notes WHERE user_id = ${userId} ORDER BY date_created DESC`);

export const createNote = async (userId: string) => {
  const id = uuidv4();
  await pool.query(sql`INSERT INTO notes VALUES (${id}, 'Untitled note', '', ${userId}, to_timestamp(${Date.now() / 1000}))`);
  return await pool.one<Note>(sql`SELECT * FROM notes WHERE id = ${id}`);
}

export const updateNote = async (note: Note) =>
  await pool.query(sql`UPDATE notes SET title = ${note.title}, content = ${note.content} WHERE id = ${note.id}`);

export const deleteNote = async (noteId: string) =>
  await pool.query(sql`DELETE FROM notes WHERE id = ${noteId}`);
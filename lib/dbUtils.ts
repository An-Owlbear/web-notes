import { createPool, sql } from 'slonik';
import { v4 as uuidv4 } from 'uuid';

export interface Note {
  id: string;
  title: string;
  content: string;
  user_id: string;
}

const pool = createPool(`postgres://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

export const getNote = async (id: string) =>
  await pool.one<Note>(sql`SELECT * FROM notes WHERE id = ${id}`);

export const getNotes = async (userId: string) =>
  await pool.many<Note>(sql`SELECT * FROM notes WHERE user_id = ${userId}`);

export const createNote = async (userId: string) => {
  const id = uuidv4();
  await pool.query(sql`INSERT INTO notes VALUES(${id}, 'Untitled note', '', ${userId})`);
  return await pool.one<Note>(sql`SELECT * FROM notes WHERE id = ${id}`);
}
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import NoteListItem from '../components/index/NoteListItem';
import { ApiNote } from '../lib/apiModels';
import { fetcher } from '../lib/fetcher';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { mutate } = useSWRConfig();
  const { data } = useSWR<ApiNote[]>('/api/notes', fetcher);
  const router = useRouter();

  // Sends a request to make a new and redirects to new note page
  const createNote = () => {
    fetch('/api/notes', { method: 'PUT' })
      .then(response => response.json())
      .then((data) => router.push(`/notes/${data.id}`))
      .catch(error => console.log(error));
  }

  // Deletes note and mutates cache
  const deleteNote = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    console.log(id);
    return mutate('/api/notes', async (notes: ApiNote[]) => {
      await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      return notes.filter(note => note.id !== 'id');
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>web-notes</title>
        <meta name="description" content="simple online notes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Notes</h1>
          <button className={styles.createBtn} onClick={createNote}>
            <span className={styles.desktopText}>Create note</span>
            <img src="/add_white_48dp.svg" alt="Create note" className={styles.mobileText} />
          </button>
        </div>
        <ul className={styles.noteList}>
          {data?.map(x => (
            <NoteListItem key={x.id} id={x.id} title={x.title} onDelete={deleteNote} />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default Home;
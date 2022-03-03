import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import { ApiNote } from '../../lib/apiModels';
import { fetcher } from '../../lib/fetcher';
import styles from '../../styles/[noteId].module.css'
import NotFoundPage from '../404';
import { RequestError } from '../../lib/fetcher';

const Note: NextPage = () => {
  const router = useRouter();
  const { noteId } = router.query;

  // Fetches data, and updates state unless it has been modified by the user
  const { data: note, error } = useSWR<ApiNote, RequestError>(noteId ? `/api/notes/${noteId}` : null, fetcher, {
    onSuccess: (note) => {
      if (!values.changed && note) setValues({ ...values, title: note.title, content: note.content });
    }
  });

  const [values, setValues] = useState({
    title: note?.title ?? '',
    content: note?.content ?? '',
    changed: false
  });

  // Updates the state
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(event);
    setValues({ ...values, [event.target.name]: event.target.value, changed: true });
  }

  // Updates the note
  const updateNote = () => {
    const requestBody = JSON.stringify({ title: values.title, content: values.content });
    const requestHeaders = { 'Content-Type': 'application/json' };
    fetch(`/api/notes/${noteId}`, { method: 'PATCH', body: requestBody, headers: requestHeaders })
      .catch(error => console.log(error));
    setValues({ ...values, changed: false });
  }

  if (error?.status === 404) return <NotFoundPage />
  if (!note) return null;
  return (
    <div className={styles.container}>
      <Head>
        <title>{note.title}</title>
        <meta name="description" content={`Editing ${note.title}`} />
      </Head>

      <main className={styles.main}>
        <div className={styles.buttonContainer}>
          <button onClick={() => router.back()}>Back</button>
          <button onClick={updateNote}>Save</button>
        </div>

        <input className={styles.title} type="text" name="title" value={values.title} onChange={handleChange} />
        <textarea className={styles.content} name="content" value={values.content} onChange={handleChange} />
      </main>
    </div>
  );
}

export default Note;
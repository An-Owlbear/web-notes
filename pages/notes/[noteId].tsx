import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ApiNote } from '../../lib/apiModels';
import { fetcher } from '../../lib/fetcher';
import styles from '../../styles/Note.module.css'

const Note: NextPage = () => {
  const router = useRouter();
  const { noteId } = router.query;
  const { data: session, status } = useSession({ required: true });
  const { data: note } = useSWR<ApiNote>(noteId ? `/api/notes/${noteId}` : null, fetcher);

  if (status === 'loading' || !note) return null;
  return (
    <div className={styles.container}>
      <Head>
        <title>{note.title}</title>
        <meta name="description" content={`Editing ${note.title}`} />
      </Head>

      <main className={styles.main}>
        <input className={styles.title} type="text" name="title" value={note.title} />
        <textarea className={styles.content} name="content" value={note.content} />
      </main>
    </div>
  )
}

export default Note;
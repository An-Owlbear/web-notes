import type { NextPage } from 'next'
import Head from 'next/head'
import { Note } from '../lib/apiModels';
import { getNotes } from '../lib/fetcher';
import styles from '../styles/Home.module.css'
import useSWR from 'swr';
import Link from 'next/link';

const Home: NextPage = () => {
  const { data } = useSWR<Note[]>('/api/getNotes', getNotes);

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
          <button className={styles.createBtn}>
            <span className={styles.desktopText}>Create note</span>
            <img src="/add_white_48dp.svg" alt="Create note" className={styles.mobileText} />
          </button>
        </div>
        <ul className={styles.noteList}>
          {data?.map(x => (
            <li key={x.title}>
              <Link href="javascript:void(0)">{x.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default Home
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import styles from './NoteListItem.module.css';

interface NoteListItemProps {
  id: string;
  title: string;
  onDelete: (event: React.MouseEvent, id: string) => void;
}

const NoteListItem = (props: NoteListItemProps) => {
  return (
    <li className={styles.noteListItem}>
      <Link href={`/notes/${props.id}`}><a>{props.title}</a></Link>
      <button onClick={event => props.onDelete(event, props.id)}>
        <Image src="/delete_black_48dp.svg" alt="Delete note" height={30} width={30} />
      </button>
    </li>
  )
}

export default NoteListItem;
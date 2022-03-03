import Link from 'next/link';
import styles from '../styles/error.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>Page not found</h1>
      <Link href="/">Go back</Link>
    </div>
  )
}

export default NotFoundPage;
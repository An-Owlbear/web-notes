import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SessionCheck from '../components/SessionCheck';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <SessionCheck>
      <Component {...pageProps} />
    </SessionCheck>
  )
}

export default MyApp;
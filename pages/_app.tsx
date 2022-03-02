import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import SessionCheck from '../components/SessionCheck';
import SessionContext from '../components/SessionContext';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const [session, setSession] = useState('');

  return (
    <SessionContext.Provider value={{ session: session, setSession: (id) => setSession(id) }}>
      <SessionCheck>
        <Component {...pageProps} />
      </SessionCheck>
    </SessionContext.Provider>
  )
}

export default MyApp;
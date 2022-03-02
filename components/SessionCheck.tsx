import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import SessionContext from './SessionContext';

interface SessionCheckProps {
  children: JSX.Element
}

const SessionCheck = (props: SessionCheckProps) => {
  const { session, setSession } = useContext(SessionContext);

  useEffect(() => {
    const sessionCookie = Cookies.get('sessionInfo');
    if (sessionCookie) setSession(sessionCookie);
    else window.location.href = "/api/login";
  }, []);

  if (!session) return <></>
  return props.children;
}

export default SessionCheck;
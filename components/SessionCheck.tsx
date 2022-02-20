import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface SessionCheckProps {
  children: JSX.Element
}

const SessionCheck = (props: SessionCheckProps) => {
  const [session, setSession] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (Cookies.get('sessionInfo')) setSession(Cookies.get('sessionInfo'));
    else window.location.href = "/api/login";
  }, []);

  if (!session) return <></>
  return props.children;
}

export default SessionCheck;
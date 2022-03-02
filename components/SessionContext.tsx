import { createContext } from 'react';

interface ISessionContext {
  session: string
  setSession: (id: string) => void;
}

const SessionContext = createContext<ISessionContext>({} as ISessionContext);

export default SessionContext;
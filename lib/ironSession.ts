import { IronSession } from 'iron-session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler, NextApiRequest } from 'next';

// Config for storing session variables
const ironConfig = {
  cookieName: 'wn_session',
  password: process.env.APP_SECRET!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}

export interface SessionRequest extends NextApiRequest {
  session: IronSession;
}

// Wrapper for accessing session variables in api routes
export const withSession = (handler: NextApiHandler) => withIronSessionApiRoute(handler, ironConfig);
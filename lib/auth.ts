import { NextApiResponse } from 'next';
import { generators, Issuer } from 'openid-client';
import { SessionRequest } from './ironSession';

const createClient = async () => {
  const oidcIssuer = await Issuer.discover(process.env.ISSUER_URL!);
  return new oidcIssuer.Client({
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    redirect_uris: [`${process.env.APP_URL}/api/auth/callback`],
    response_types: ['code']
  });
}



// Redirects the user to login
export const login = async (req: SessionRequest, res: NextApiResponse) => {
  const client = await createClient();
  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);
  req.session.codeVerifier = codeVerifier;
  await req.session.save();

  const authUrl = client.authorizationUrl({
    scope: 'openid',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256'
  });

  res.redirect(authUrl);
}

// Checks if the user is authenticated and redirects them to login if needed
export const checkAuth = async (req: SessionRequest, res: NextApiResponse) => {
  if (req.session.userId) return req.session.userId;
  await login(req, res);
}

// Completes the login process and sets session
export const callback = async (req: SessionRequest, res: NextApiResponse) => {
  const client = await createClient();
  const params = client.callbackParams(req);
  const tokenSet = await client.callback(`${process.env.APP_URL}/api/auth/callback`, params, { code_verifier: req.session.codeVerifier });
  const userInfo = await client.userinfo(tokenSet.access_token!);
  console.log(userInfo);
  req.session.destroy();
  req.session.userId = userInfo.sub;
  await req.session.save();
  res.redirect("/");
}
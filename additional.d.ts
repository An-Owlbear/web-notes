declare module "iron-session" {
  interface IronSessionData {
    codeVerifier: string | undefined;
    userId: string | undefined;
  }
}
import { withIronSessionApiRoute } from "iron-session/next";

const cookieOptions = {
  cookieName: "besttoursession",
  password: process.env.SESSION_KEY!,
};

export const withApiSession = (fn: any) =>
  withIronSessionApiRoute(fn, cookieOptions);

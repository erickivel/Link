import { MiddlewareFn } from "type-graphql";
import { verify } from 'jsonwebtoken';

import MyContext from '../types/MyContext';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export const ensureAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader) {
    throw new Error ('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    context.userId = sub;


    return next();
  } catch {
    throw new Error('invalid JWT token');
  }
};

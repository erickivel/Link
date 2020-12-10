import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../database/entities/User';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const checkAuthenticated = async (auth_token: string): Promise<boolean> => {
  try {
    const [, token] = auth_token.split(' ');

    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    const user = await User.findOne({ id: sub });

    if (!user) {
      return false;
    }

    // console.log('asd');

    return true;
  } catch (err) {
    return false;
  }
};

export default checkAuthenticated;

import { PubSub } from 'apollo-server-express';
import { Request, Response } from 'express';

export default interface MyContext {
  req: Request;
  res: Response;
  userId: string;
  pubSub: PubSub;
}

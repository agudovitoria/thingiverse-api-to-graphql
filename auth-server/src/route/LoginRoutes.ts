import express from 'express';

import { login, codeExchange, userInfo } from '../service/LoginService';

export const loginRouter = express.Router();

loginRouter.route('/login')
  .get(login);

loginRouter.route('/exchange')
  .get(codeExchange);

loginRouter.route('/me')
  .get(userInfo)
  
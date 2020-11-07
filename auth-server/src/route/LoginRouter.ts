import { Router } from 'express';

import LoginController from '../controller/LoginController';

export default class LoginRouter {
  router: Router;
  loginController: LoginController;
  
  constructor() {
    this.router = Router();
    this.loginController = new LoginController();
    
    this.router.route('/login')
      .get(this.loginController.login);

    this.router.route('/exchange')
      .get(this.loginController.codeExchange);

    this.router.route('/me')
      .get(this.loginController.userInfo);
  }
}



import { Router } from "express";

import LoginController from "../controller/LoginController";

export default class LoginRouter {
  router: Router;
  loginController: LoginController;

  constructor() {
    this.router = Router();
    this.loginController = new LoginController();

    this.router
      .route("/login")
      .get((req, res) => this.loginController.login(req, res));
    this.router
      .route("/exchange")
      .get((req, res) => this.loginController.codeExchange(req, res));

    this.router
      .route("/me")
      .get((req, res) => this.loginController.userInfo(req, res));
  }
}

import express from "express";
import * as pg from "pg";
import bodyParser from "body-parser";
import { UsersController } from "./Users/controller/users.controller";
import { DataBase } from "./database/database";

export class App {
  public app: express.Application;
  private PORT = 3000;

  constructor(userController: UsersController) {
    this.app = express();
    this.parsingReqBody();
    this.standartizeRoute(userController);
  }

  public createServer = () => {
    this.app.listen(this.PORT, () => {
      return console.log(`server is listening on port ${this.PORT}`);
    });
  };

  public parsingReqBody = () => {
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
  };

  public standartizeRoute = (userController) => {
    this.app.use("/users", userController.UserRouter);
  };
}

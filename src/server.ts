import { App } from "./app";
import { UsersController } from "./Users/controller/users.controller";
import { DataBase } from "./database/database";

const database = new DataBase();
database.connectToDataBase();

const client = database.getClient();

const app = new App(new UsersController(client));

app.createServer();

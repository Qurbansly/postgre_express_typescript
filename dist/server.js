"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const users_controller_1 = require("./Users/controller/users.controller");
const database_1 = require("./database/database");
const database = new database_1.DataBase();
database.connectToDataBase();
const client = database.getClient();
const app = new app_1.App(new users_controller_1.UsersController(client));
app.createServer();
//# sourceMappingURL=server.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const express_1 = __importDefault(require("express"));
const exception_1 = require("../../exceptions/exception");
class UsersController {
    constructor(client) {
        this.UserRouter = express_1.default.Router();
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: "SELECT * FROM users",
                    values: [],
                };
                const allUsers = yield this.client.query(query);
                res.json({ timeStamp: new Date(), users: allUsers.rows }).end();
            }
            catch (error) {
                res.send(error).end();
                throw error;
            }
        });
        this.insertUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, surname, location, order_number } = req.body;
                const query = {
                    text: "INSERT INTO users VALUES($1, $2, $3, $4, $5) returning *;",
                    values: [id, name, surname, location, order_number],
                };
                const insertedUser = yield this.client.query(query);
                res
                    .json({ timeStamp: new Date(), insertedUser: insertedUser.rows })
                    .end();
            }
            catch (error) {
                res.send(error).end();
                throw error;
            }
        });
        this.updateNameById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name } = req.body;
                const query = {
                    text: "UPDATE users SET name = $2 where id = $1 returning *;",
                    values: [id, name],
                };
                const updatedUsers = yield this.client.query(query);
                if (updatedUsers.rows.length === 0) {
                    throw new exception_1.NotFoundException("User doesnt found");
                }
                res.json({ timeStamp: new Date(), updatedUsers: updatedUsers.rows });
            }
            catch (error) {
                res.send(error).end();
                throw error;
            }
        });
        this.deleteUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const query = {
                    text: "DELETE FROM users WHERE id = $1 returning *;",
                    values: [id],
                };
                const deletedUser = yield this.client.query(query);
                res.json({ timeStamp: new Date(), deletedUser: deletedUser.rows });
            }
            catch (error) {
                res.send(error).end();
                throw error;
            }
        });
        this.client = client;
        this.UserRouter.get("/getUsers", this.getAllUsers);
        this.UserRouter.post("/insertUser", this.insertUser);
        this.UserRouter.put("/updateUser", this.updateNameById);
        this.UserRouter.delete("/deleteUser", this.deleteUserById);
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map
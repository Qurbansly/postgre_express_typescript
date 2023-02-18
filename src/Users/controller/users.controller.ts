import express, { Request, Response } from "express";
import * as pg from "pg";
import { NotFoundException } from "../../exceptions/exception";
import { IUsers } from "../interface/users.interface";

export class UsersController {
  public client: pg.Client;
  public UserRouter = express.Router();

  constructor(client: pg.Client) {
    this.client = client;
    this.UserRouter.get("/getUsers", this.getAllUsers);
    this.UserRouter.post("/insertUser", this.insertUser);
    this.UserRouter.put("/updateUser", this.updateNameById);
    this.UserRouter.delete("/deleteUser", this.deleteUserById);
  }

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const query = {
        text: "SELECT * FROM users",
        values: [],
      };

      const allUsers = await this.client.query(query);

      res.json({ timeStamp: new Date(), users: allUsers.rows }).end();
    } catch (error) {
      res.send(error).end();
      throw error;
    }
  };

  public insertUser = async (req: Request, res: Response) => {
    try {
      const { id, name, surname, location, order_number }: IUsers = req.body;

      const query = {
        text: "INSERT INTO users VALUES($1, $2, $3, $4, $5) returning *;",
        values: [id, name, surname, location, order_number],
      };

      const insertedUser = await this.client.query(query);

      res
        .json({ timeStamp: new Date(), insertedUser: insertedUser.rows })
        .end();
    } catch (error) {
      res.send(error).end();
      throw error;
    }
  };

  public updateNameById = async (req: Request, res: Response) => {
    try {
      const { id, name } = req.body;

      const query = {
        text: "UPDATE users SET name = $2 where id = $1 returning *;",
        values: [id, name],
      };

      const updatedUsers = await this.client.query(query);

      if (updatedUsers.rows.length === 0) {
        throw new NotFoundException("User doesnt found");
      }
      res.json({ timeStamp: new Date(), updatedUsers: updatedUsers.rows });
    } catch (error) {
      res.send(error).end();
      throw error;
    }
  };

  public deleteUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;

      const query = {
        text: "DELETE FROM users WHERE id = $1 returning *;",
        values: [id],
      };

      const deletedUser = await this.client.query(query);

      res.json({ timeStamp: new Date(), deletedUser: deletedUser.rows });
    } catch (error) {
      res.send(error).end();
      throw error;
    }
  };
}

import * as pg from "pg";
import config from "../config/db.config";

export class DataBase {
  public client: pg.Client;

  constructor() {
    this.client = new pg.Client({
      connectionString: config.CONNECTION_STRING,
    });
  }

  public connectToDataBase = async () => {
    await this.client.connect((err) => {
      if (err) {
        console.log(`error happened ${err}`);
        return;
      }

      console.log(`database connected successfully`);
    });
  };

  public getClient = () => {
    return this.client;
  };
}

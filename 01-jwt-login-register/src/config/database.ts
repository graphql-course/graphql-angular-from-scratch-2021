import chalk from "chalk";
import { Db, MongoClient } from "mongodb";

class Database {
  db?: Db;
  async init(): Promise<Db | undefined> {
    console.log("================DATABASE================");
    try {
      const MONGODB = String(process.env.DATABASE) || "";
      const mongoClient = await MongoClient.connect(MONGODB);

      this.db = mongoClient.db();
      this.showStatus(true);
    } catch (e) {
        this.showStatus(false);
    }
    return this.db;
  }
  private showStatus(ok: boolean) {
    if (ok) {
      console.log(`STATUS: ${chalk.greenBright("ONLINE")}`);
      console.log(`DATABASE: ${chalk.greenBright(this.db?.databaseName)}`);
      return;
    }
    console.log(`STATUS: ${chalk.redBright("OFFLINE")}`);
    console.log(`DATABASE: ${chalk.redBright(this.db?.databaseName)}`);
  }
}

export default Database;

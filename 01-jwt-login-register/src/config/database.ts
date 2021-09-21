import { Db, MongoClient } from "mongodb";
class Database {
    db?: Db;

    async init() {
        console.log("================DATABASE================");
        const MONGODB = "mongodb://localhost:27017/jwt-login-register-21";
        const mongoClient = await MongoClient.connect(MONGODB);

        this.db = mongoClient.db();
        return this.db;
    }
}

export default Database;
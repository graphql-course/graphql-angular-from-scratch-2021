import mysql from "mysql";
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "developers",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

export default connection;

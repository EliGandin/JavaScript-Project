import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "trackie",
  password: "password",
});

export default pool.promise();

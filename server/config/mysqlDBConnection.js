import mysql from 'mysql';

export default function mysqlDBConnection() {
    return mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "task_tracker"
    });
}
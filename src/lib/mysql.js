import mysqlFactory from 'serverless-mysql';
const mysql = mysqlFactory();

const { IS_LOCAL, DB_MYSQL_HOST, DB_MYSQL_PORT, DB_MYSQL_USER, DB_MYSQL_PASS, DB_MYSQL_NAME } = process.env;

mysql.config({
  host: IS_LOCAL ? '127.0.0.1' : DB_MYSQL_HOST,
  port: IS_LOCAL ? '13306' : DB_MYSQL_PORT,
  user: DB_MYSQL_USER,
  password: DB_MYSQL_PASS,
  database: DB_MYSQL_NAME
});

export default mysql;

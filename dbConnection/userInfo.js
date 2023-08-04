const mysql = require('mysql2');

const db =  mysql.createConnection({
    host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'user_db',
})

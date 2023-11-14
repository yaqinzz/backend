const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'b6lf3dgaotrkvc6st773-mysql.services.clever-cloud.com',
  user: 'uy97bgcfpdgqpz5o',
  password: 'beLfII5V9ZbjkFta0XHG',
  database: 'b6lf3dgaotrkvc6st773',
})

module.exports = db

const mysql = require('mysql');

const conn = mysql.createPool({
  connectionLimit: 10,
  password: '',
  user:'root',
  database:'db_queen',
  host: '127.0.0.1',
  port: '3306'
});

let queendb = {};

queendb.all = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM queens`, (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

queendb.one = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM queens WHERE id=?`,[id], (err, results) => {
      if(err) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};

module.exports = queendb;
const mysql = require('mysql');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  database: process.env.MYSQL_DB || 'vidly'
});

connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
});

const db = Promise.promisifyAll(connection, {multiArgs: true});

const getAll = () => {
  return db.queryAsync('select * from videos').spread(results => results);
};

const create = (name) => {
  return db.queryAsync(`insert into videos (name) values ("${name}")`).spread(results => results);
};


module.exports = {
  getAll,
  create
}
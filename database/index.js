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

const findOne = (name) => {
  return db.queryAsync(`select * from videos where name = "${name}"`).spread(results => results);
};

const create = (name, videoUrl, thumbUrl, description) => {
  return db.queryAsync(`insert into videos (name, videoUrl, thumbUrl, description) values ("${name}", "${videoUrl}", "${thumbUrl}", "${description}")`).spread(results => results);
};

const update = (name, description) => {
  return db.queryAsync(`update videos set description = "${description}" where name = "${name}"`).spread(results => results);
};


module.exports = {
  getAll,
  findOne,
  create,
  update
}
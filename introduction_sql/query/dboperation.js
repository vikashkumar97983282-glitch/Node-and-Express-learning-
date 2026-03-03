const pool = require('./db');

const getUsers = (request, response) => {
  pool.query("SELECT * FROM testtable", (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

module.exports = getUsers;
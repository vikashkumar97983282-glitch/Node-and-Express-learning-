const { Pool } = require('pg');

const pool = new Pool({
    host : 'localhost',
    user : 'postgres',
    port : 5432,
    password : '1234',
    database : 'sample'
});

// pool.connect().then(()=>console.log("database connected"))

module.exports = pool;
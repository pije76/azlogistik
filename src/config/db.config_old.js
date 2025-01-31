require("dotenv").config()
// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'bank_account_db',
//   password: 'tratap60',
//   port: 5432,
// })

// pool.connect();
// pool.connect((err, client, done) => {
//     if (err) throw err;
//     client.query('SELECT * FROM bank_account_db ORDER BY id ASC', (err, res) => {
//         if (err)
//             console.log(err.stack);
//         else {
//             console.log(res.rows);
//         }
//         pool.end()
//     })
// })

// Check if the DB connection is successful
// pool.connect((err, client, release) => {
//     if (err) {
//         console.error('Error acquiring client', err.stack);
//     } else {
//         console.log('Database connected successfully!');
//         release(); // Release the client back to the pool
//     }
// });



// const getUsers = (request, response) => {
//   pool.query('SELECT * FROM bank_name ORDER BY id ASC;', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

const { DB_CLIENT,
  DB_NAME_LOCAL,DB_USER_LOCAL,DB_PASSWORD_LOCAL,DB_HOST_LOCAL
} = process.env

const AllDb = {
    database_local:{
      host: DB_HOST_LOCAL,
      username: DB_USER_LOCAL,
      password: DB_PASSWORD_LOCAL,
      database: DB_NAME_LOCAL,
      port: 5432,
      dialect: DB_CLIENT,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
}

module.exports = AllDb
// module.exports = {AllDb, getUsers,}

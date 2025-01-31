var express = require('express');
const path = require("path")
const fs = require("fs")
const bodyParser = require('body-parser');
var pg = require('pg');

var router = express.Router();

const aksesdb = require('../../../src/config/db.config');

const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bank_account_db',
  password: 'tratap60',
  port: 5432,
})

// const pool = new Pool(aksesdb.AllDb)


// var conString = aksesdb.AllDb

// var client = new pg.Client(conString);


// client.connect();
// const Pool = require('pg').Pool



// const pool = new pg.Pool(aksesdb);

// const pool = new Pool(aksesdb.AllDb)
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'dbm_bank_account',
//   password: 'tratap60',
//   port: 5432,
// })

// aksesdb.config();

// const { Pool } = require('pg');
// var config = {
//     user: 'postgres',
//     database: 'dbm_bank_account',
//     password: 'tratap60',
//     host: 'localhost',
//     port: 5432,
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000
// };
// const pool = new Pool(config);

// pool.connect((err, client, done) => {
//     if (err) throw err;
//     client.query('SELECT * FROM dbm_bank_account', (err, res) => {
//         if (err)
//             console.log(err.stack);
//         else {
//             console.log(res.rows);
//         }
//         pool.end()
//     })
// })
// var pg = require('pg');
// var conString = "postgres://pije76:tratap60@localhost:5432/dbm_bank_account";

// var client = new pg.Client(conString);
// client.connect();

// const pg = require('pg')
// const config = {
//     user: 'pije76',
//     host: 'localhost',
//     database: 'dbm_bank_account',
//     password: 'tratap60',
//     port: '5432'
// }

// const pool = new pg.Pool(config);

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// pool.connect((err, client, done) => {
//     if (err) throw err;
//     client.query('SELECT  name, age FROM  users', (err, res) => {
//         if (err)
//             console.log(err.stack);
//         else {
//             console.log(res.rows);
//         }
//         pool.end()
//     })
// })

// import pkg from 'pg'
// const { Pool } = pkg;
// import dotenv from 'dotenv'

// dotenv.config();


pool.connect();

// Check if the DB connection is successful
// pool.connect((err, client, release) => {
//     if (err) {
//         console.error('Error acquiring client', err.stack);
//     } else {
//         console.log('Database connected successfully!');
//         release(); // Release the client back to the pool
//     }
// });

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get("/", (req, res) => {
    return res.send({
        project:'API v1 Web Service '
    });
});


router.get("/ini-test", (req, res) => {
    console.log("asdasd")
    return res.send({
        project:'API v1 Web Service '
    });
});

// const getUsers = (request, response) => {
//   pool.query('SELECT * FROM bank_name ORDER BY id ASC;', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const getUsers = (request, response) => {
//   pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// router.get('/rekening/tmp/test', aksesdb.getUsers)
// const query = {
//    // give the query a unique name
//    name: 'fetch-employee',
//    text: 'SELECT * FROM employees WHERE first_name= $1',
//    values: ['Roam'],
//   }

router.get("/rekening/tmp", (req, res) => {
    const bank_code = req.query.bank_code;

    pool.query('SELECT * FROM dbm_bank_account', (error, data) => {
    if (error) {
      throw error;
    }

    // pool.query('SELECT * FROM dbm_bank_account', (error, results) => {
    // if (error) {
    //   throw error
    // }
    // postData = pool.query('SELECT * FROM dbm_bank_account');
    // postData = pool.query('SELECT * FROM dbm_bank_account WHERE bank_code = $1', [bank_code]);
    // postData = pool.query('SELECT * FROM dbm_bank_account WHERE id=519d1575-99cf-4b81-9e64-d34d9fb0e24c');
    // postData = pool.query("SELECT * FROM dbm_bank_account WHERE id=$1", ['519d1575-99cf-4b81-9e64-d34d9fb0e24c']);
    // pool.query("SELECT * FROM dbm_bank_account WHERE id=$1", ['519d1575-99cf-4b81-9e64-d34d9fb0e24c'], (err,res) => {
//   console.log(err ? err.stack : res.rows)
    console.log(req.body)
//   res.render("database", {title: "Database", posts: posts})
// })
    // res.status(200).json(postData)
    // res.status(200).json(data);
    // res.status(200).json({people: data[0].rows, animals: data[1].rows});
    // res.send('Data Received: ' + JSON.stringify(postData));
    // res.send(data);
    // res.send(data.rows[1]);
    res.status(200).json(data.rows)
  })

})

// router.post('/rekening/tmp', (req, res) => {
//   if (!req.body.title) {
//     return res.status(400).send({
//       success: 'false',
//       message: 'title is required',
//     });
//   } else if (!req.body.description) {
//     return res.status(400).send({
//       success: 'false',
//       message: 'description is required',
//     });
//   }
//   const todo = {
//     id: db.length + 1,
//     title: req.body.title,
//     description: req.body.description,
//   };
//   db.push(todo);
//   return res.status(201).send({
//     success: 'true',
//     message: 'todo added successfully',
//     todo,
//   });
// });

router.post("/rekening/tmp", (req, res) => {
// // router.get("/rekening/tmp", (req, res) => {
// router.post('/rekening/tmp', function(req, res, next) => {
//     // const jobTypes = [
//     //     { id: 1, type: "Interior" },
//     //     { id: 2, type: "Etterior" },
//     //     { id: 3, type: "Roof" },
//     //     { id: 4, type: "Renovations" },
//     //     { id: 5, type: "Roof" },
//     // ];
//     // // const rekening = {
//     // //     id: jobTypes.length,
//     // //     type: req.body.type
//     // // };
//     // const jobtype = { id: jobTypes.length + 1, type: req.body.type };

//     // jobTypes.push(jobtype);
//     // res.send(jobtype);

    res.json(
    req.body)

//     const { databank } = aksesdb.query(
//         "SELECT * FROM dbm_bank_account;"
//     );

        // const databank = pool.query('SELECT * FROM dbm_bank_account', data);

//     // const databank = aksesdb.AllDb

    // res.status(201).send(
    // {
    //     message: "Product added successfully!",
    //     body: {
    //         databank: databank
    //     },
    // });

    // res.status(200).send();

//     // const postData = req.body;
//     // console.log('Received POST data:', postData);
//     // // res.send('Data received successfully');
//     // res.send('Data Received: ' + JSON.stringify(postData));

    // res.send();
    // console.log('Received POST data:', res.databank);


//     // var usernamedata = req.query;
//     // // var usernamedata = req.body.username;
//     // console.log("POST BODY", usernamedata)
//     // console.log("POST BODY", req.body)
//     // console.log("POST QUERY", req.query);


});


// Folder v1
const v1Dir = path.join(__dirname);

// Membaca semua folder dalam direktori v1
fs.readdirSync(v1Dir).forEach(folder => {
    const folderPath = path.join(v1Dir, folder);
    
    // Memastikan folder dan bukan file
    if (fs.lstatSync(folderPath).isDirectory()) {
        const routerFilePath = path.join(folderPath, 'index.js');
        
        // Mencari file index.js dalam folder
        if (fs.existsSync(routerFilePath)) {
            const rout = require(routerFilePath);
            router.use(`/${folder}`, rout); // Menggunakan prefix berdasarkan nama folder
        }

        // Mencari file lain dalam folder
        fs.readdirSync(folderPath).forEach(file => {
            if (file !== 'index.js' && file.endsWith('.js')) {
                const routeFilePath = path.join(folderPath, file);
                const routeRouter = require(routeFilePath);
                router.use(`/${folder}`, routeRouter);
            }
        });
    }
});

module.exports = router;

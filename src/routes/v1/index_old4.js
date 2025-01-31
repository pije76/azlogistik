var express = require('express');
const path = require("path")
const fs = require("fs")
const bodyParser = require('body-parser');
var pg = require('pg');
// import { v4 as uuidv4 } from 'uuid';
// const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');

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
pool.connect();

const {Client} = require('pg')
const con = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'tratap60',
    database: 'bank_account_db',
    port: 5432,
})

con.connect().then(() => console.log("Connected!"))


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

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


router.get("/rekening/tmp", (req, res) => {
    // const result = pool.query('SELECT * FROM dbm_bank_account');

    pool.query('SELECT * FROM dbm_bank_account', (error, data) => {
    if (error) {
      throw error;
    }

    // console.log(req.body)
    console.log(data)
    res.status(200).json(data.rows)
    // res.json(result.rows);
  })
   // res.send(result);

})


router.post("/rekening/tmp", (req, res) => {


    const { bankID, accountHolderName, accountNumber, isPrimary, is_verif } = req.body;

    const uuid = uuidv4();
    console.log(`UUID: ${uuid}`);
    console.log(req.body);
    // console.log(req.body.bankID);

    if (!bankID || !accountHolderName || !accountNumber)
    {
      return res.status(400).send('One of the value is missing in the data');
    }
    else
    {
        console.log(req.body.bankID);
    }

    // if (!is_verif)
    // {
    //     // id === uuid
    //     is_verif === false
    // }

    let randNumber= Math.floor(Math.random() * 10000000000);

    var date_time = new Date();



    const query = `
        INSERT INTO public.dbt_mp_rekening_tmp ("id", "bankID", "usersID", "nama_pemilik", "rekening_number", "is_verif", "is_primary", "is_active", "created_at", "updated_at", "deleted_at")
        VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
    `;


    const values = [
        req.body.bankID,
        randNumber,
        req.body.accountHolderName,
        req.body.accountNumber,
        false,
        false,
        true,
        date_time,
        date_time,
        null,
    ];

    // pool.query(query, values, function(error, resp)
    // {
    //     var bankdata = resp.rows[0].bankID;
    //     console.log(bankdata);
    // });

    pool.query(query, values, (error, results) => {
    // pool.query('INSERT INTO public.dbt_mp_rekening_tmp (id, "bankID", "usersID", nama_pemilik, rekening_number, is_verif, is_primary, is_active, created_at, updated_at, deleted_at) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [req.body.bankID, randNumber, req.body.accountHolderName, req.body.accountNumber, false, false, true, date_time, date_time, null,], (error, results) => {
    // res.status(201).send(`
    //     "Message":
    //     {
    //         "Code": 200,
    //         "Text": "OK"
    //     },
    //     "Data":
    //     {
    //         "Message": "Berhasil menyimpan rekening bank",
    //         "newAccount":
    //         {
    //             "id": ${results.rows[0].id},
    //             "isVerif": ${results.rows[0].is_verif},
    //             "bankID": ${results.rows[0].bankID},
    //             "userID": ${results.rows[0].usersID},
    //             "namaPemilik": ${results.rows[0].nama_pemilik},
    //             "rekeningNumber": ${results.rows[0].rekening_number},
    //             "isPrimary": ${results.rows[0].is_primary},
    //             "isActive": ${results.rows[0].is_active},
    //             "updatedAt": ${results.rows[0].updated_at},
    //             "createdAt": ${results.rows[0].created_at},
    //             "deletedAt": ${results.rows[0].deleted_at}
    //         },
    //     "Type": "/v1/muatparts/bankAccount"
    // `)})
    if (error) {
        throw error
    }
    res.json(results.rows)
    // res.send(`User added with ID: ${results.rows[0].id}`);
    });


});


router.get("/rekening/tmp/:id", (req, res, next) => {
    // const showoneuserquery = 'SELECT * FROM public.dbt_mp_rekening_tmp where id = $1'
    // const user_id = parseInt(req.params.id);
    const user_id = req.params.id;

    console.log(user_id);

    // pool.query(showoneuserquery, user_id)
    // .then(function (data) {
    //   res.status(200)
    //     .json({
    //       status: 'success',
    //       data: data,
    //       message: 'Retrieved ONE user'
    //     });
    // })

    // .catch(function (err) {
    //   return next(err);
    // });

    pool.query(
        'SELECT * FROM public.dbt_mp_rekening_tmp WHERE "id" = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

router.put("/rekening/tmp/:id/verify", (req, res) => {
    // const user_id = parseInt(req.params.id);
    const user_id = req.params.id;
    const { bankID, nama_pemilik} = req.body;
    // const bankID = req.body.bankID;
    // const accountNumber = req.body.accountNumber;

    console.log(bankID);
    console.log(nama_pemilik);

    var date_time = new Date();

    // pool.query('UPDATE public.dbt_mp_rekening_tmp ("rekening_number", "usersID") SET ($1, $2)',[accountNumber, req.user_id]);
    // res.send();

    // const query = `
    //     UPDATE public.dbt_mp_rekening_tmp SET ("bankID", "usersID", "rekening_number", "is_verif")
    //     VALUES ($1, $2, $3, $4)
    // `;

    const update_query = `UPDATE dbt_mp_rekening_tmp SET "bankID"=$1, nama_pemilik=$2, is_verif=$3, updated_at=$4  WHERE "id" = $5`;

    const values = [
        // req.body.bankID,
        req.body.bankID,
        req.body.nama_pemilik,
        true,
        date_time,
        user_id,
    ];

    pool.query(update_query, values, (err, results) => {
        // if(err){res.send(err)}
        // else
        res.send(`User modified with ID: ${user_id}`)
    })

    // const copy_query = `INSERT INTO dbt_mp_rekening (SELECT * FROM dbt_mp_rekening_tmp WHERE column1='parameter' AND column2='anotherparameter');`
    const copy_query = `
    INSERT INTO dbt_mp_rekening
    SELECT * FROM dbt_mp_rekening_tmp
    `

    // pool.query(copy_query, values, (err, results) => {
    //     // if(err){res.send(err)}
    //     // else
    //     res.send(`Copy Data Success!`)
    // })

    
    // pool.query(`UPDATE public.dbt_mp_rekening_tmp SET manufacturer= '${req.params.manufacturer}', WHERE id = '${req.params.id}')`, function(err, result, fields) {
    //     if(err) res.send(err);
    //     if(result) res.send(result);
    // });
            

    // pool.query(
    //     'UPDATE dbt_mp_rekening_tmp SET "bankID"=$1, "rekening_number"=$2 WHERE "usersID"=$3', [req.body.bankID, accountNumber, user_id], (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     res.status(200).send(`User modified with ID: ${user_id}`)
    // })
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

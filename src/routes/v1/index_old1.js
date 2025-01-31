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


router.get("/rekening/tmp", (req, res) => {
    // const result = pool.query('SELECT * FROM dbm_bank_account');

    pool.query('SELECT * FROM dbm_bank_account', (error, data) => {
    if (error) {
      throw error;
    }

    console.log(req.body)
    res.status(200).json(data.rows)
    // res.json(result.rows);
  })
   // res.send(result);

})


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

    // res.json(
    // req.body)

//     const { databank } = aksesdb.query(
//         "SELECT * FROM dbm_bank_account;"
//     );

    // var data = req.body;

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
    // const totalUsers = pool.query(count());
    // const totalUsers = pool.collection.count();

//     pool.on('end', function(resultcnt) {
//     // pgClient.end();
//     console.log(resultcnt.rowCount);
// });

    // const cnttotal = pool.query(
    //     "SELECT * FROM public.dbt_mp_rekening_tmp"
    // );

    // var rows = cnttotal+1;

    // const cnttotalcum = ${cnttotal}+1;

    // let randNumber= Math.floor(Math.random() * 10000000000);
    // let randNumber= Math.floor(cnttotal+1);
    // let randNumber= cnttotal+1;

    // console.log(cnttotal.rowCount);

    // pool.query('SELECT * FROM dbm_bank_account', (data) => {
    //     const rowCount = data.rows.length;
    // });


    // const { totalUsers } = pool.query("SELECT * FROM public.dbt_mp_rekening_tmp", function(err, resultcount)
    // {
    //     // addcount = resultcount.rows.length + 1;
    //     var rowCount = resultcount.rows.length;
    //     console.log(rowCount+1);
    //     // console.log("Row count: %d",resultcount.rows.length);  // n
    // });

    // const {rowCount} = pool.result(query, values);


    // console.log(rowCount);

    var date_time = new Date();



    const query = `
        INSERT INTO dbt_mp_rekening_tmp ("id", "bankID", "usersID", "nama_pemilik", "rekening_number", "is_verif", "is_primary", "is_active", "created_at", "updated_at", "deleted_at")
        VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id;
    `;

    // users.push({ ...user, id: uuidv4() });

    const values = [
        // uuid.v4(),
        // uuidv4(),
        // uuid,
        // req.body.id,
        req.body.bankID,
        // cnttotal,
        randNumber,
        // resultcnt.rowCount+1,
        // rowCount,
        // rowCount+1,
        // req.body.usersID,
        req.body.accountHolderName,
        req.body.accountNumber,
        false,
        false,
        true,
        date_time,
        date_time,
        null,
    ];

    const result = pool.query(query, values);

    console.log(result);

    // const resp =
    // {
    //    "Message": {
    //        "Code": 200,
    //        "Text": "OK"
    //    },
    //    "Data": {
    //        "Message": "Berhasil menyimpan rekening bank",
    //        "newAccount": {
    //            "id": "6f5044cc-72c4-45c3-b1bc-dde368418357",
    //            "isVerif": true,
    //            "bankID": "ed728c6e-c095-4468-9a31-74a75ff0fb0e",
    //            "userID": "99",
    //            "namaPemilik": "RINDA",
    //            "rekeningNumber": "1234567877",
    //            "isPrimary": false,
    //            "isActive": true,
    //            "updatedAt": "2024-12-23T07:49:51.348Z",
    //            "createdAt": "2024-12-23T07:49:51.348Z",
    //            "deletedAt": null
    //        }
    //    },
    //    "Type": "/v1/muatparts/bankAccount"
    // }

    // const post = models.posts.create(
    // {
    //     bankID,
    //     usersID,
    //     nama_pemilik,
    //     rekening_number,
    //     is_primary,
    //     is_verif
    // });

    // console.log('req.body: ' + JSON.stringify(data));
    // console.log('bankID: ' + data.bankID);
    // console.log('accountHolderName: ' + data.accountHolderName);
    // console.log('nama_pemilik: ' + {data});

        // const databank = pool.query('SELECT * FROM dbm_bank_account');

//     // const databank = aksesdb.AllDb

    // res.status(201).send(
    // {
    //     message: "Product added successfully!",
    //     body: {
    //         databank: databank
    //     },
    // });

    // console.log('body is ',req.body);

    // res.status(201).send(
    // {
    //    "Message": {
    //        "Code": 200,
    //        "Text": "OK"
    //    },
    //    "Data": {
    //        "Message": "Berhasil menyimpan rekening bank",
    //        "newAccount": {
    //            "id": "6f5044cc-72c4-45c3-b1bc-dde368418357",
    //            "isVerif": true,
    //            "bankID": "ed728c6e-c095-4468-9a31-74a75ff0fb0e",
    //            "userID": "99",
    //            "namaPemilik": "RINDA",
    //            "rekeningNumber": "1234567877",
    //            "isPrimary": false,
    //            "isActive": true,
    //            "updatedAt": "2024-12-23T07:49:51.348Z",
    //            "createdAt": "2024-12-23T07:49:51.348Z",
    //            "deletedAt": null
    //        }
    //    },
    //    "Type": "/v1/muatparts/bankAccount"
    // })


    // res.status(200).send(result);
    res.status(201).send(
    {
        message: 'New Album created', result
    });


    // const postData = req.body;
//     // console.log('Received POST data:', postData);
//     // // res.send('Data received successfully');
    // res.send(req.rows);
    // res.send(JSON.stringify({success : "Updated Successfully", status : 200}));

    // res.send(res.result);
    // console.log('Received POST data:', res.databank);


//     // var usernamedata = req.query;
//     // // var usernamedata = req.body.username;
//     // console.log("POST BODY", usernamedata)
//     // console.log("POST BODY", req.body)
//     // console.log("POST QUERY", req.query);


});

// router.put("/api/v1/rekening/tmp/:id/verify", (req, res) => {

// }



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

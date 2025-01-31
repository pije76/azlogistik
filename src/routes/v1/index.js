var express = require('express')
const path = require("path")
const fs = require("fs")

// require('dotenv').config() 
const { Pool } = require('pg');
// console.log(require('dotenv').config())
// console.log(process.env.DB_PASSWORD_LOCAL)
// const pool = new Pool()  
const pool = new Pool({
    user: process.env.DB_USER_LOCAL,
    database: process.env.DB_NAME_LOCAL,
    password: process.env.DB_PASSWORD_LOCAL,
    port: 5432,
    host: process.env.DB_HOST_LOCAL,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  })

// pool.connect()

const { v4: uuidv4 } = require('uuid')


var router = express.Router();

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
    pool.query('SELECT * FROM dbt_mp_rekening_tmp', (error, result) => {
    if (error) {
      throw error;
    }

    // console.log(result)
    // console.log(result.rowCount)
    // res.status(200).json(data.rows)
    // res.json(result.rows);
   // res.send(result);
   res.send(result.rows);
})

})


router.post("/rekening/tmp", (req, res) => {


    const { bankID, accountHolderName, accountNumber, isPrimary, is_verif } = req.body;

    const uuid = uuidv4();
    // console.log(`UUID: ${uuid}`);
    // console.log(req.body);
    // console.log(req.body.bankID);

    // if (!bankID || !accountHolderName || !accountNumber)
    // {
    //   return res.status(400).send('One of the value is missing in the data');
    // }
    // else
    // {
    //     console.log(req.body.bankID);
    // }

    // if (!is_verif)
    // {
    //     // id === uuid
    //     is_verif === false
    // }

    let randNumber= Math.floor(Math.random() * 100);

    pool.query("SELECT * FROM public.dbt_mp_rekening_tmp", (error, results) => {
    // {
    //     // addcount = results.rows.length + 1;
    //     var rowCount = results.rows.length;
    //     console.log(rowCount+1);
        console.log(results.rows.length);
    //     // console.log("Row count: %d",resultcount.rows.length);  // n
    });

    // const {rowCount} = pool.result(query, values);

    // console.log(totalUsers);
    

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


router.get("/rekening/tmp/:id", (req, res) => {
    const user_id = req.params.id;

    console.log(user_id);


    pool.query(
        'SELECT * FROM public.dbt_mp_rekening_tmp WHERE "id" = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

router.delete("/rekening/tmp/:id/delete", (req, res) => {
    const user_id = req.params.id;
  
    pool.query('DELETE FROM public.dbt_mp_rekening_tmp WHERE id = $1', [user_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User deleted with ID: ${user_id}`)
    })
  });

router.put("/rekening/tmp/:id/verify", (req, res) => {
    const user_id = req.params.id;
    const { bankID, nama_pemilik, rekening_number} = req.body;

    // console.log(bankID);
    // console.log(nama_pemilik);

    var date_time = new Date();

    const update_query = `UPDATE dbt_mp_rekening_tmp SET "bankID"=$1, nama_pemilik=$2, rekening_number=$3, is_verif=$4, updated_at=$5  WHERE "id" = $6`;

    const values = [
        req.body.bankID,
        req.body.nama_pemilik,
        req.body.rekening_number,
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

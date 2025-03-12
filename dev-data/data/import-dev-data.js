const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const House = require('./../../models/houseModel')

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
    '<db_password>',
    process.env.DATABASE_PASSWORD
);
// DB = process.env.DATABASE_LOCAL;
mongoose
    .connect(DB , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    })
    .then(() => console.log('DB connection successful!'));

    //read jspn file
    const houses =JSON.parse(fs.readFileSync(`${__dirname}/houses-simple.json`,'utf-8'))

    //import data to DB
    const importData = async() =>{
        try {
            await House.create(houses);
            console.log("Data successfuly loaded");
            
        } catch (err) {
            console.log(err)
        }
        process.exit();
    };

    // Delete all data from collection
    const deleteData = async () =>{
        try {
            await House.deleteMany();
            console.log("Data successfuly deleted");
            
        } catch (err) {
            console.log(err)
        }
        process.exit();
    }


    if(process.argv[2] === '--import'){
        importData();
    }else if(process.argv[2] === '--delete'){
        deleteData();
    }
 
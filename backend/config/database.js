const mongoose = require('mongoose');

const connectDatabase = async ()=>{
    const con = await mongoose.connect(process.env.DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
        console.log(`MongoDB is connected to the host: ${con.connection.host} `)
        console.log(`📂 Connected to DB: ${con.connection.name}`);
    };


module.exports = connectDatabase;
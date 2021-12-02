const express =require('express');
const mysql = require('mysql2');


// Create connection:
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'rootpass',
    database: 'employees'
});

// Connect Database:
db.connect((err)=>{
    if(err){
        throw err;
    } 
    console.log('Mysql Connected...')

})

module.exports =db;
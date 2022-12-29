const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'oceeucabgy'
});

conexion.connect(function(error){
    if(error){
        throw error;
        return
    }
    console.log('Conexion exitosa')
});

module.exports = conexion;
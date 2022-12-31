const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fifa'
});

conexion.connect((error) =>{
    if(error){
        console.error('Error de conexion', error.stack);
        return
    }
    console.log('Conexion exitosa')
});

module.exports = conexion;
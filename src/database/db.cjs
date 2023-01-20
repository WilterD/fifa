const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fifa4'
});

conexion.connect((error) =>{
    if(error){
        console.error('Error de conexion', error.stack);
        return
    }
    console.log('Conexion exitosa a la bd')
});

module.exports = conexion;
const conexion = require('../database/db.cjs');

exports.save = (req, res) => {
    const name = req.body.name;
    const rol = req.body.rol;

    conexion.query('INSERT INTO users SET ?', {name: name, rol: rol}, (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    });
} 
    
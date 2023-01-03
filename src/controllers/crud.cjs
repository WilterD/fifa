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

exports.saveArbitro = (req, res) => {
    const nombre = req.body.nombre;
    const rol = req.body.rol;
    const pais = req.body.pais;

    conexion.query('INSERT INTO arbitro SET ?', {nombre: nombre, rol: rol, pais: pais}, (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.redirect('/arbitros');
        }
    });
} 
exports.saveHotel = (req, res) => {
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    conexion.query('INSERT INTO hotel SET ?', {nombre: nombre, direccion: direccion, telefono: telefono}, (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.redirect('/hotel');
        }
    });
} 

exports.updateHotel = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const ciudad = req.body.ciudad;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    conexion.query('UPDATE arbitro SET ? WHERE id = ?',[{nombre:nombre, ciudad:ciudad, direccion:direccion, telefono:telefono}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/arbitros');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.update = (req, res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const rol = req.body.rol;
    conexion.query('UPDATE users SET ? WHERE id = ?',[{name:name, rol:rol}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
});
};

exports.updateArbitro = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const rol = req.body.rol;
    const pais = req.body.pais;
    conexion.query('UPDATE arbitro SET ? WHERE id = ?',[{nombre:nombre, rol:rol, pais:pais}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/arbitros');         
        }
});
};

    
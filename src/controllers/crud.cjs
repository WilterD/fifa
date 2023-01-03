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
    const codHotel = req.body.codHotel;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;

    conexion.query('INSERT INTO hotel SET ?', {codHotel: codHotel,nombre:nombre, direccion: direccion}, (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.redirect('/hotel');
        }
    });
} 

// exports.saveEquipo = (req, res) => {
//     const nombre = req.body.nombre;
//     const directorT = req.body.directorT;
//     const eslogan = req.body.eslogan;

//     const confederacion = req.body.confederacion;

//     const pais = req.body.pais;

//     const local = req.body.local;
//     const visitante = req.body.visitante;

//     conexion.query('INSERT INTO coloruniforme SET ?', {nombre: nombre, directorT: directorT, eslogan: eslogan}, (error, results) => {
//         if(error){
//             console.log(error);
//         }else{
//             conexion.query('INSERT INTO equipo SET ?', {nombre: nombre, directorT: directorT, eslogan: eslogan}, (error, results) => {



//             res.redirect('/equipos');
//         }
//     });
// } 

exports.saveJugador = (req, res) => {
    const nombre = req.body.nombre;
    const alias = req.body.alias;
    const fechaNac = req.body.fechaNac;
    const posicion = req.body.posicion;
    const nroCamisa = req.body.nroCamisa;

    conexion.query('INSERT INTO jugador SET ?', {nombre:nombre, alias: alias,fechaNac:fechaNac,posicion:posicion,nroCamisa:nroCamisa}, (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.redirect('/jugadores');
        }
    });
} 

exports.updateHotel = (req, res)=>{
    const id = req.body.id;
    const codHotel = req.body.codHotel;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    

    conexion.query('UPDATE hotel SET ? WHERE id = ?',[{codHotel:codHotel, nombre:nombre, direccion:direccion}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/hotel');         
        }
});
};


exports.updateJugador = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const alias = req.body.alias;
    const fechaNac = req.body.fechaNac;
    const posicion = req.body.posicion;
    const nroCamisa = req.body.nroCamisa;
    

    conexion.query('UPDATE jugador SET ? WHERE id = ?',[{nombre:nombre, alias:alias, fechaNac:fechaNac,posicion:posicion,nroCamisa:nroCamisa}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/jugadores');         
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

exports.updateEquipo = (req, res)=>{
    const codigoEquipo = req.body.codigoEquipo;
    const nombre = req.body.nombre;
    const directorT = req.body.directorT;
    const eslogan = req.body.eslogan;

    conexion.query('UPDATE equipo SET ? WHERE id = ?',[{codigoEquipo:codigoEquipo, nombre:nombre, directorT:directorT,eslogan:eslogan}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/equipos');         
        }
});
};

    
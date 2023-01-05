

const conexion = require("../database/db.cjs");

exports.save = (req, res) => {
  const name = req.body.name;
  const rol = req.body.rol;

  conexion.query(
    "INSERT INTO users SET ?",
    { name: name, rol: rol },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/");
      }
    }
  );
};

exports.saveArbitro = (req, res) => {
  const nombre = req.body.nombre;
  const rol = req.body.rol;
  const pais = req.body.pais;

  conexion.query(
    "INSERT INTO arbitro SET ?",
    { nombre: nombre, rol: rol, pais: pais },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/arbitros");
      }
    }
  );
};

exports.saveHotel = (req, res) => {
  const codHotel = req.body.codHotel;
  const nombre = req.body.nombre;
  const direccion = req.body.direccion;

  conexion.query(
    "INSERT INTO hotel SET ?",
    { codHotel: codHotel, nombre: nombre, direccion: direccion },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/hotel");
      }
    }
  );
};

exports.saveEquipo = (req, res) => {

    const nombre = req.body.nombre;
    const directorT = req.body.directorT;
    const eslogan = req.body.eslogan;
    conexion.query(
      "SELECT siglas FROM pais WHERE nombre = ?",
      [nombre],
      (error, results) => {
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al guardar el equipo!',
          });
          res.sendStatus(500);
          return;
        }
        let codigo = results[0].siglas;

        conexion.query(
          "INSERT INTO equipo SET ?",
          {
            codigo: codigo,
            nombre: nombre,
            eslogan: eslogan,
            directorT: directorT
          },
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              const color1 = req.body.color1;
              const color2 = req.body.color2;

              conexion.query(
                "INSERT INTO color_uniforme SET ?",
                { id_equipo: codigo, color1: color1, color2: color2 },
                (error, results) => {
                  if (error) {
                    console.log(error);
                  } else {
                    res.redirect("/equipos");
                  }
                }
              );
            }
          }
        );
      }
    );
  };
        
    

exports.saveHospedaje = (req, res) => {
  let id_hotel = req.body.id_hotel;
  let fecha_inicio = req.body.fecha_inicio;
  // cambiar fecha_inicio a formato date

  let fecha_fin = req.body.fecha_fin;
  // obtener el codHotel de hotel y guardar en la variable id_hotel
  conexion.query(
    "SELECT codHotel FROM hotel WHERE nombre = ?",
    [id_hotel],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        id_hotel = results[0].codHotel;

        let id_equipo = req.body.id_equipo;

        id_equipo = conexion.query(
          "SELECT codigo FROM equipo WHERE nombre = ?",
          [id_equipo],
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              id_equipo = results[0].codigo;

              conexion.query(
                "INSERT INTO alojamiento SET ?",
                {
                  id_hotel: id_hotel,
                  id_equipo: id_equipo,
                  fecha_inicio: fecha_inicio,
                  fecha_fin: fecha_fin,
                },
                (error, results) => {
                  if (error) {
                    console.log(error);
                  } else {
                    res.redirect("/hospedaje");
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

exports.saveJugador = (req, res) => {
  const nombre = req.body.nombre;
  const alias = req.body.alias;
  const posicion = req.body.posicion;
  const nroCamisa = req.body.nroCamisa;
  const fechaNac = req.body.fechaNac;

  conexion.query(
    "INSERT INTO jugador SET ?",
    {
      nombre: nombre,
      alias: alias,
      fechaNac: fechaNac,
      posicion: posicion,
      nroCamisa: nroCamisa,
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/jugadores");
      }
    }
  );
};

exports.updateHotel = (req, res) => {
  const id = req.body.id;
  const codHotel = req.body.codHotel;
  const nombre = req.body.nombre;
  const direccion = req.body.direccion;

  conexion.query(
    "UPDATE hotel SET ? WHERE id = ?",
    [{ codHotel: codHotel, nombre: nombre, direccion: direccion }, id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/hotel");
      }
    }
  );
};

exports.updateJugador = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const alias = req.body.alias;
  const fechaNac = req.body.fechaNac;
  const posicion = req.body.posicion;
  const nroCamisa = req.body.nroCamisa;

  conexion.query(
    "UPDATE jugador SET ? WHERE id = ?",
    [
      {
        nombre: nombre,
        alias: alias,
        fechaNac: fechaNac,
        posicion: posicion,
        nroCamisa: nroCamisa,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/jugadores");
      }
    }
  );
};

//ACTUALIZAR un REGISTRO
exports.update = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const rol = req.body.rol;
  conexion.query(
    "UPDATE users SET ? WHERE id = ?",
    [{ name: name, rol: rol }, id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/");
      }
    }
  );
};

exports.updateArbitro = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const rol = req.body.rol;
  const pais = req.body.pais;
  conexion.query(
    "UPDATE arbitro SET ? WHERE id = ?",
    [{ nombre: nombre, rol: rol, pais: pais }, id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/arbitros");
      }
    }
  );
};



  exports.updateEquipo = (req, res) => {
  const codigo = req.body.codigo;
  const nombre = req.body.nombre;
  const directorT = req.body.directorT;
  const eslogan = req.body.eslogan;
  
    conexion.query("UPDATE equipo SET ? WHERE codigo = ?", [{nombre: nombre, directorT: directorT, eslogan: eslogan}, codigo], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/equipos");
      }
    });
  };
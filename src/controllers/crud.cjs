const conexion = require("../database/db.cjs");

// arbitros
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


exports.updateArbitro = (req, res) => {
  const codArbitro = req.body.codArbitro;
  const nombre = req.body.nombre;
  const rol = req.body.rol;
  const pais = req.body.pais;
  conexion.query(
    "UPDATE arbitro SET ? WHERE codArbitro = ?",
    [{ nombre: nombre, rol: rol, pais: pais }, codArbitro],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/arbitros");
      }
    }
  );
};

// hoteles

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

exports.updateHotel = (req, res) => {

  const codHotel = req.body.codHotel;
  const nombre = req.body.nombre;
  const direccion = req.body.direccion;

  conexion.query(
    "UPDATE hotel SET ? WHERE codHotel = ?",
    [{nombre: nombre, direccion: direccion }, codHotel],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/hotel");
      }
    }
  );
};

// Equipos

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
        
    
// hospedaje

exports.saveHospedaje = (req, res) => {
  let id_hotel = req.body.id_hotel;
  let fecha_inicio = req.body.fecha_inicio;
  let fecha_fin = req.body.fecha_fin;
  let nombreHotel = req.body.id_hotel;
  let nombreEquipo = req.body.id_equipo;


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
                  nombreHotel: nombreHotel,
                  nombreEquipo: nombreEquipo,
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

exports.updateHospedaje = (req, res) => {
  const id = req.body.id;
  const nombreHotel = req.body.nombreHotel;
  const nombreEquipo = req.body.nombreEquipo;
  const fecha_inicio = req.body.fecha_inicio;
  const fecha_fin = req.body.fecha_fin;

  conexion.query(
    "UPDATE alojamiento SET ? WHERE id = ?",
    [{ nombreHotel: nombreHotel, nombreEquipo: nombreEquipo, fecha_inicio: fecha_inicio, fecha_fin:fecha_fin }, id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/hospedaje");
      }
    }
  );
};


// jugadores

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


exports.saveConfederacion = (req, res) => {
  const nombre = req.body.nombre;
  const siglasConf = req.body.siglasConf;
  const nombreContinente = req.body.nombreContinente;

  conexion.query(
    "INSERT INTO confederacion SET ?",
    {
      nombre: nombre,
      siglasConf: siglasConf,
      nombreContinente: nombreContinente
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/confederaciones");
      }
    }
  );
};


exports.updateConfederacion = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const siglasConf = req.body.siglasConf;
  const nombreContinente = req.body.nombreContinente;

  conexion.query(
    "UPDATE confederacion SET ? WHERE id = ?",    
    [{ nombre: nombre, siglasConf: siglasConf, nombreContinente: nombreContinente }, id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/confederaciones");
      }
    }
  );
};


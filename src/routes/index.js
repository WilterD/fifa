import { Router } from "express";
const router = Router();
import conexion from '../database/db.cjs';
import mycrud from '../controllers/crud.cjs';

router.get("/", (req, res) => {
  conexion.query('SELECT * FROM users', (error, results) => {
    if(error){
      console.log(error);
    }else{
      res.render('index.ejs',{results:results})
    }
  });
});

//ruta para enviar los datos en formato json
router.get('/data', (req, res)=>{     
  conexion.query('SELECT * FROM users',(error, results)=>{
      if(error){
          throw error;
      } else {                                                   
          const data = JSON.stringify(results);
          res.send(data);          
      }   
  })
})

router.get("/arbitros", (req, res) => {
  conexion.query('SELECT * FROM arbitro', (error, resultados) => {
    if(error){
      console.log(error);
    }else{
      res.render('arbitros.ejs',{resultados:resultados})
    }
  });
});

router.get("/equipos", (req, res) => {
  conexion.query('SELECT * FROM equipo', (error, resultados) => {
    if(error){
      console.log(error);
    }else{
      res.render('equipos.ejs',{resultados:resultados})
    }
  });
});

router.get("/hotel", (req, res) => {
  conexion.query('SELECT * FROM hotel', (error, resultados) => {
    if(error){
      console.log(error);
    }else{
      res.render('hotel.ejs',{resultados:resultados})
    }
  });
});

router.get("/hospedaje", (req, res) => {
  conexion.query('SELECT * FROM alojamiento', (error, alojamientos) => {
    if(error){
      console.log(error);
    }else{
      conexion.query("SELECT nombre FROM equipo", (error, equipos) => {
        if(error){
          console.log(error);
        }else{
          res.render('hospedaje.ejs',{alojamientos:alojamientos,equipos:equipos})
              }
            });
          }
        });
      });



      

router.get("/jugadores", (req, res) => {
  conexion.query('SELECT * FROM jugador', (error, resultados) => {
    if(error){
      console.log(error);
    }else{
      res.render('jugadores.ejs',{resultados:resultados})
    }
  });
});

// trear los datos de la tabla pais cuando se crea equipo y traer todos los nombres de confederacion
router.get("/crearEquipo", (req, res) => {
  conexion.query('SELECT * FROM pais', (error, paises) => {
    if(error){
      console.log(error);
    }else{
      conexion.query('SELECT * FROM confederacion', (error, conf) => {
        if(error){
          console.log(error);
        }else{
          res.render('crearEquipo.ejs',{paises:paises,conf:conf})
        }
      });
    }
  });
});

router.get("/crearHospedaje", (req, res) => {
  conexion.query('SELECT nombre FROM hotel', (error, hoteles) => {
    if(error){
      console.log(error);
    }else{
      conexion.query('SELECT nombre FROM equipo', (error, equipos) => {
        if(error){
          console.log(error);
        }else{
          res.render('crearHospedaje.ejs',{hoteles:hoteles,equipos:equipos})
        }
      });
    }
  });
});

router.get("/crearArbitro", (req, res) => {
  conexion.query('SELECT nombre FROM pais', (error, paises) => {
    if(error){
      console.log(error);
    }else{
      res.render('crearArbitro.ejs',{paises:paises})
        }
      });
    }
  );


router.get("/crearGrupo", (req, res) => {
  res.render("crearGrupo.ejs");
})


router.get("/crearPartido", (req, res) => {
  conexion.query('SELECT * FROM jornadas', (error, jornadas)=>{
    if(error) {
      console.log(error);
    } else {
      conexion.query('SELECT * FROM estadio', (error, estadios)=> {
        if (error) {
          console.log(error);
        } else {
          conexion.query('SELECT * FROM ciudad', (error, ciudad)=>{
            if (error) {
              console.log(error);
            } else {
              res.render('crearPartido.ejs', {jornadas:jornadas, estadios:estadios, ciudad:ciudad});
            }
          });
          
        }
      })
    }
  });
})

router.get("/crearJugador", (req, res) => {
  conexion.query('SELECT * FROM jugador', (error, jugador) => {
    if(error){
      console.log(error);
    }else{
      res.render('crearJugador.ejs',{jugador:jugador})
    }
  });
});

// Editar un registro
router.get('/edit/:id', (req,res)=>{    
  const id = req.params.id;
  conexion.query('SELECT * FROM users WHERE id=?',[id] , (error, results) => {
      if (error) {
          throw error;
      }else{            
          res.render('edit.ejs', {name:results[0]});            
      }        
  });
});

router.get('/editarArbitro/:id', (req,res)=>{    
  const id = req.params.id;
  conexion.query('SELECT * FROM arbitro WHERE id=?',[id] , (error, results) => {
      if (error) {
          throw error;
      }else{            
          res.render('editarArbitro.ejs', {name:results[0]});            
      }        
  });
});

router.get('/editarHotel/:id', (req,res)=>{    
  const id = req.params.id;
  
  conexion.query('SELECT * FROM hotel WHERE id=?',[id] , (error, results) => {
      if (error) {
          throw error;
      }else{            
          res.render('editarHotel.ejs', {name:results[0]});            
      }        
  });
});

router.get('/editarJugador/:id', (req,res)=>{    
  const id = req.params.id;
  
  conexion.query('SELECT * FROM jugador WHERE id=?',[id] , (error, results) => {
      if (error) {
          throw error;
      }else{            
          res.render('editarJugador.ejs', {name:results[0]});            
      }        
  });
});

router.get('/editarEquipo/:codigo', (req,res)=>{    
  const codigo = req.params.codigo;
  conexion.query('SELECT * FROM equipo WHERE codigo=?',[codigo] , (error, results) => {
      if (error) {
          throw error;
      }else{            
        conexion.query('SELECT nombre FROM pais', (error, paises) => {
          if(error){
            console.log(error);
          }else{
            res.render('editarEquipo.ejs', {equipo:results[0],paises:paises});           
      } 
    });
  }
});
});      

// fin editar un registro

// Eliminar un registro

//RUTA PARA ELIMINAR UN REGISTRO SELECCIONADO
router.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  conexion.query('DELETE FROM users WHERE id = ?',[id], (error, results)=>{
      if(error){
          console.log(error);
      }else{           
          res.redirect('/');         
      }
  })
});

router.get('/deleteArbitro/:id', (req, res) => {
  const id = req.params.id;
  conexion.query('DELETE FROM arbitro WHERE id = ?',[id], (error, results)=>{
      if(error){
          console.log(error);
      }else{           
          res.redirect('/arbitros');         
      }
  })
});

router.get('/deleteHotel/:id', (req, res) => {
  const id = req.params.id;
  conexion.query('DELETE FROM hotel WHERE id = ?',[id], (error, results)=>{
      if(error){
          console.log(error);
      }else{           
          res.redirect('/hotel');         
      }
  })
});

router.get('/deleteEquipo/:codigo', (req, res) => {
  const codigo = req.params.codigo;
  conexion.query('DELETE FROM equipo WHERE codigo = ?',[codigo], (error, results)=>{
      if(error){
          console.log(error);
      }else{           
          res.redirect('/equipos');         
      }
  })
});


router.get('/deleteJugador/:id', (req, res) => {
  const id = req.params.id;
  conexion.query('DELETE FROM jugador WHERE id = ?',[id], (error, results)=>{
      if(error){
          console.log(error);
      }else{           
          res.redirect('/jugadores');         
      }
  })
});

router.get('/partidos', (req, res)=>{
  conexion.query('SELECT * FROM partido', (error, partidos)=>{
    if (error) {
      console.log(error);
    } else {
      res.render('partidos.ejs', {partidos:partidos});
    }
  })
  
})


// fin eliminar un registro

// Crear registros
router.get('/create', (req, res) => {
  res.render('create');
});

router.get('/crearHotel', (req, res) => {
  res.render('crearHotel');
});


// Guardar registros
router.post('/save', mycrud.save);
router.post('/saveArbitro', mycrud.saveArbitro);
router.post('/saveHotel', mycrud.saveHotel);
router.post('/saveJugador', mycrud.saveJugador);
router.post('/saveEquipo', mycrud.saveEquipo);
router.post('/saveHospedaje', mycrud.saveHospedaje);
router.post('/saveGrupo', mycrud.saveGrupo);
router.post('/savePartido', mycrud.savePartido);

// actualizar registros
router.post('/update', mycrud.update);
router.post('/updateArbitro', mycrud.updateArbitro);
router.post('/updateHotel', mycrud.updateHotel);
router.post('/updateJugador', mycrud.updateJugador);
router.post('/updateEquipo', mycrud.updateEquipo);

export default router;
import { Router } from "express";
const router = Router();
import conexion from '../database/db.cjs';
import mycrud from '../controllers/crud.cjs';

router.get("/arbitros", (req, res) => {
  conexion.query('SELECT * FROM arbitro', (error, resultados) => {
    if(error){
      console.log(error);
    }else{
      res.render('arbitros.ejs',{resultados:resultados})
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
  router.get('/editarArbitro/:codArbitro', (req,res)=>{    
    const codArbitro = req.params.codArbitro;
    conexion.query('SELECT * FROM arbitro WHERE codArbitro=?',[codArbitro] , (error, arbitro) => {
        if (error) {
            throw error;
        }else{  
                  console.log(arbitro)          
                  res.render('editarArbitro.ejs',{arbitro:arbitro}) 
                }
              });
            });

  router.get('/deleteArbitro/:codArbitro', (req, res) => {
    const codArbitro = req.params.codArbitro;
    conexion.query('DELETE FROM arbitro WHERE codArbitro = ?',[codArbitro], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/arbitros');         
        }
    })
  });

router.get("/equipos", (req, res) => {
  conexion.query('SELECT * FROM equipo', (error, resultados) => {
    if(error){
      console.log(error);
    }else{
      conexion.query("SELECT * from color_uniforme", (error,colores) =>{
        if(error){
          console.log(error);
        }else{
          res.render('equipos.ejs',{resultados:resultados,colores:colores})
        }
      })
    }
  });
});

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

router.get("/hotel", (req, res) => {
  conexion.query('SELECT * FROM hotel', (error, resultados) => {
    if(error){
      console.log(error);
    }else{
      res.render('hotel.ejs',{resultados:resultados})
    }
  });
});

router.get('/crearHotel', (req, res) => {
  res.render('crearHotel');
});


router.get('/editarHotel/:codHotel', (req,res)=>{    
  const codHotel = req.params.codHotel;
  
  conexion.query('SELECT * FROM hotel WHERE codHotel=?',[codHotel] , (error, results) => {
      if (error) {
          throw error;
      }else{            
          res.render('editarHotel.ejs', {name:results[0]});            
      }        
  });
});


router.get('/deleteHotel/:codHotel', (req, res) => {
  const codHotel = req.params.codHotel;
  conexion.query('DELETE FROM hotel WHERE codHotel = ?',[codHotel], (error, results)=>{
      if(error){
          console.log(error);
      }else{           
          res.redirect('/hotel');         
      }
  })
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

      router.get('/editarHospedaje/:id', (req,res)=>{    
        const id = req.params.id;
        
        conexion.query('SELECT * FROM alojamiento WHERE id=?',[id] , (error, alojamiento) => {
            if (error) {
                throw error;
            }else{         
              conexion.query('SELECT nombre FROM hotel', (error, hotel) => {
                if(error){
                  console.log(error);
                }else{
                  conexion.query('SELECT nombre FROM equipo' ,(error, equipo) => {
                    if(error){
                      console.log(error);
                    }else{
                      res.render('editarHospedaje.ejs', {hospedaje:alojamiento[0],hotel:hotel,equipo:equipo})
                    }
                  });
                }
              });
            }
          })});
      
      
      router.get('/deleteHospedaje/:id', (req, res) => {
        const id = req.params.id;
        conexion.query('DELETE FROM alojamiento WHERE id = ?',[id], (error, results)=>{
            if(error){
                console.log(error);
            }else{           
                res.redirect('/hospedaje');         
            }
        })
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

router.get("/crearJugador", (req, res) => {
  conexion.query('SELECT * FROM jugador', (error, jugador) => {
    if(error){
      console.log(error);
    }else{
      conexion.query("SELECT * FROM equipo", (error,equipos) =>{
        if(error){
          console.log(error);
        }else{
          res.render('crearJugador.ejs',{jugador:jugador,equipos:equipos})
        }
      })
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




router.get("/confederaciones", (req, res) => {
  conexion.query('SELECT * FROM confederacion', (error, conf) => {
    if(error){
      console.log(error);
    }else{
      res.render('confederaciones.ejs',{conf:conf})
    }
  });
});

router.get("/crearConfederacion", (req, res) => {
  conexion.query('SELECT * FROM confederacion', (error, conf) => {
    if(error){
      console.log(error);
    }else{
          res.render('crearConfederacion.ejs',{conf:conf})
        }
      });
    }
  );

router.get('/editarConfederacion/:id', (req,res)=>{    
  const id = req.params.id;
  conexion.query('SELECT * FROM confederacion WHERE id=?',[id] , (error, conf) => {
      if (error) {
          throw error;
      }else{       
              res.render('editarConfederacion.ejs',{conf:conf[0]})
            }     
          }
        );
      }
    );
  
    
      

router.get('/deleteConfederacion/:id', (req, res) => {
  const id = req.params.id;
  conexion.query('DELETE FROM confederacion WHERE id = ?',[id], (error, results)=>{
      if(error){
          console.log(error);
      }else{           
          res.redirect('/confederaciones');         
      }
  })
});

            
                 
                   
  







// Guardar registros
router.post('/saveArbitro', mycrud.saveArbitro);
router.post('/saveHotel', mycrud.saveHotel);
router.post('/saveJugador', mycrud.saveJugador);
router.post('/saveEquipo', mycrud.saveEquipo);
router.post('/saveHospedaje', mycrud.saveHospedaje);
router.post('/saveConfederacion', mycrud.saveConfederacion);

// actualizar registros
router.post('/updateArbitro', mycrud.updateArbitro);
router.post('/updateHotel', mycrud.updateHotel);
router.post('/updateHospedaje', mycrud.updateHospedaje);
router.post('/updateJugador', mycrud.updateJugador);
router.post('/updateEquipo', mycrud.updateEquipo);
router.post('/updateConfederacion', mycrud.updateConfederacion);

export default router;
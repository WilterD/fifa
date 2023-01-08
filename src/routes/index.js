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
  conexion.query('SELECT * FROM pais', (error, paises) => {
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
                 conexion.query('SELECT nombrePais FROM pais', (error, paises) => {
                  if(error){
                    console.log(error);
                  }else{
                    res.render('editarArbitro.ejs', {arbitro:arbitro[0],paises:paises});
                  }
                }
              )
            }
           }
          )
         }
        )

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
  conexion.query('SELECT * FROM equipo', (error, equipos) => {
    if(error){
      console.log(error);
    }else{
      conexion.query("SELECT * from coloresUniforme", (error,colores) =>{
        if(error){
          console.log(error);
        }else{
          res.render('equipos.ejs',{equipos:equipos,colores:colores})
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

router.get('/editarEquipo/:codEquipo', (req,res)=>{    
  const codEquipo = req.params.codEquipo;
  conexion.query('SELECT * FROM equipo WHERE codEquipo=?',[codEquipo] , (error, equipos) => {
      if (error) {
          throw error;
      }else{            
        conexion.query('SELECT nombrePais FROM pais', (error, paises) => {
          if(error){
            console.log(error);
          }else{
            conexion.query('SELECT * FROM coloresuniforme WHERE codEquipo=?',[codEquipo] , (error, colores) => {
              if (error) {
                console.log(error);
              }else{
                  res.render('editarEquipo.ejs', {equipo:equipos[0],paises:paises,colores:colores[0]}); 
              }
            })
          }
        })
      }
    }
  )
}
)
               
                  
    


              
                  

router.get('/deleteEquipo/:codEquipo', (req, res) => {
  const codEquipo = req.params.codEquipo;
  conexion.query('DELETE FROM equipo WHERE codEquipo = ?',[codEquipo], (error, results)=>{
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
  conexion.query('SELECT * FROM alojan', (error, alojamientos) => {
    if(error){
      console.log(error);
    }else{
      conexion.query("SELECT codEquipo FROM equipo", (error, equipos) => {
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
        conexion.query('SELECT * FROM hotel', (error, hoteles) => {
          if(error){
            console.log(error);
          }else{
            conexion.query('SELECT * FROM equipo', (error, equipos) => {
              if(error){
                console.log(error);
              }else{
                conexion.query('SELECT * FROM partido', (error, partidos) => {
                  if(error){
                    console.log(error);
                  }else{
                    res.render('crearHospedaje.ejs',{hoteles:hoteles,equipos:equipos,partidos:partidos})
                  }
                });
              }
            });
          }
        });
      });

      router.get('/editarHospedaje/:codHotel+codEquipo+codPartido', (req,res)=>{    
        const id = req.params.id;
        
        conexion.query('SELECT * FROM alojan WHERE id=?',[id] , (error, alojan) => {
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
                      res.render('editarHospedaje.ejs', {hospedaje:alojan[0],hotel:hotel,equipo:equipo})
                    }
                  });
                }
              });
            }
          })});
      
      
      router.get('/deleteHospedaje/:id', (req, res) => {
        const id = req.params.id;
        conexion.query('DELETE FROM alojan WHERE id = ?',[id], (error, results)=>{
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

router.get('/editarJugador/:codJugador', (req,res)=>{    
  const codJugador = req.params.codJugador;
  
  conexion.query('SELECT * FROM jugador WHERE codJugador=?',[codJugador] , (error, results) => {
      if (error) {
          throw error;
      }else{            
          res.render('editarJugador.ejs', {name:results[0]});            
      }        
  });
});


router.get('/deleteJugador/:codJugador', (req, res) => {
  const codJugador = req.params.codJugador;
  conexion.query('DELETE FROM jugador WHERE codJugador = ?',[codJugador], (error, results)=>{
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


router.get("/crearGrupo", (req, res) => {
  res.render("crearGrupo.ejs");
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
router.get('/editarConfederacion/:siglasConf', (req,res)=>{    
  const siglasConf = req.params.siglasConf;
  conexion.query('SELECT * FROM confederacion WHERE siglasConf=?',[siglasConf] , (error, conf) => {
      if (error) {
          throw error;
      }else{       
              res.render('editarConfederacion.ejs',{conf:conf[0]})
            }     
          }
        );
      }
    );
  
    
      

router.get('/deleteConfederacion/:siglasConf', (req, res) => {
  const siglasConf = req.params.siglasConf;
  conexion.query('DELETE FROM confederacion WHERE siglasConf = ?',[siglasConf], (error, results)=>{
      if(error){
          console.log(error);
      }else{           
          res.redirect('/confederaciones');         
      }
  })
});


router.get("/paises", (req, res) => {
  conexion.query('SELECT * FROM pais', (error, resultados) => {
    if(error){
      console.log(error);
    }else{
      res.render('paises.ejs',{resultados:resultados})
    }
  });
});

router.get("/crearPais", (req, res) => {
  conexion.query('SELECT * FROM confederacion', (error, resultados) => {
    if(error){
      console.log(error);
    }else{
      res.render('crearPais.ejs',{resultados:resultados})
    }
  });
});

router.get('/editarPais/:codPais', (req,res)=>{    
  const codPais = req.params.codPais;
  conexion.query('SELECT * FROM pais WHERE codPais=?',[codPais] , (error, pais) => {
      if (error) {
          throw error;
      }else{  
                conexion.query('SELECT nombreConf FROM confederacion', (error, conf)=>{
                  if(error){
                    console.log(error);
                  }else{
                    res.render('editarPais.ejs',{pais:pais[0],conf:conf}) 
                }
                })
              }
            })
          });
                

router.get('/deletePais/:codPais', (req, res) => {
  const codPais = req.params.codPais;
  conexion.query('DELETE FROM pais WHERE codPais = ?',[codPais], (error, results)=>{
      if(error){
          console.log(error);
      }else{           
          res.redirect('/paises');         
      }
  })
});

          
        
                   
  
router.get("/", (req, res) => {
  conexion.query('SELECT COUNT(*) AS cantidadPaises FROM pais', (error, resultadosPaises) => {
    if(error){
      console.log(error);
    }else{
      conexion.query('SELECT COUNT(*) AS cantidadEquipos FROM equipo', (error, resultadosEquipos) => {
      
      if(error){
        console.log(error);
      }else{

        conexion.query('SELECT COUNT(*) AS cantidadJugadores FROM jugador', (error, resultadosJugadores) => {
          if(error){
            console.log(error);
          }else{
            conexion.query('SELECT COUNT(*) AS cantidadHoteles FROM equipo', (error, resultadosHoteles) => {
              if(error){
                console.log(error);
              }else{
                conexion.query('SELECT COUNT(*) AS cantidadArbitros FROM arbitro', (error, resultadosArbitros) => {
                  if(error){
                    console.log(error);
                  }else{
                    conexion.query('SELECT COUNT(*) AS cantidadEstadios FROM estadio', (error, resultadosEstadios) => {
                      if(error){
                        console.log(error);
                      }else{

                        res.render('dashboard.ejs',{
                          cantidadPaises:resultadosPaises[0].cantidadPaises,   
                          cantidadEquipos:resultadosEquipos[0].cantidadEquipos,
                          cantidadJugadores:resultadosJugadores[0].cantidadJugadores,
                          cantidadArbitros:resultadosArbitros[0].cantidadArbitros,
                          cantidadHoteles:resultadosHoteles[0].cantidadHoteles,
                          cantidadEstadios:resultadosEstadios[0].cantidadEstadios});
                      }
                    });
                  }
                });
              }
            })} 
          })}
        })}
      })}
    );


    router.get('/partidos', (req, res)=>{
      conexion.query('SELECT * FROM partido', (error, partidos)=>{
        if (error) {
          console.log(error);
        } else {
          res.render('partidos.ejs', {partidos:partidos});
        }
      })
      
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
              conexion.query('SELECT * FROM equipo', (error, equipos)=>{
                if (error) {
                  console.log(error);
                } else {
                  conexion.query('SELECT * FROM pais', (error, paises) =>{
                    if (error) {
                      console.log(error);
                    } else {
    
                      conexion.query('SELECT * FROM arbitro', (error, arbitros) => {
                        if (error) {
                          console.log(error);
                        } else {
                          res.render('crearPartido.ejs', {jornadas:jornadas, estadios:estadios, equipos:equipos, paises:paises, arbitros});
                        }
                      });          
                    }
    
                  })
                  
                }
              });
              
            }
          })
        }
      });
    })


    router.get("/crearGrupo", (req, res) => {
      res.render("crearGrupo.ejs");
    })

    router.get('/grupos', (req, res)=>{
      conexion.query('SELECT * FROM grupo', (error, grupos)=>{
        if (error) {
          console.log(error);
        } else {
          res.render('grupos.ejs', {grupos:grupos});
        }
      })
      
    })


    router.get('/deleteGrupo/:letraGrupo', (req, res) => {
      const letraGrupo = req.params.letraGrupo;
      conexion.query('DELETE FROM grupo WHERE letraGrupo = ?',[letraGrupo], (error, results)=>{
          if(error){
              console.log(error);
          }else{           
              res.redirect('/grupos');         
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
router.post('/savePais', mycrud.savePais);
router.post('/saveGrupo', mycrud.saveGrupo);
router.post('/savePartido', mycrud.savePartido);

// actualizar registros
router.post('/updateArbitro', mycrud.updateArbitro);
router.post('/updateHotel', mycrud.updateHotel);
router.post('/updateHospedaje', mycrud.updateHospedaje);
router.post('/updateJugador', mycrud.updateJugador);
router.post('/updateEquipo', mycrud.updateEquipo);
router.post('/updateConfederacion', mycrud.updateConfederacion);
router.post('/updatePais', mycrud.updatePais);

export default router;
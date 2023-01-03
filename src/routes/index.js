import { Router } from "express";
const router = Router();
import conexion from '../database/db.cjs';
import mycrud from '../controllers/crud.cjs';
// const { json } = require('express');

router.get("/", (req, res) => {
  conexion.query('SELECT * FROM users', (error, results) => {
    if(error){
      console.log(error);
    }else{
      res.render('index.ejs',{results:results})
      console.log(results)
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
      console.log(resultados)
    }
  });
});

router.get("/hotel", (req, res) => {
  conexion.query('SELECT * FROM hotel', (error, resultados) => {
    if(error){
      console.log(error);
    }else{
      res.render('hotel.ejs',{resultados:resultados})
      console.log(resultados)
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

// fin eliminar un registro






router.get('/create', (req, res) => {
  res.render('create');
});

router.get('/crearArbitro', (req, res) => {
  res.render('crearArbitro');
});

router.get('/crearHotel', (req, res) => {
  res.render('crearHotel');
});

router.post('/save', mycrud.save);
router.post('/saveArbitro', mycrud.saveArbitro);
router.post('/saveHotel', mycrud.saveHotel);

router.post('/update', mycrud.update);
router.post('/updateArbitro', mycrud.updateArbitro);
router.post('/updateHotel', mycrud.updateHotel);

export default router;
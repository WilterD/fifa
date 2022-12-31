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
      console.log(results)
    }
  });
});

router.get("/arbitros", (req, res) => {
  conexion.query('SELECT * FROM arbitro', (error, results) => {
    if(error){
      console.log(error);
    }else{
      res.render('arbitros.ejs',{results:results})
      console.log(results)
    }
  });
});



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


router.get('/create', (req, res) => {
  res.render('create');
});

router.get('/crearArbitro', (req, res) => {
  res.render('crearArbitro');
});

router.post('/save', mycrud.save);
router.post('/saveArbitro', mycrud.saveArbitro);
router.post('/update', mycrud.update);

export default router;
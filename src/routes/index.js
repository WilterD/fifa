import { Router } from "express";
const router = Router();
import conexion from '../database/db.cjs';

// const router = express.Router();


router.get("/", (req, res) => {
  // res.render('index',{title: 'Home'});
  conexion.query('SELECT * FROM users', (error, results) => {
    if(error){
      console.log(error);
    }else{
      res.send(results)
    }
  });
});

router.get("/about", (req, res) => {
  res.render('about',{title: 'Home'});
});

export default router;
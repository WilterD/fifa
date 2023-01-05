import express from 'express';
import 'express-async-errors';
import {dirname, join} from 'path'; 
import {fileURLToPath} from 'url'; 
import indexRoutes from './routes/index.js';


const app = express(); // referenciar a express



const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', join(__dirname,'views')); 
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
// como capturamos los datos de los formularios
app.use(express.json());

app.use('/', indexRoutes);
app.use(express.static(join(__dirname,'public')));


app.use((err, req, res, next) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Ha ocurrido un error inesperado!',
  });
  res.sendStatus(500);
});

app.listen(3000, () => {
  console.log('Server iniciado en puerto 3000');
});


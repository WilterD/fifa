import express from 'express';
import {dirname, join} from 'path'; 
import {fileURLToPath} from 'url'; 
import bodyParser from 'body-parser';
import indexRoutes from './routes/index.js';


const app = express(); // referenciar a express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', join(__dirname,'views')); 
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
// como capturamos los datos de los formularios
app.use(express.json());

app.use('/', indexRoutes);
app.use(express.static(join(__dirname,'public')));


const port = process.env.PORT || 3000;




app.listen(port, () => {
  console.log('Server iniciado en puerto 3000');
});


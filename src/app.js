import express from 'express';
import cors from 'cors';
import config from './config';
import index from './routes/index.routes';
import products from './routes/products.routes'
import pago from './routes/pago.routes'
const app = express();

app.set('port', config.port);

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(index)
app.use(products)
app.use(pago)


export default app;
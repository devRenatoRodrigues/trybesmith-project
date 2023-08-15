import express from 'express';
import productRouter from './routes/products.router';
import oderRouter from './routes/orders.router';
import loginRouter from './routes/login.router';

const app = express();

app.use(express.json());

app.use(productRouter);
app.use(oderRouter);
app.use(loginRouter);

export default app;

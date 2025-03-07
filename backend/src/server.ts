import express from 'express';
import initRouts from './routes/routes.ts';
import connectDB from './database/database.ts';
import cors from 'cors';


const app = express();
app.use(cors())

connectDB();
initRouts(app)

const port = 8080;

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));

app.get('/getTeste', (req, res) => {
    res.send('GET: Requisição recebida com sucesso!');
});

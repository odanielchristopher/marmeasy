import express from 'express';
import cors from 'cors';
import router from './http/routes/router';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

 
app.listen(3333, () => console.log('server running on port 3333'));

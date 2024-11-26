import express from 'express';

import { Request, Response, Router } from 'express';

const app = express();

const route = Router();

app.use(express.json());

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' });
});

app.use(route);


app.listen(3333, () => console.log('server running on port 3333'));

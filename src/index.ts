import express, { Application, json, urlencoded } from 'express';

const app: Application = express();
const port = 3000;

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(json());

app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));

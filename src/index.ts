import express, { Application, json, urlencoded, Request, Response, NextFunction } from 'express';
import { ValidateError } from 'tsoa';
import { AxiosError } from 'axios';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from '../src/routes';

const app: Application = express();
const port = 3000;

// Use body parser to read sent json payloads
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import('../public/swagger.json')));
});

RegisterRoutes(app);

app.use(function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
  console.log('err: ', err);
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }

  if (err instanceof AxiosError) {
    if (err.response) {
      const { status, statusText } = err.response;
      return res.status(status).json({
        message: statusText,
      });
    }
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
  next();
});

app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));

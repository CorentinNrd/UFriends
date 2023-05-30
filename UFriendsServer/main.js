import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

import users from './routes/UsersRoutes.js';
import auth from './routes/AuthRouter.js';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UFriends API',
      version: '1.0.0',
      description: 'Social networks API',
      contact: {
        name: 'API Support',
        url: 'https://twitter.com/codanrd',
        email: 'coconrd@icloud.com',
      },
      servers: {
        url: 'http://localhost:7895',
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
  },
  apis: ['routes/*.js'],
};

const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/users', users);
app.use('/auth', auth);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to UFriends API');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

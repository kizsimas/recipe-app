import express from 'express';
import dotenv from 'dotenv';
import recipeController from './recipes/recipes.controller';
import unitController from './units/units.controller';
import yaml from "yamljs";
import cors from 'cors';
import productsController from './products/products.controller';
import plansController from './plans/plans.controller';
import bodyParser from 'body-parser';
const app = express();
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple Express API application documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./recipes/recipes.controller.ts'], // Files containing annotations
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

dotenv.config();

const port = process.env.SERVER_PORT;
app.use(cors())


app.use("/recipes", recipeController);
app.use("/units", unitController);
app.use("/products", productsController);
app.use("/plans", plansController)


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
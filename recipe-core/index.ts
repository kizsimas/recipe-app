import express from 'express';
import dotenv from 'dotenv';
import recipeController from './recipes/recipes.controller';
import unitController from './units/units.controller';
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import cors from 'cors';
import productsController from './products/products.controller';
import bodyParser from 'body-parser';
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const swaggerFile = yaml.load('./swagger.yaml');
dotenv.config();

const port = process.env.SERVER_PORT;
app.use(cors())


app.use("/recipes", recipeController);
app.use("/units", unitController);
app.use("/products", productsController);

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile)
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
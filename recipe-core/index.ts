import express from 'express';
import dotenv from 'dotenv';
import recipeController from './recipes/recipes.controller';
import unitController from './units/units.controller';
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

const swaggerFile = yaml.load('./swagger.yaml');
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use("/recipes", recipeController);
app.use("/units", unitController);

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile)
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
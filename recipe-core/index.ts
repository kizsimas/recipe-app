import express from 'express';
import dotenv from 'dotenv';
import recipeController from './recipes/recipes.controller';
import unitController from './units/units.controller';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use("/recipes", recipeController);
app.use("/units", unitController);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
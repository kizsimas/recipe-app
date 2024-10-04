import { Recipe } from '@prisma/client';
import * as recipeRepository from './recipes.repository';
import * as stepsService from '../steps/steps.service';
import * as recipeProductsService from '../recipeProduct/recipeProducts.service';
import { RecipeDto } from './recipes.types';
import * as unitsService from '../units/units.service';
import * as procutsService from '../products/products.service';
import axios from 'axios';

export const getRecipe = async (recipeId: number): Promise<Recipe | null> => {
    return (await recipeRepository.getRecipe(recipeId)) as Recipe;
}

export const getAllRecipes = async (): Promise<Recipe[]> => {
    return (await recipeRepository.getAllRecipes()).map((recipe) => recipe as Recipe);
}

export const saveRecipe = async (recipe: RecipeDto): Promise<Recipe> => {
    const savedRecipe = await recipeRepository.saveRecipe(recipe);
    return savedRecipe as Recipe;
};

export const deleteRecipe = async (recipeId: number): Promise<Recipe> => {
    const deletedStepsCount = await stepsService.deleteStepsByRecipeId(recipeId);
    const deletedRecipeProductsCount = await recipeProductsService.deleteRecipeProductsByRecipeId(recipeId);

    return (await recipeRepository.deleteRecipe(recipeId)) as Recipe;
}

export const convertRecipe = async () => {
    const units = await unitsService.getUnits();
    const procuts = await procutsService.getAllgetProducts();
    const exampleRecipe = await getRecipe(14);
    const recipeText = "Tai yra dar vienas mano favoritas iš greitų ir maistingų pietų serijos. Panašu į tuna melt sumuštinį, tik kitoje formoje – ryškaus skonio tuno įdarą kartu su čederio sūriu, salota ir jalapenais suku į didelę SANTA MARIA tortilją, kuri apskrudinus tampa traški. Labai greiti, skanūs, sotūs ir daug baltymų turintys pietūs! Tuno įdarui reikės: 1 skardinės tuno savo sultyse (apie 160 g tuno) 3 mažų marinuotų agurkėlių 1/2 raudonojo svogūno 2 v.š. konservuotų kukurūzų Saujelės šviežių krapų 1 v.š. graikiško jogurto 1 a.š. majonezo 1/2 a.š. dižono garstyčių 1 v.š. citrinos sulčių Druskos, pipirų Tortilijoms reikės: 1 didelės SANTA MARIA tortilijos Mėgstamų salotų lapų Čederio sūrio Konservuotų jalapenų Alyvuogių aliejaus Gaminame: Ruošiame įdarą: sumaišome tuną, smulkiais kubeliais pjaustytus agurkėlius ir svogūną, kukurūzus, smulkintus krapus, jogurtą, majonezą, garstyčias, citrinos sultis, druską ir pipirus. Tortilijos centre formuodami kvadratą dedame salotas, tuno įdarą, tarkuotą čederio sūrį ir jalapeno griežinėlius. Užlenkiame tortilijos kraštus, viršų apipurškiame ar aptepame alyvuogių aliejumi ir kepame karšto oro gruzdintuvėje 180 laipsnių apie 10 min, kol gražiai apskrunda. Taip pat galima kepti tiesiog keptuvėje po keletą minučių iš abiejų pusių arba orkaitėje 200 laipsnių su vėjelio funkcija apie 10 min.";

    const response = await axios.post("http://127.0.0.1:8000/convert", {
        exampleRecipeJson: JSON.stringify(exampleRecipe),
        currentProductsJson: JSON.stringify(procuts),
        currentUnitsJson: JSON.stringify(units),
        recipeRawText: JSON.stringify(recipeText)
    })
    return JSON.parse(response.data.text);
}
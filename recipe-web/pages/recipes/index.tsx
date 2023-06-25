import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import  RecipeList from '../../components/RecipeList/recipeList'
import {fetchRecipes} from "../../api/recipes.service";
import Link from "next/link";
import { Recipe } from '../../components/CreateRecipeForm/CreteRecipeForm.types';

export const getServerSideProps: GetServerSideProps<{
  recipes: Recipe[]
}> = async () =>  {
  const recipes = await fetchRecipes();
  return {
    props: {
      recipes
    }
  }
}

const Recipes: NextPage<{recipes: Recipe[]}> = (props) => {

  const renderContent = () => {
    return <RecipeList recipes={props.recipes} />;
  }

  return (
    <div>
      <Head>
        <title >Recipes</title>
      </Head>

      <main>
        <h1 className="text-center text-3xl font-bold underline text-blue-500 mr-2">
          Recipes
        </h1>
        <Link href={"/recipes/create"}>Create Recipe</Link>
        {renderContent()}
      </main>
    </div>
  )
}
 
export default Recipes

import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { RecipeList } from './components/recipeList'
import {fetchRecipes} from "../../api/recipes.service";
import Link from "next/link";

const Recipes: NextPage = () => {
  const { data, isLoading, isError } = useQuery('recipes', async () =>  fetchRecipes());

  const renderContent = () => {
    if (isLoading) {
      return <>LOADING</>;
    }

    if (isError) {
      return <>ERROR</>;
    }

    return <RecipeList recipes={data} />;
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

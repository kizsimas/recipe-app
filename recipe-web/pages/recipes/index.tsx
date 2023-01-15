import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { RecipeList } from './components/recipeList'

const Recipes: NextPage = () => {
  const { data, status } = useQuery('recipes', async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes`)
    return response.json()
  })

  return (
    <div>
      <Head>
        <title >Recipes</title>
      </Head>

      <main>
        <h1 className="text-center text-3xl font-bold underline text-blue-500 mr-2">
          Recipes
        </h1>
        <div>
          {
            status === "loading" && <div>LOADING</div>
          }
          {
            status === "success" && <RecipeList recipes={data} />
          }
        </div>
      </main>
    </div>
  )
}
 
export default Recipes

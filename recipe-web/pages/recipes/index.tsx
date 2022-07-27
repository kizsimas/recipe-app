import type { NextPage } from 'next'
import Head from 'next/head'

const Recipes: NextPage = () => {
  return (
    <div>
      <Head>
        <title >Recipes</title>
      </Head>

      <main>
        <h1 className="text-center text-3xl font-bold underline text-blue-500">
          Recipes
        </h1>
      </main>
    </div>
  )
}

export default Recipes

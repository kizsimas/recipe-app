import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import {fetchRecipes} from "../../api/recipes.service";
import Link from "next/link";
import { Recipe } from '../../components/CreateRecipeForm/CreteRecipeForm.types';
import classNames from "classnames/bind";
import styles from "./Recipes.module.scss";
import Card from "../../components/Card";

const cx = classNames.bind(styles);

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
  const { recipes } = props;

  const renderContent = () => {
    return <div className={cx('recipes')}>
      {
        recipes.map((recipe: any) => <Card key={recipe.id} title={recipe.name} description={recipe.description} pictureUrl={recipe.pictureUrl} />)
      }
    </div>
  }

  return (
    <div>
      <Head>
        <title>Recipes</title>
      </Head>

      <main className={cx('body')}>
        <h1 className={cx('heading')}>
          Recipes
        </h1>

        <Link href={"/recipes/create"}>Create Recipe</Link>
        {renderContent()}
      </main>
    </div>
  )
}
 
export default Recipes

import {NextPage} from "next";
import Head from "next/head";
import classNames from "classnames/bind";
import styles from "./CreateRecipe.module.scss";
import CreateRecipeForm from "./components/CreateRecipeForm";

const cx = classNames.bind(styles);

const CreateRecipe: NextPage = () => {
  return (
      <div>
        <Head>
          <title>Create Recipe</title>
        </Head>

        <main className={cx('body')}>
          <h1 className={cx('heading')}>
            Create Recipe
          </h1>

          <div>
            <CreateRecipeForm />
          </div>
        </main>
      </div>
  )
}

export default CreateRecipe

import {GetServerSideProps, NextPage} from "next";
import Head from "next/head";
import classNames from "classnames/bind";
import styles from "../../../styles/CreateRecipe.module.scss"
import { getUnitsData } from "../../../lib/unitsLoader";
import { Unit } from "../../../types/unit.types";
import { Product } from "../../../types/product.types";
import { fetchProducts } from "../../../api/products.service";
import CreateRecipeForm from "../../../components/CreateRecipeForm/CreateRecipeForm";

export const getServerSideProps: GetServerSideProps<{
  units: Unit[],
  products: Product[]
}> = async () =>  {
  const units = await getUnitsData();
  const products = await fetchProducts();
  return {
    props: {
      units,
      products
    }
  }
}

const cx = classNames.bind(styles);

const CreateRecipe: NextPage<{units: Unit[], products: Product[]}> = (props) => {
  const { units, products } = props;
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
            <CreateRecipeForm units={units} products={products} />
          </div>
        </main>
      </div>
  )
}

export default CreateRecipe

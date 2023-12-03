import {GetServerSideProps, NextPage} from "next";
import Head from "next/head";
import classNames from "classnames/bind";
import styles from "../../../styles/CreateRecipe.module.scss"
import { getUnitsData } from "../../../lib/unitsLoader";
import { Unit } from "../../../types/unit.types";
import { Product } from "../../../types/product.types";
import { fetchProducts } from "../../../api/products.service";
import {useState} from "react";
import AddIngredientDialog from "./AddIngredientDialog";
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
  const { units } = props;
  const [products, setProducts] = useState(props.products);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);

  const handleIngredientCreated = async () => {
    setIsIngredientModalOpen(false);
    setProducts(await fetchProducts());
  }

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
            <CreateRecipeForm units={units} products={products} isIngredientModalOpen={isIngredientModalOpen} setIsIngredientModalOpen={setIsIngredientModalOpen} />
          </div>
        </main>
        <AddIngredientDialog isOpen={isIngredientModalOpen} onClose={() => setIsIngredientModalOpen(false)} onCreated={handleIngredientCreated}/>
      </div>
  )
}

export default CreateRecipe

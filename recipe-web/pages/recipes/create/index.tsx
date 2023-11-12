import {GetServerSideProps, NextPage} from "next";
import Head from "next/head";
import classNames from "classnames/bind";
import styles from "../../../styles/CreateRecipe.module.scss"
import { getUnitsData } from "../../../lib/unitsLoader";
import { Unit } from "../../../types/unit.types";
import { Product } from "../../../types/product.types";
import { fetchProducts } from "../../../api/products.service";
import CreateRecipeForm from "../../../components/CreateRecipeForm/CreateRecipeForm";
import Modal from "../../../components/Modal/Modal";
import {useState} from "react";
import {DialogContentText, TextField} from "@mui/material";

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
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);

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
        <Modal isOpen={isIngredientModalOpen} handleClose={() => setIsIngredientModalOpen(false)} body={<>
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="New Ingredient"
              fullWidth
              variant="standard"
          /></>} handleSave={() => {}} title="Create Ingredient"/>
      </div>
  )
}

export default CreateRecipe

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import classNames from "classnames/bind";
import styles from "./CreatePlan.module.scss";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { fetchProducts } from "../../../api/products.service";
import { getUnitsData } from "../../../lib/unitsLoader";
import { Product } from "../../../types/product.types";
import { Unit } from "../../../types/unit.types";
import { Autocomplete, TextField } from "@mui/material";
import products from "../../products";
import { fetchRecipes } from "../../../api/recipes.service";
import { Recipe } from "../../../components/CreateRecipeForm/CreteRecipeForm.types";
import { useState } from "react";
import {
  Plan,
  PlanGroup,
  PlanGroupMeal,
  ProductSelection,
} from "../../../types/plan.types";
import ProductSelectCards from "../../../components/Products/ProductSelectCards";
import CreatePlanGrouping from "./components/CreatePlanGroup";
import { createPlan } from "../../../api/plans.service";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

export const getServerSideProps: GetServerSideProps<{
  units: Unit[];
  products: Product[];
  recipes: Recipe[]
}> = async () => {
  const units = await getUnitsData();
  const products = await fetchProducts();
  const recipes = await fetchRecipes();
  return {
    props: {
      units,
      products,
      recipes,
    },
  };
};

interface CreateRecipeFormProps {
  units: Unit[];
  products: Product[];
  recipes: Recipe[];
}

const CreatePlan: NextPage<CreateRecipeFormProps> = (
  props: CreateRecipeFormProps
) => {
  const { units, products, recipes } = props;

  const router = useRouter();

  const [customProducts, setCustomProducts] = useState<ProductSelection[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [planGroupings, setPlanGroupings] = useState<PlanGroup[]>([]);
  const [planName, setPlanName] = useState<string>("Plan Name")

  const renderProduct = (product: ProductSelection) => {
    const productName = props.products.find(
      (x) => x.id === product.productId
    )?.name;
    const unitName = props.units.find((x) => x.id == product.unitId);

    return (
      <div key={product.productId}>
        <div>
          {productName} {product.count} {unitName?.measurement}
        </div>
        <div onClick={() => removeProduct(product.productId)}>X</div>
      </div>
    );
  };

  const addGroup = () => {
    setPlanGroupings([
      ...planGroupings,
      {
        name: "Group",
        planGroupMeals: [ {
          name: "Meal",
          recipeId: null
        }],
        id: Math.random().toString(),
      },
    ]);
  };

  const addProduct = () => {
    setSidebarOpen(true);
  };

  const removeProduct = (productId: number) => {
    setCustomProducts(customProducts.filter((x) => x.productId !== productId));
  };

  const onAddCustomProduct = (productSelection: ProductSelection) => {
    if (
      customProducts.some((x) => x.productId === productSelection.productId)
    ) {
      setCustomProducts([
        ...customProducts.filter(
          (x) => x.productId !== productSelection.productId
        ),
        productSelection,
      ]);
    } else {
      setCustomProducts([...customProducts, productSelection]);
    }
  };

  const handleUpdatePlanGrouping = (planGrouping: PlanGroup) => {
    const grouping = planGroupings.find((x) => x.id === planGrouping.id);
    const newGroupings = [
      ...planGroupings.filter((x) => x.id !== planGrouping.id),
      planGrouping,
    ]
    if(grouping && newGroupings) {
      setPlanGroupings(newGroupings);
    }
  };

  const handleAddNewMeal = (planGrouping: PlanGroup) => {
    const grouping = planGroupings.find((x) => x.id === planGrouping.id);
    if(grouping) {
      const newGrouping: PlanGroup = {...grouping, planGroupMeals: [...grouping.planGroupMeals, { name: "meal", recipeId: null}] }
      setPlanGroupings([
        ...planGroupings.filter((x) => x.id !== planGrouping.id),
        newGrouping
      ]);
    }
  }

  const savePlan = () => {
    const plan: Plan = {
      id: null,
      name: planName,
      planGroups: planGroupings,
      products: customProducts
    }

    createPlan(plan).then(() => router.push('/plans'));
  }

  const handleChangePlanName = (event: any) => {
    setPlanName(event.target.value);
  }

  return (
    <div>
      <Head>
        <title>CREATE PLAN</title>
      </Head>

      <main className={cx("body")}>
        <h1 className={cx("heading")}>Create Plan</h1>

        <div className={cx("mainContainer")}>
          <div className={cx("mealsContainer")}>
            <input type="text" value={planName} onChange={handleChangePlanName}/>
            <div>Groups</div>
            {planGroupings.map((planGrouping, index) => (
              <CreatePlanGrouping
                key={planGrouping.id}
                planGrouping={planGrouping}
                recipes={recipes}
                onUpdate={handleUpdatePlanGrouping}
                onAddNewMeal={() => handleAddNewMeal(planGrouping)}
              />
            ))}
            <button onClick={addGroup}>Add Group</button>
          </div>
          <div className={cx("productsContainer")}>
            <div>Custom products:</div>
            {customProducts.map((product) => renderProduct(product))}
            <button onClick={addProduct}>Add product</button>
          </div>
          {sidebarOpen && (
            <div className={cx("sidebar")}>
              <div className={cx("sidebar-header")}>
                <div>Add product</div>
                <button onClick={() => setSidebarOpen(false)}>X</button>
              </div>
              <div className={cx("sidebar-content")}>
                <ProductSelectCards
                  products={products}
                  units={units}
                  addedProcuts={customProducts}
                  onAddProduct={onAddCustomProduct}
                />
              </div>
            </div>
          )}
        </div>
        <button onClick={savePlan}>SAVE</button>
      </main>
    </div>
  );
};

export default CreatePlan;

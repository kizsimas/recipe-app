import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { fetchRecipeById } from '../../api/recipes.service';

import styles from "./Recipe.module.scss";
import classNames from "classnames/bind";
import { fetchProducts } from '../../api/products.service';
import { Product } from '../../types/product.types';
import { fetchUnits } from '../../api/units.service';
import { Unit } from '../../types/unit.types';
import { Recipe } from '../../types/recipe.types';

const cx = classNames.bind(styles);

export const getServerSideProps: GetServerSideProps<{
    id: string | null
  }> = async (context) =>  {
    const { slug } = context.query;
    const recipe = await fetchRecipeById(slug as string);
    return {
      props: {
       id: slug as string || null,
       recipe: recipe,
      }
    }
  }

const RecipePage: NextPage<{id: string | null, recipe: Recipe}> = (props) => {
  const { recipe } = props;
  console.log(recipe);
    return (
      <div className={cx('main')}>
      <div className={cx('left-column')}>
          <div className={cx('header')}>
              {recipe.name}
          </div>
          <div className={cx('description-container')}>
              <div className={cx('image')}>
                  <img className={cx('picture')} src={recipe.pictureUrl || ''} alt="Recipe" />
              </div>
              <div className={cx('description')}>
                  {recipe.description}
              </div>
          </div>
          <div className={cx('products')}>
              {recipe.recipeProduct.map((recipeProduct) => (
                  <div className={cx('product-item')} key={recipeProduct.product.id}>
                      * {recipeProduct.value} {recipeProduct.unit.measurement} {recipeProduct.product.name}
                  </div>
              ))}
          </div>
      </div>
      <div className={cx('right-column')}>
          <div className={cx('steps')}>
              {recipe.recipeSteps.map((recipeStep) => (
                  <div key={recipeStep.id} className={cx('step-item')}>
                      <div className={cx('step-item-title')}>{recipeStep.title}</div>
                      <div>{recipeStep.description}</div>
                  </div>
              ))}
          </div>
      </div>
  </div>
      )
}

export default RecipePage;
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import classNames from "classnames/bind";
import styles from "./Plans.module.scss";
import Link from 'next/link';
import { fetchPlans } from '../../api/plans.service';
import { Plan } from '../../types/plan.types';
import PlanCard from './components/PlanCard';
import { fetchRecipes } from '../../api/recipes.service';
import { Recipe } from '../../components/CreateRecipeForm/CreteRecipeForm.types';
import { fetchProducts } from '../../api/products.service';

const cx = classNames.bind(styles);

export const getServerSideProps: GetServerSideProps<{}> = async () =>  {
  const plans = await fetchPlans();
  const recipes = await fetchRecipes();
  const products = await fetchProducts();
  return {
    props: {
      plans: plans,
      recipes: recipes,
      products: products
    }
  }
}

const Plans: NextPage<{ plans: Plan[], recipes: Recipe[], products: Product[] }> = (props) => {
  const { plans, recipes } = props;
  const renderContent = () => {
    console.log(plans);
    return <div>
       PLANS
    </div>
  }

  return (
    <div>
      <Head>
        <title>Plans</title>
      </Head>

      <main className={cx('body')}>
        <h1 className={cx('heading')}>
          Plans
        </h1>
        <div className={cx("planCardsContainer")}>
          {plans.map(plan => <PlanCard key={plan.id} plan={plan} recipes={recipes}/>)}
        </div>
        <Link href={"/plans/create"}>Create Plan</Link>
        {renderContent()}
      </main>
    </div>
  )
}
 
export default Plans

// Boilerplate NEXT component

import { Recipe } from "../../../components/CreateRecipeForm/CreteRecipeForm.types";
import { Plan } from "../../../types/plan.types";
import styles from "./PlanCard.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles);

interface PlanCardProps {
    plan: Plan,
    recipes: Recipe[]
}

const PlanCard: React.FC<PlanCardProps> = (props: PlanCardProps) => {
    const {plan, recipes} = props;

    const getRecipeName = (recipeId: number | null) => {
        console.log(recipeId);
        console.log(recipes);
        if(recipeId) {
             return (recipes.find(recipe => recipe.id === recipeId))?.name
        }
        else return '';
    }

    return <div  className={cx("planCard")}>
        <div className={cx("nameContainer")}>{plan.name}</div>
        <div className={cx("groupsContainer")}>
            {
                plan.planGroups.map((planGroup) => (
                    <div className={cx("group")} key={planGroup.id}>
                        <div  className={cx("groupName")}>{planGroup.name}</div>
                        <div className={cx("groupMeals")}>{planGroup.planGroupMeals?.map((groupMeal) => (
                            <div key={groupMeal.name}>
                                <div>{groupMeal.name} {getRecipeName(groupMeal.recipeId)}</div>
                            </div>
                        ))}</div>
                    </div>
                ))
            }

        </div>
        <div className={cx("productsContainer")}>{plan.name}</div>
    </div>
}

export default PlanCard
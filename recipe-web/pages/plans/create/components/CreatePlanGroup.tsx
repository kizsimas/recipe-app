import { useEffect, useRef, useState } from "react";
import {
  PlanGroup,
  PlanGroupMeal,
} from "../../../../types/plan.types";
import styles from "./CreatePlanGroup.module.scss";
import classNames from "classnames/bind";
import { Recipe } from "../../../../components/CreateRecipeForm/CreteRecipeForm.types";

const cx = classNames.bind(styles);

interface CreatePlanGroupingProps {
  planGrouping: PlanGroup;
  recipes: Recipe[];
  onUpdate: (planGrouping: PlanGroup) => void;
  onAddNewMeal: () => void;
}

const CreatePlanGrouping: React.FC<CreatePlanGroupingProps> = (
  props: CreatePlanGroupingProps
) => {
  const { planGrouping, recipes } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(planGrouping.name);
  const [meals, setMeals] = useState<PlanGroupMeal[]>(
    planGrouping.planGroupMeals
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    console.log(planGrouping);
    setIsEditing(true);
  };

  const handleSave = () => {
    props.onUpdate({
      ...planGrouping,
      name: name,
      planGroupMeals: meals,
    });
    setIsEditing(false);
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  const handleMealNameChange = (index: number, newName: string) => {
    const updatedMeals = meals.map((meal, i) =>
      i === index ? { ...meal, name: newName } : meal
    );
    setMeals(updatedMeals);
  };

  const handleRecipeChange = (index: number, newRecipeId: string) => {
    const updatedMeals = meals.map((meal, i) =>
      i === index ? { ...meal, recipeId: parseInt(newRecipeId) } : meal
    );
    setMeals(updatedMeals);
  };

  const handleAddMeal = () => {
    const newMeal: PlanGroupMeal = {
      name: "New Meal",
      recipeId: null,
    };
    setMeals([...meals, newMeal]);
  };

  const getRecipeName = (groupingMeal: PlanGroupMeal) => {
    const recipe = recipes.find(x => parseInt(x.id) === groupingMeal.recipeId);
    return recipe?.name;
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div className={cx("grouping-container")}>
      <div className={cx("grouping-header")}>
        <div className={cx("grouping-name")}>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
          ) : (
            <span>{name}</span>
          )}
        </div>
        {isEditing ? (
          <button onClick={handleSave}>save</button>
        ) : (
          <button onClick={handleEdit}>edit</button>
        )}
      </div>
      <div>
        {meals.map((groupingMeal, index) => (
          <div key={index} className={cx("meal-container")}>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={groupingMeal.name}
                  onChange={(e) => handleMealNameChange(index, e.target.value)}
                />
                <select
                  value={groupingMeal.recipeId || ""}
                  onChange={(e) => handleRecipeChange(index, e.target.value)}
                >
                  <option value="">Select Recipe</option>
                  {recipes.map((recipe) => (
                    <option key={recipe.id} value={recipe.id}>
                      {recipe.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <span>{groupingMeal.name}</span>
                <span>
                    {getRecipeName(groupingMeal)}
                </span>
              </>
            )}
          </div>
        ))}
        {isEditing && <button onClick={handleAddMeal}>Add Meal</button>}
      </div>
    </div>
  );
};

export default CreatePlanGrouping;

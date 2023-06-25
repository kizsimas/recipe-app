import classNames from "classnames/bind"
import styles from "./CreateRecipeForm.module.scss"
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import {Recipe, Step} from "./CreteRecipeForm.types";
import { createRecipe } from "../../api/recipes.service";
import Button from "../Button/Button";

const cx = classNames.bind(styles);

const CreateRecipeForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { fields: ingredients, append: appendIngredient, remove: removeIngredient} = useFieldArray({
    control,
    name: "ingredients",
  });
  const { fields: steps, append: appendStep, remove: removeStep} = useFieldArray({
    control,
    name: "steps",
  });

  const onSubmit = (data: any) => {
    const recipe: Recipe = {
      name: data.name,
      description: data.description,
      defaultServingCount: Number.parseInt(data.defaultServingCount),
      source: data.source,
      pictureUrl: data.pictureUrl,
      ingredients: data.ingredients.map((ingredient: any) => ({
        ...ingredient,
        count: Number.parseInt(ingredient.count)
      })),
      steps: data.steps.map((step: Step) => ({
        ...step,
        title: 'title'
      })),
    };
    createRecipe(recipe);
  }

  const renderFormField = (fieldName: string, label: string, isMultiline?: boolean, type?: string) => {
    return <Controller
        name={fieldName}
        control={control}
        render={({ field }) => <TextField {...field} label={label} className={cx('item')} multiline={isMultiline} type={type} />}
    />
  }

  return (
      <div className={cx('body')}>
        <form onSubmit={handleSubmit(onSubmit)} className={cx('form')}>
          {renderFormField("name", "Name")}
          {renderFormField("description", "Description", true)}
          {renderFormField("defaultServingCount", "Serving Count", false, "number")}
          {renderFormField("source", "Source")}
          {renderFormField("pictureUrl", "Picture URL")}
          <div className={cx('subheader')}>Ingredients</div>
          <ul>
            {ingredients.map((item, index) => (
                <li key={item.id} className={cx('row')}>
                  <Controller
                      render={({ field }) => <TextField {...field} label="Ingredient" className={cx('row-item')} />}
                      name={`ingredients.${index}.value`}
                      control={control}
                  />
                  <Controller
                      render={({ field }) => <TextField {...field} label="Count" type="number" className={cx('row-item')} />}
                      name={`ingredients.${index}.count`}
                      control={control}
                  />
                  <Controller
                      render={({ field }) => <TextField {...field} label="Unit" className={cx('row-item')} />}
                      name={`ingredients.${index}.unit`}
                      control={control}
                  />
                  <button type="button" onClick={() => removeIngredient(index)} className={cx('form-button')}>Delete</button>
                </li>
            ))}
          </ul>
          <button type="button" onClick={() => appendIngredient({})} className={cx('form-button')}>
            Add Ingredient
          </button>
          <div className={cx('subheader')}>Steps</div>
          <ol>
            {steps.map((item, index) => (
                <li key={item.id} className={cx('row')}>
                  <Controller
                      render={({ field }) => <TextField {...field} label="Step" multiline className={cx('row-item')} />}
                      name={`steps.${index}.description`}
                      control={control}
                  />
                  <button type="button" onClick={() => removeStep(index)} className={cx('form-button')}>Delete</button>
                </li>
            ))}
          </ol>
          <button type="button" onClick={() => appendStep({ })} className={cx('form-button')}>
            Add Step
          </button>
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}
          <div className={cx('footer')}>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
  )
}

export default CreateRecipeForm;

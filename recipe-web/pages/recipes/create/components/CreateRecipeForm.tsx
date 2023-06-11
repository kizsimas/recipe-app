import classNames from "classnames/bind"
import styles from "./CreateRecipeForm.module.scss"
import { useForm } from "react-hook-form";
import {TextField} from "@mui/material";
import {createRecipe, postRecipe} from "../../../../api/recipes.service";

const cx = classNames.bind(styles);

interface Props {
  recipes: any[]
}

const CreateRecipeForm: React.FC<Props> = (props) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => createRecipe(data);

  return (
      <div className={cx('body')}>
        <form onSubmit={handleSubmit(onSubmit)} className={cx('form')}>
          <TextField label="Name" {...register("name", { required: true })} />
          <TextField label="Description" {...register("description", { required: true })} multiline />
          <TextField label="Serving Count" {...register("defaultServingCount")} type="number" />
          <TextField label="Source" {...register("source")} />
          <TextField label="Picture URL" {...register("pictureUrl")} />

          {/*
            // list recipeProduct - at least one required;
            // list steps - at least one required;
          */}

          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <button type="submit">Save</button>
        </form>
      </div>
  )
}

export default CreateRecipeForm;

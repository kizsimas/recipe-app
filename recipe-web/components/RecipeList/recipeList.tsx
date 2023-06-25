import { useState } from "react"

interface Props {
    recipes: any[]
}
const RecipeList: React.FC<Props> = (props) => {
    const [recipes, setRecipes] = useState([{ name: "recipe 1"}, {name: "recipe 2"}])
    return (
        <div className="full-width place-content-center">
            {
                props.recipes && props.recipes.map((recipe) => {
                    return <div key={recipe.id}>{recipe.name}</div>
                })
            }
        </div>
    )
}

export default RecipeList;
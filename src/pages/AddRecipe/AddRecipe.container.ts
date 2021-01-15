import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addRecipe } from "./AddRecipe.actions";
import AddRecipeComponent from "./AddRecipe.component";
import { AddRecipeActionType } from "./AddRecipe.types";

const mapDispatchToProps = (dispatch: Dispatch<AddRecipeActionType>) => ({
  onAddRecipe: (stepIngredient: string[][]) => (data: RecipeForm) => {
    if (data.steps) {
      data.steps = data.steps.map((step, index) => ({
        ...step,
        ingredients: stepIngredient[index],
      }));
    }

    dispatch(addRecipe(data));
  },
});

export default connect(null, mapDispatchToProps)(AddRecipeComponent);

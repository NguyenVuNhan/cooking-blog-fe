import { connect } from "react-redux";
import { IRootState } from "reducers/rootReducer";
import { Dispatch } from "redux";
import AddRecipeComponent from "./AddRecipe.component";
import { AddRecipeActionType } from "./AddRecipe.types";
import * as types from "./AddRecipe.types";
import { addRecipe } from "./AddRecipe.actions";

const mapStateToProps = (state: IRootState) => ({
  error: state.error[types.ADD_RECIPE],
});

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

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipeComponent);

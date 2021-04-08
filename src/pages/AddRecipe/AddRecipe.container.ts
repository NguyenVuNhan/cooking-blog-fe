import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { IRootState } from "reducers/rootReducer";
import { addRecipe } from "./AddRecipe.actions";
import AddRecipeComponent from "./AddRecipe.component";
import { ADD_RECIPE } from "./AddRecipe.types";

interface OwnProps {}

interface StateProps {
  loading: boolean;
}

interface DispatchProps {
  onAddRecipe: (stepIngredient: string[][]) => (data: RecipeForm) => void;
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, IRootState> = ({
  loading,
}) => {
  const isLoading = !!loading[ADD_RECIPE];
  return { loading: isLoading };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
  dispatch
) => ({
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

export type Props = OwnProps & DispatchProps & StateProps;
export default connect(mapStateToProps, mapDispatchToProps)(AddRecipeComponent);

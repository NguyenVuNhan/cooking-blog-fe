import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import GetRecipeComponent from "./Recipe.component";
import { deleteRecipe, getRecipe, updateRecipe } from "./Recipe.actions";
import { IRootState } from "reducers/rootReducer";
import { withStyles } from "@material-ui/core";

interface OwnProps {
  id: string;
}

interface StateProps {
  recipe?: Recipe;
  isOwner: boolean;
  loading: boolean;
}

interface DispatchProps {
  getRecipe: () => void;
  deleteRecipe: () => void;
  updateRecipe: (data: Partial<RecipeForm>) => void;
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, IRootState> = (
  { recipe: { recipe }, auth: { user } },
  { id }
) => {
  const loading = !recipe || recipe._id !== id ? true : false;
  const isOwner = user?._id === recipe?.user;

  return { recipe, loading, isOwner };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
  dispatch,
  { id }
) => ({
  getRecipe: () => {
    dispatch(getRecipe(id));
  },
  deleteRecipe: () => {
    dispatch(deleteRecipe(id));
  },
  updateRecipe: (data: Partial<RecipeForm>) => {
    dispatch(updateRecipe(id, data));
  },
});

export type Props = OwnProps & StateProps & DispatchProps;
export default connect(mapStateToProps, mapDispatchToProps)(GetRecipeComponent);

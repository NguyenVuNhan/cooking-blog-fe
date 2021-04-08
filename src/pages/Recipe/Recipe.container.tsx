import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import GetRecipeComponent from "./Recipe.component";
import { deleteRecipe, getRecipe, updateRecipe } from "./Recipe.actions";
import { IRootState } from "reducers/rootReducer";
import { GET_RECIPE, DELETE_RECIPE, UPDATE_RECIPE } from "./Recipe.types";

interface OwnProps {
  id: string;
}

interface StateProps {
  recipe?: Recipe;
  isOwner: boolean;
  fetchRecipe: boolean;
  loading: boolean;
}

interface DispatchProps {
  getRecipe: () => void;
  deleteRecipe: () => void;
  updateRecipe: (data: Partial<RecipeForm>) => void;
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, IRootState> = (
  { recipe: { recipe }, auth: { user }, loading },
  { id }
) => {
  const isFetching =
    !recipe || recipe._id !== id || !!loading[GET_RECIPE] ? true : false;
  const actionLoading =
    !!loading[UPDATE_RECIPE] || !!loading[DELETE_RECIPE] ? true : false;
  const isOwner = user?._id === recipe?.user;

  return { recipe, fetchRecipe: isFetching, loading: actionLoading, isOwner };
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

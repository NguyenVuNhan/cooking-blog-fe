import { connect } from "react-redux";
import GetRecipeComponent from "./Recipe.component";
import { Dispatch } from "redux";
import { deleteRecipe, getRecipe, updateRecipe } from "./Recipe.actions";
import { RecipeActionType } from "./Recipe.types";
import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IRootState } from "reducers/rootReducer";

interface Props {
  user: IUser | undefined;
  onGetRecipe: (id: string) => void;
  onDeleteRecipe: (id: string) => void;
  recipe: Recipe | null;
  onUpdateRecipe: (id: string, data: Partial<RecipeForm>) => void;
}

const GetRecipeContainer: FC<Props> = ({
  onGetRecipe,
  onDeleteRecipe,
  onUpdateRecipe,
  recipe,
  user,
}) => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    onGetRecipe(id);
  }, [id]);

  const deleteRecipe = () => {
    onDeleteRecipe(id);
  };

  const updateRecipe = (data: Partial<RecipeForm>) => {
    onUpdateRecipe(id, data);
  };

  // TODO: Replace by loading component
  return !recipe || recipe._id !== id ? (
    <div>Loading...</div>
  ) : (
    <GetRecipeComponent
      updateRecipe={updateRecipe}
      recipe={recipe}
      deleteRecipe={deleteRecipe}
      isOwner={user?._id === recipe.user}
    />
  );
};

const mapStateToProps = (state: IRootState) => ({
  recipe: state.recipe.recipe,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch<RecipeActionType>) => ({
  onGetRecipe: (id: string) => {
    dispatch(getRecipe(id));
  },
  onDeleteRecipe: (id: string) => {
    dispatch(deleteRecipe(id));
  },
  onUpdateRecipe: (id: string, data: Partial<RecipeForm>) => {
    dispatch(updateRecipe(id, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GetRecipeContainer);

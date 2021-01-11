import { connect } from "react-redux";
import GetRecipeComponent from "./GetRecipe.component";
import { Dispatch } from "redux";
import { getRecipe } from "./GetRecipe.actions";
import { GetRecipeActionType } from "./GetRecipe.types";
import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IRootState } from "reducers/rootReducer";

interface Props {
  onGetRecipe: (data: string) => void;
  recipe: Recipe | null;
}

interface ParamTypes {
  id: string;
}

const GetRecipeContainer: FC<Props> = ({ onGetRecipe, recipe }) => {
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    onGetRecipe(id);
  }, [id]);

  // TODO: Replace by loading component
  if (!recipe) return <div>Loading...</div>;

  return <GetRecipeComponent recipe={recipe} />;
};

const mapStateToProps = (state: IRootState) => ({
  recipe: state.recipe.recipe,
});

const mapDispatchToProps = (dispatch: Dispatch<GetRecipeActionType>) => ({
  onGetRecipe: (data: string) => {
    dispatch(getRecipe(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GetRecipeContainer);

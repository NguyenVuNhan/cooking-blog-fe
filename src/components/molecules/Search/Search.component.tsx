import React, { FC } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { useForm } from "react-hook-form";

interface Props {
  onSearch(data: SearchForm): void;
}

const Search: FC<Props> = ({ onSearch }) => {
  const { handleSubmit, register } = useForm<LoginForm>();

  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <InputBase
        placeholder="Search recipe or Ingredient"
        inputProps={{ "aria-label": "Search recipe" }}
        name="data"
        className="rounded pl-2 w-100 bg-white mt-2 border"
        inputRef={register}
        endAdornment={
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        }
      />
    </form>
  );
};

export default Search;

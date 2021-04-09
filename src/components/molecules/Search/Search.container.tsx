import { useQuery } from "hooks";
import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { search } from "./Search.actions";
import SearchComponent from "./Search.component";
import { SearchActionType } from "./Search.types";

interface Props {
  search(query: string): void;
  onSearch?: (query: string) => void;
}

const SearchContainer: FC<Props> = ({ onSearch, search }) => {
  const q = useQuery();

  const _onSearch = (data: SearchForm) => {
    const query = `${data.data}`;
    search(query);

    onSearch && onSearch(query);
  };

  useEffect(() => {
    if (!q.get("q")) return;
    const query = q.get("q") || "";

    search(query);
  }, []);

  return <SearchComponent onSearch={_onSearch} />;
};

const mapDispatchToProps = (dispatch: Dispatch<SearchActionType>) => ({
  search: (data: string) => {
    dispatch(search(data));
  },
});

export default connect(null, mapDispatchToProps)(SearchContainer);

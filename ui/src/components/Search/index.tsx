import React, { useRef, useContext } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { StateContext } from "../../store/DataProvider";
import { searchClients } from "../../services/api";

const SearchClient = () => {
  const { dispatch } = useContext(StateContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = () => {
    let searchKey = inputRef.current?.value ? inputRef.current?.value : "";
    searchClients(searchKey).then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 }}
    >
      <InputBase
        inputRef={inputRef}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search clients..."
      />
      <IconButton
        onClick={handleSearch}
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchClient;

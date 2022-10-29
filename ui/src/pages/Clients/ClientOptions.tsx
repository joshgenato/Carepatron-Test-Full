import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import ClientSearch from "../../components/Search";
import CreateClient from "./CreateClient";

const ClientOptions = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <ClientSearch />
      <CreateClient />
    </Grid>
  );
};

export default ClientOptions;

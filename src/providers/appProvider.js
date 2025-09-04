import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
});

const AppProviders = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default AppProviders;

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById("root")
);

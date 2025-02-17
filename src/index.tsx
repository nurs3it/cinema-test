import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";

import App from "@/App";
import { CategoryProvider } from "@/context/category.context";
import { MovieProvider } from "@/context/movies.context";
import { router } from "@/pages/router";
import reportWebVitals from "@/reportWebVitals";
import { muiTheme } from "@/theme/mui-theme";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CategoryProvider>
          <MovieProvider>
            <RouterProvider router={router}>
              <CssBaseline />
              <App />
            </RouterProvider>
          </MovieProvider>
        </CategoryProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);

reportWebVitals();

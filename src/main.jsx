import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const store = configureStore({ reducer: rootReducer, devTools: true });

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
// //basename={import.meta.env.PUBLIC_URL}
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <React.Fragment>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.Fragment>
    </Provider>
  </QueryClientProvider>,
);

reportWebVitals();

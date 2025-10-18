import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/client/react";

import { ProductsProvider } from "./context/ProductsContext.tsx";
import { SessionProvider } from "./context/SessionContext.tsx";

import { client } from "./api/apolloClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <SessionProvider>
          <ProductsProvider>
            <App />
          </ProductsProvider>
        </SessionProvider>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);

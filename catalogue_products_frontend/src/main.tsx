import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client";
import { ProductsProvider } from "./context/ProductsContext.tsx";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/graphql",
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </ApolloProvider>
  </StrictMode>
);

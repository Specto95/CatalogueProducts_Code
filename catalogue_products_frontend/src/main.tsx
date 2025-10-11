import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Cookies from "js-cookie";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";
import { HttpLink } from "@apollo/client";
import { ProductsProvider } from "./context/ProductsContext.tsx";
import { SessionProvider } from "./context/SessionContext.tsx";
import { ApolloLink } from "@apollo/client";

const authLink = new SetContextLink((prevContext) => {
  const token = Cookies.get("token");
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const link = ApolloLink.from([authLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <SessionProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </SessionProvider>
    </ApolloProvider>
  </StrictMode>
);

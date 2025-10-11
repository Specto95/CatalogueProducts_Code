import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import Cookies from "js-cookie";

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

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

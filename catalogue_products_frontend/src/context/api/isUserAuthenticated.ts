import { gql } from "@apollo/client";

export const IS_USER_AUTHENTICATED = gql`
  query($token: String!) {
    isUserAuthenticated(token: $token)
  }
`;
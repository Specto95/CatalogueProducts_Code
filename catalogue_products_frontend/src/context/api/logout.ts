import { gql } from "@apollo/client";

export const LOGOUT = gql`
  mutation Logout($token: String!) {
    logout(token: $token) {
      message
    }
  }
`;

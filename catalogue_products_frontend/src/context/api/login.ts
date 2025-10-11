import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        role
        email
      }
      message
      token
    }
  }
`;

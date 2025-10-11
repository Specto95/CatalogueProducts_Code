import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $role: String!) {
    register(email: $email, password: $password, role: $role) {
      user {
        role
        email
      }
      message
    }
  }
`;

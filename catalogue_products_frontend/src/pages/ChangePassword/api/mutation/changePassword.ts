import { gql } from "@apollo/client";

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $email: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    changePassword(
      email: $email
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      message
    }
  }
`;
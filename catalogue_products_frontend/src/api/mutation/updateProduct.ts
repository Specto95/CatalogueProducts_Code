import { gql } from "@apollo/client";

export const UPDATE_PRODUCT = gql`
  mutation ($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      title
      description
      price
      category
      thumbnail
    }
  }
`;

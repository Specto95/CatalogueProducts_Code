import {gql} from "@apollo/client";

export const DELETE_PRODUCT = gql`
  mutation ($id: ID!) {
    deleteProduct(id: $id) {
      id
      title
      description
      price
      rating
      brand
      category
      thumbnail
    }
  }
`;
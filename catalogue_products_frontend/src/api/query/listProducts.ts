import { gql } from "@apollo/client";

export const LIST_PRODUCTS = gql`
  query {
    listProducts {
      products {
        id
        title
        description
        price
        rating
        brand
        category
        thumbnail
      }
      total
      skip
      limit
    }
  }
`;

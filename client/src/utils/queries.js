import { gql } from "@apollo/client";

export const GET_ME = gql`
  query {
    me {
      bookCount
      savedBooks {
        authors
        description
        title
        image
        link
      }
    }
  }
`;

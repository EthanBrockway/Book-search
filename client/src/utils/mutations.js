import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation ($book: bookInput) {
    SaveBook(book: $book) {
      username
      savedBooks {
        title
        authors
        description
        image
        bookId
        link
      }
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation ($bookId: String!) {
    RemoveBook(bookId: $bookId) {
      savedBooks {
        bookId
      }
    }
  }
`;

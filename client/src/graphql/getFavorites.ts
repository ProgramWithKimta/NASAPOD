//function to get all the favorite photos that user's saved

import { gql } from '@apollo/client';

export const GET_FAVORITES = gql`
  query GetFavorites {
    getFavorites {
      _id
      title
      url
      date
      explanation
    }
  }
`;

export const GET_USER_FAVORITES = gql`
  query GetUserFavorites($username: String!) {
    getUserFavorites(username: $username) {
      _id
      title
      url
      date
      explanation
    }
  }`

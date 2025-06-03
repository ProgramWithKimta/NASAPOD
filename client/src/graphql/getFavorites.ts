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

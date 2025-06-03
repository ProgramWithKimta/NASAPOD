import { gql } from '@apollo/client';

export const SAVE_FAVORITE = gql`
  mutation SaveFavorite($input: FavoriteInput!) {
    saveFavorite(input: $input) {
      _id
      title
      url
      date
      explanation
    }
  }
`;


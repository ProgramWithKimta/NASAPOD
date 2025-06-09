import { gql } from '@apollo/client';

export const DELETE_FAVORITE_BY_USER = gql`
  mutation DeleteFavoriteByUser($username: String!, $favorite_id: ID!) {
    deleteFavoriteByUser(username: $username, favorite_id: $favorite_id)
  }
`;

// schemas/typeFavorite.ts

import { gql } from 'apollo-server-express';

export const typeFavorite = gql`
  type Favorite {
    _id: ID!
    title: String!
    url: String!
    date: String
    explanation: String
    userId: ID
    createdAt: String
    updatedAt: String
  }

  input FavoriteInput {
    title: String!
    url: String!
    date: String
    explanation: String
    userId: ID
  }

  type Query {
    getFavorites: [Favorite!]!
    # getDailyPhoto(date: String): NASAResponse! Marlow already did this code 
  }

  type Mutation {
    saveFavorite(input: FavoriteInput!): Favorite! 
    deleteFavorite(id: ID!): String!
  }

  type NASAResponse {
    title: String
    url: String
    date: String
    explanation: String
    copyright: String
    media_type: String
  }
`;

export interface FavoriteInput {
  title: string;
  url: string;
  date?: string;
  explanation?: string;
  userId?: string;
}

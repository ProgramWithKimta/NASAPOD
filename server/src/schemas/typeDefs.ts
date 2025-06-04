import gql from "graphql-tag";


export default gql`
type APOD {
    date: String
    explanation: String
    hdurl: String
    media_type: String
    service_version: String
    title: String
    url: String
  }

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
  type NASAResponse {
    title: String
    url: String
    date: String
    explanation: String
    copyright: String
    media_type: String
  }

  type Query {
    getFavorites: [Favorite!]!
    # getDailyPhoto(date: String): NASAResponse!
    apodToday: APOD
    apodLast7: [APOD]
    apodRandom: APOD
    apodByDate(date: String!): APOD
  }

  type Mutation {
    saveFavorite(input: FavoriteInput!): Favorite! 
    deleteFavorite(id: ID!): String!
    login(username: String, password: String): String
  } 
`;

export interface FavoriteInput {
  title: string;
  url: string;
  date?: string;
  explanation?: string;
  userId?: string;
}


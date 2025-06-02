const typeDefs = `

  type Favorite {
    _id: ID!
      title: String!
      url: String!
      date: String
      explanation: String
      userId: User
  }
   type User {
    _id: ID!
      email: String!
      username: String!
   }   
  input FavoriteInput{
    title: String
    url: String
    date: String
    explanation: String
    userId: String
  }

  type Query {
    getFavorites: [Favorite]
  }

  type Mutation {
    saveFavorite(input: FavoriteInput): Favorite

    deleteFavorite(id: String): String
  }
`;

export default typeDefs;

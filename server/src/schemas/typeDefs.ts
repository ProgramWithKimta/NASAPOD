const typeDefs = `
  type APOD {
    date: String
    explanation: String
    hdurl: String
    media_type: String
    service_version: String
    title: String
    url: String
  }

  type Query {
    apodToday: APOD
    apodLast7: [APOD]
    apodRandom: APOD
    apodByDate(date: String!): APOD
  }
`;

export default typeDefs;
import { gql } from '@apollo/client';

// to get the picture of the day 
export const GET_APOD = gql`
  query GetApod {
    apod {
      title
      date
      explanation
      url
      media_type
    }
  }
`;



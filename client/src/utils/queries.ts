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

// add queries here for getting random photo, favorite photo, photo based off picking date from calendar
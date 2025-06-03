import { gql } from '@apollo/client';

export const GET_APOD_LAST7 = gql`
  query GetApodLast7 {
    apodLast7 {
      date
      title
      explanation
      url
      hdurl
      media_type
    }
  }
`;
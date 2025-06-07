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

export const GET_APOD = gql`
  query GetApod {
    apodToday {
      title
      date
      explanation
      url
      media_type
    }
  }
`;
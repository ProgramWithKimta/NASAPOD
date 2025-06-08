import React from 'react';
import { useQuery, gql } from '@apollo/client';
import LikeButton from '../components/Button';

const GET_APOD_RANDOM = gql`
  query GetApodRandom {
    apodRandom {
      date
      title
      explanation
      url
      hdurl
      media_type
    }
  }
`;

const ApodRandom: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_APOD_RANDOM);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading random APOD.</p>;

  const apod = data.apodRandom;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h1>Random NASA APOD</h1>
      <button onClick={() => refetch()} style={{ marginBottom: '1rem' }}>
        Show Another Random Image
      </button>
      <h2>{apod.title}</h2>
      <p>{apod.date}</p>
      <LikeButton photo={apod} />
      {apod.media_type === 'image' ? (
        <img
          src={apod.url}
          alt={apod.title}
          style={{ width: '100%', borderRadius: 8, marginBottom: '1rem' }}
        />
      ) : (
        <a href={apod.url} target="_blank" rel="noopener noreferrer">
          View Video
        </a>
      )}
      <p style={{ fontSize: '1rem', marginTop: '1rem' }}>{apod.explanation}</p>
    </div>
  );
};

export default ApodRandom;
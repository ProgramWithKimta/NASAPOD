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
    <div className="apodrandom-container">
      <h1 className="apodrandom-page-title">Random NASA APOD</h1>
      <div className="apodrandom-div">
      <button onClick={() => refetch()} style={{ marginBottom: '1rem' }}>
        Show Another Random Image
      </button>
      <h1 className="apodrandom-img-title">{apod.title}</h1>
      <p className="apodrandom-date">{apod.date}</p>
      <LikeButton photo={apod} />
      {apod.media_type === 'image' ? (
        <img
          src={apod.url}
          alt={apod.title}
          className="apodrandom-image"
        />
      ) : (
        <a href={apod.url} target="_blank" rel="noopener noreferrer">
          View Video
        </a>
      )}
      <p className="apodrandom-description">{apod.explanation}</p>
      </div>
    </div>
  );
};

export default ApodRandom;